const https = require('https');

https.get('https://www.neredekal.com/sari-konak-apart-otel-fiyatlari/', {
  headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Find all image URLs. They might be in a gallery div.
    // Let's just find anything ending in .jpg inside neredekal cdn
    const imgRegex = /https:\/\/[^"'\s]+\.jpg/g;
    const matches = data.match(imgRegex);
    console.log(matches ? [...new Set(matches)].slice(0, 5) : "No images found");
  });
}).on('error', console.error);
