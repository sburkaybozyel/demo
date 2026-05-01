const puppeteer = require('puppeteer');
const fs = require('fs');
const https = require('https');
const path = require('path');

const hotels = [
  { name: 'Servet Apart Otel Yemişkumu', slug: 'servet-apart-otel-yemiskumu' },
  { name: 'Hakan Apart Otel', slug: 'hakan-apart-otel' },
  { name: 'Seymen Otel Kızkalesi', slug: 'seymen-otel-kizkalesi' },
  { name: 'Bir Umut Otel', slug: 'bir-umut-otel' },
  { name: 'Vista Boutique Hotel', slug: 'vista-boutique-hotel' }
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

async function scrapeImages() {
  const browser = await puppeteer.launch({ headless: "new" });
  
  for (let hotel of hotels) {
    console.log(`Searching Bing Images for ${hotel.name}...`);
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    
    let imageUrls = [];
    try {
      const query = encodeURIComponent(hotel.name + " Mersin");
      await page.goto(`https://www.bing.com/images/search?q=${query}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
      
      imageUrls = await page.evaluate(() => {
        let imgs = Array.from(document.querySelectorAll('a.iusc'));
        let urls = [];
        for (let img of imgs) {
          try {
            let m = JSON.parse(img.getAttribute('m'));
            if (m && m.murl) {
              // only accept jpg or png
              if (m.murl.includes('.jpg') || m.murl.includes('.jpeg') || m.murl.includes('.png')) {
                urls.push(m.murl);
              }
            }
          } catch(e) {}
        }
        return [...new Set(urls)].slice(0, 5);
      });
    } catch (e) {
      console.log(`Failed for ${hotel.name}: ${e.message}`);
    }
    await page.close();

    const imgDir = path.join(__dirname, 'demos', 'public', 'images', hotel.slug);
    if (!fs.existsSync(imgDir)) {
      fs.mkdirSync(imgDir, { recursive: true });
    }

    let localPaths = [];
    if (imageUrls.length > 0) {
      let count = 1;
      for (let url of imageUrls) {
        if (count > 3) break; // only need 3
        try {
          const imgPath = path.join(imgDir, `img${count}.jpg`);
          await downloadImage(url, imgPath);
          localPaths.push(`images/${hotel.slug}/img${count}.jpg`);
          count++;
        } catch(e) {
            console.log("Failed to download", url, e.message);
        }
      }
    }

    // Update JSON if we found images
    if (localPaths.length > 0) {
      const jsonPath = path.join(__dirname, 'demos', 'data', `${hotel.slug}.json`);
      if (fs.existsSync(jsonPath)) {
        let data = JSON.parse(fs.readFileSync(jsonPath));
        if (localPaths[0]) data.heroImage = localPaths[0];
        if (localPaths[1]) data.featureImage = localPaths[1];
        if (localPaths[2]) data.gallery = [localPaths[2]];
        fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
        console.log(`Updated JSON for ${hotel.name} with ${localPaths.length} REAL images`);
      }
    }
  }
  await browser.close();
  console.log("All done!");
}

scrapeImages();
