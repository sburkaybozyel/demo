const https = require('https');
const dns = require('dns').promises;

function fetchURL(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function run() {
  const q = encodeURIComponent('site:instagram.com "mersin" "butik otel" OR "apart" -site:otelz.com -site:neredekal.com');
  const html = await fetchURL(`https://html.duckduckgo.com/html/?q=${q}`);
  
  const igRegex = /instagram\.com\/([a-zA-Z0-9_.]+)\/?/g;
  let matches;
  let handles = new Set();
  
  while ((matches = igRegex.exec(html)) !== null) {
    let handle = matches[1];
    if(handle !== 'p' && handle !== 'reel' && handle !== 'explore' && handle !== 'tags') {
      handles.add(handle);
    }
  }

  console.log("Found Handles:", Array.from(handles));
}
run();
