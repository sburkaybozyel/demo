const puppeteer = require('puppeteer');
const fs = require('fs');
const https = require('https');
const path = require('path');

const hotels = [
  { name: 'Sarı Konak Apart Otel', slug: 'sari-konak-apart-otel', ig: 'kizkalesisarikonakapart' },
  { name: 'Ercan Apart', slug: 'ercan-apart', ig: 'ercanapartayas' },
  { name: 'Aydın Apart Otel', slug: 'aydin-apart-otel', ig: 'aydin_apart' },
  { name: 'Sergen Apart Motel', slug: 'sergen-apart-motel', ig: 'sergenapartmotel' },
  { name: 'Bahadır Apart Motel', slug: 'bahadir-apart-motel', ig: 'bahadirapartmotel' },
  { name: 'Davut Apart Hotel', slug: 'davut-apart-hotel', ig: 'davutotel' },
  { name: 'Gürkan Apart Pansiyon', slug: 'gurkan-apart-pansiyon', ig: 'gurkan_apart' },
  { name: 'Sunguroğlu Apart', slug: 'sunguroglu-apart', ig: 'sunguroglutatil' },
  { name: 'Riva Apart Otel', slug: 'riva-apart-otel', ig: 'riva_apart' },
  { name: 'Cem Apart Motel', slug: 'cem-apart-motel', ig: 'cemapartmotel' }
];

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        res.pipe(fs.createWriteStream(filepath))
           .on('error', reject)
           .once('close', () => resolve(filepath));
      } else {
        res.resume();
        reject(new Error(`Status Code: ${res.statusCode}`));
      }
    }).on('error', reject);
  });
}

async function scrapeAndCreate() {
  const browser = await puppeteer.launch({ headless: "new" });
  
  for (let hotel of hotels) {
    console.log(`Processing ${hotel.name} via IG: ${hotel.ig}...`);
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    
    let imageUrls = [];
    try {
      await page.goto(`https://www.picuki.com/profile/${hotel.ig}`, { waitUntil: 'domcontentloaded', timeout: 20000 });
      
      imageUrls = await page.evaluate(() => {
        let imgs = Array.from(document.querySelectorAll('.post-image'));
        return [...new Set(imgs.map(i => i.src))].slice(0, 5);
      });
    } catch (e) {
      console.log(`Failed Picuki for ${hotel.name}: ${e.message}`);
    }
    await page.close();

    const imgDir = path.join(__dirname, 'demos', 'public', 'images', hotel.slug);
    if (!fs.existsSync(imgDir)) {
      fs.mkdirSync(imgDir, { recursive: true });
    }

    let localPaths = [];
    if (imageUrls.length < 3) {
      console.log(`Not enough images from Picuki for ${hotel.name}.`);
      localPaths = [
        "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg",
        "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg",
        "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg"
      ];
    } else {
      let count = 1;
      for (let url of imageUrls) {
        try {
          const imgPath = path.join(imgDir, `img${count}.jpg`);
          await downloadImage(url, imgPath);
          localPaths.push(`images/${hotel.slug}/img${count}.jpg`);
          count++;
        } catch(e) {}
      }
    }

    const jsonPath = path.join(__dirname, 'demos', 'data', `${hotel.slug}.json`);
    const data = {
      name: hotel.name,
      slug: hotel.slug,
      demoNotice: "Demo taslak, resmi site değildir.",
      location: "Mersin",
      eyebrow: "Erdemli / Mersin",
      headline: `${hotel.name} ile Huzurlu Bir Tatil.`,
      description: `${hotel.name}, konforlu odaları ve benzersiz hizmet anlayışıyla Mersin tatillerinizde sizi bekliyor.`,
      heroImage: localPaths[0] || "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg",
      featureImage: localPaths[1] || "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg",
      gallery: localPaths.slice(2).length > 0 ? localPaths.slice(2) : ["https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg"],
      features: [
        { title: "Mükemmel Konum", description: "Erdemli'nin kalbinde." },
        { title: "Konforlu Odalar", description: "Sizin için tasarlandı." }
      ],
      contact: {
        phone: "+90 5XX XXX XX XX",
        whatsapp: "905XXXXXXXXX",
        email: "",
        address: "Erdemli, Mersin",
        instagram: hotel.ig
      }
    };
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
    console.log(`Created JSON for ${hotel.name} with ${localPaths.length > 3 ? 'REAL' : 'PEXELS'} images`);
  }
  await browser.close();
  console.log("All done!");
}
scrapeAndCreate();
