const dns = require('dns').promises;

const hotels = [
  "Turuva Apart Otel", "Neslihan Otel", "Su Cafe Pansiyon", "Deveci Otel", 
  "Limon Inn", "Otel Kumsalda", "Anatolia Suit Otel", "Seymen Otel", 
  "Kaptan Suit Otel", "Sahil Villa", "Aria Plus Ev Otel", "Rolli Butik Hotel"
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
      `${slug.replace('otel', '')}.com`, `${slug.replace('otel', '')}.com.tr`,
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
