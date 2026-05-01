const puppeteer = require('puppeteer');
const fs = require('fs');
const https = require('https');
const path = require('path');

const hotels = [
  { name: 'Sarı Konak Apart Otel', slug: 'sari-konak-apart-otel', ig: 'kizkalesisarikonakapart', url: 'https://www.neredekal.com/sari-konak-apart-otel-fiyatlari/' },
  { name: 'Ercan Apart', slug: 'ercan-apart', ig: 'ercanapartayas', url: 'https://www.neredekal.com/ercan-apart-fiyatlari/' },
  { name: 'Aydın Apart Otel', slug: 'aydin-apart-otel', ig: 'aydin_apart', url: 'https://www.neredekal.com/aydin-apart-fiyatlari/' },
  { name: 'Sergen Apart Motel', slug: 'sergen-apart-motel', ig: 'sergenapartmotel', url: 'https://www.neredekal.com/sergen-apart-motel-fiyatlari/' },
  { name: 'Bahadır Apart Motel', slug: 'bahadir-apart-motel', ig: 'bahadirapartmotel', url: 'https://www.neredekal.com/bahadir-apart-motel-fiyatlari/' },
  { name: 'Davut Apart Hotel', slug: 'davut-apart-hotel', ig: 'davutotel', url: 'https://www.neredekal.com/davut-apart-otel-fiyatlari/' },
  { name: 'Gürkan Apart Pansiyon', slug: 'gurkan-apart-pansiyon', ig: 'gurkan_apart', url: 'https://www.neredekal.com/gurkan-apart-pansiyon-fiyatlari/' },
  { name: 'Sunguroğlu Apart', slug: 'sunguroglu-apart', ig: 'sunguroglutatil', url: 'https://www.neredekal.com/sunguroglu-apart-fiyatlari/' },
  { name: 'Riva Apart Otel', slug: 'riva-apart-otel', ig: 'riva_apart', url: 'https://www.neredekal.com/riva-apart-otel-fiyatlari/' },
  { name: 'Cem Apart Motel', slug: 'cem-apart-motel', ig: 'cemapartmotel', url: 'https://www.neredekal.com/cem-apart-motel-fiyatlari/' }
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
        reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
      }
    }).on('error', reject);
  });
}

async function scrapeAndCreate() {
  const browser = await puppeteer.launch({ headless: "new" });
  
  for (let hotel of hotels) {
    console.log(`Processing ${hotel.name}...`);
    const page = await browser.newPage();
    
    // Set a proper user agent to avoid blocking
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    
    let imageUrls = [];
    try {
      await page.goto(hotel.url, { waitUntil: 'networkidle2', timeout: 30000 });
      
      // Attempt to extract high quality gallery images from Neredekal
      imageUrls = await page.evaluate(() => {
        let imgs = Array.from(document.querySelectorAll('img'));
        let srcList = imgs.map(i => i.src || i.getAttribute('data-src'));
        // Filter out logos, icons, avatars, and tiny images
        let filtered = srcList.filter(src => 
          src && src.startsWith('https') && 
          src.includes('.jpg') && 
          !src.includes('avatar') && 
          !src.includes('logo') &&
          !src.includes('icon')
        );
        // Replace thumbnails with higher res logic if possible, Neredekal uses path like /i/resimler/... or /i/otel/...
        // Just take the first 5 unique valid images
        let unique = [...new Set(filtered)];
        return unique.slice(0, 5);
      });
    } catch (e) {
      console.log(`Failed to scrape images for ${hotel.name}: ${e.message}`);
    }
    await page.close();

    const imgDir = path.join(__dirname, 'demos', 'public', 'images', hotel.slug);
    if (!fs.existsSync(imgDir)) {
      fs.mkdirSync(imgDir, { recursive: true });
    }

    let localPaths = [];
    // If we failed to get images, use fallback logic
    if (imageUrls.length < 3) {
      console.log(`Not enough images for ${hotel.name}, using placeholders.`);
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
        } catch(e) {
          console.log(`Download failed for ${url}`);
        }
      }
    }

    // Prepare JSON
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
    console.log(`Created JSON for ${hotel.name}`);
  }
  
  await browser.close();
  console.log("All done!");
}

scrapeAndCreate();
