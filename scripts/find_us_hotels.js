const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const regions = [
  "Idyllwild CA",
  "Broken Bow OK",
  "Taos NM",
  "Carlsbad CA",
  "Sedona AZ"
];

const keywords = ["cabins", "bed and breakfast", "boutique hotel", "motel"];

async function findLeads() {
  const browser = await puppeteer.launch({ headless: "new" });
  let leads = [];

  for (let region of regions) {
    for (let kw of keywords) {
      console.log(`Searching for: ${kw} in ${region}`);
      const page = await browser.newPage();
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64)');

      const query = encodeURIComponent(`"${kw}" "${region}" site:instagram.com`);
      try {
        await page.goto(`https://www.bing.com/search?q=${query}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
        
        let results = await page.evaluate(() => {
          let links = Array.from(document.querySelectorAll('h2 a'));
          return links.map(a => ({
            title: a.innerText,
            url: a.href
          })).filter(l => l.url.includes('instagram.com'));
        });

        for (let r of results) {
          // Extract username from url
          let match = r.url.match(/instagram\.com\/([A-Za-z0-9_.]+)/);
          if (match && match[1] && match[1] !== 'p' && match[1] !== 'explore') {
            leads.push({
              name: r.title.split('(')[0].split('-')[0].trim() || match[1],
              ig: match[1],
              region: region,
              category: kw
            });
          }
        }
      } catch (e) {
        console.log(`Failed for ${kw} in ${region}: ${e.message}`);
      }
      await page.close();
    }
  }
  await browser.close();

  // Deduplicate by IG handle
  const uniqueLeads = [];
  const igs = new Set();
  for (let lead of leads) {
    if (!igs.has(lead.ig)) {
      igs.add(lead.ig);
      uniqueLeads.push(lead);
    }
  }

  const outPath = path.join(__dirname, '..', 'prospects', 'us-deep-research-report.json');
  fs.writeFileSync(outPath, JSON.stringify(uniqueLeads, null, 2));
  console.log(`Found ${uniqueLeads.length} unique leads. Saved to ${outPath}`);
}

findLeads();
