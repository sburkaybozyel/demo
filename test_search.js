const https = require('https');
const querystring = require('querystring');

function search(query) {
  return new Promise((resolve, reject) => {
    const postData = querystring.stringify({ q: query });
    const options = {
      hostname: 'lite.duckduckgo.com',
      path: '/lite/',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData),
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const regex = /href="\/\/duckduckgo\.com\/l\/\?uddg=([^"&]+)/g;
        let match;
        let urls = [];
        while ((match = regex.exec(data)) !== null) {
          urls.push(decodeURIComponent(match[1]));
        }
        resolve(urls);
      });
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function run() {
  const q = '"Aria Plus Ev Otel" Mersin';
  const urls = await search(q);
  console.log("URLs for Aria:", urls);
}
run();
