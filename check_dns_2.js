const dns = require('dns').promises;

const hotels = [
  "Hotel Has", "Konak Hotel", "Hotel Fatih", "Yuvam Hotel", 
  "Ayseli", "Liva otel", "Burhanoğlu Konağ", "Atlıhan Oteli", 
  "Nisan Otel", "Gold", "Kale Motel", "Peri Hotel", 
  "Deniz Hotel", "WOM Hotel", "Marde Hotel", "Nice Hotel", 
  "Gondol Oteli", "Tayfun Hotel", "Hotel Yasar", "Dorel The Hotel",
  "Metros Hotel", "Rolli Butik Hotel", "Clup Efes Otel"
];

function slugify(text) {
  return text.toLowerCase()
    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[^a-z0-9]/g, '');
}

async function checkDomain(domain) {
  try {
    await dns.lookup(domain);
    return true; // Exists
  } catch (e) {
    return false; // Does not exist
  }
}

async function run() {
  let found = [];
  for (let name of hotels) {
    let slug = slugify(name);
    let domains = [
      `${slug}.com`, `${slug}.com.tr`,
      `${slug.replace('otel', '').replace('hotel', '')}.com`, 
      `${slug.replace('otel', '').replace('hotel', '')}.com.tr`,
      `${slug}mersin.com`
    ];
    
    let hasWebsite = false;
    for (let d of domains) {
      if (d.length < 5) continue;
      if (await checkDomain(d)) {
        hasWebsite = true;
        break;
      }
    }
    
    if (!hasWebsite) {
      found.push(name);
    }
  }
  console.log("NO WEBSITE:", found);
}
run();
