const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const dataDir = path.join(root, "demos", "data");
const outDir = path.join(root, "demos", "public");

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function cssUrl(value) {
  return String(value ?? "").replace(/[()\\"'\n\r]/g, (m) => "\\" + m);
}

function slugSafe(value) {
  return /^[a-z0-9-]+$/.test(value);
}

function required(property, fields) {
  const missing = fields.filter((f) => {
    const v = f.split(".").reduce((a, k) => a && a[k], property);
    return !v;
  });
  if (missing.length) throw new Error(`${property.slug || property.name} missing: ${missing.join(", ")}`);
}

function whatsappUrl(property) {
  const phone = property.contact?.whatsapp;
  const text = `Merhaba ${property.name}, müsaitlik hakkında bilgi almak istiyorum.`;
  if (!phone) return "#iletisim";
  return `https://api.whatsapp.com/send?phone=${encodeURIComponent(phone)}&text=${encodeURIComponent(text)}`;
}

function renderFeatures(items) {
  return items.map((item, i) => `
          <article class="detail">
            <div class="detail-num">${String(i + 1).padStart(2, "0")}</div>
            <div class="detail-body">
              <h3>${escapeHtml(item.title)}</h3>
              <p>${escapeHtml(item.body)}</p>
            </div>
          </article>`).join("");
}

function renderAmenities(items) {
  const icons = ["✦","◈","❋","◉","✧","◆","❖","◇","✴","◐","✾","◑"];
  return items.map((item, i) => `
          <div class="amenity">
            <span class="amenity-icon">${icons[i % icons.length]}</span>
            <b>${escapeHtml(item.title)}</b>
            <p>${escapeHtml(item.body)}</p>
          </div>`).join("");
}

function renderGallery(gallery) {
  const imgs = gallery.slice(0, 4);
  while (imgs.length < 4) imgs.push(gallery[0] || "");
  return `
          <div class="g1" style="background-image:url('${cssUrl(imgs[0])}')"></div>
          <div class="g2" style="background-image:url('${cssUrl(imgs[1])}')"></div>
          <div class="g3" style="background-image:url('${cssUrl(imgs[2])}')"></div>
          <div class="g4"><p>Komisyon ödemeden, misafirlerinizle direkt iletişim.</p></div>
          <div class="g5" style="background-image:url('${cssUrl(imgs[3])}')"></div>`;
}

function renderWhySection(wa) {
  return `
    <section class="section why-section" id="neden">
      <div class="section-inner">
        <div class="why-top">
          <p class="kicker kicker--light">Neden kendi siteniz?</p>
          <h2 class="why-h2">Her rezervasyonda kaybettiğiniz para.</h2>
          <p class="why-sub">Booking.com, Airbnb ve Tatilsepeti her rezervasyondan %15–25 komisyon keser. 100.000 ₺ rezervasyonda 20.000 ₺ komisyon ödersiniz. Kendi sitenizde bu para sizde kalır.</p>
        </div>
        <div class="why-grid">
          <div class="why-card why-bad">
            <div class="why-label why-label--bad">Platform üzerinden</div>
            <ul>
              <li>Her rezervasyonda %15–25 komisyon kesilir</li>
              <li>Misafir verisi size ait değil, platforma ait</li>
              <li>Fiyatlarınız rakiplerin yanında görünür</li>
              <li>Yorumlarınız ve puanınız platforma kilitli</li>
              <li>Platform kural değiştirince siz etkilenirsiniz</li>
            </ul>
          </div>
          <div class="why-card why-good">
            <div class="why-label why-label--good">Kendi sitenizden</div>
            <ul>
              <li>Komisyon sıfır — tüm kazanç sizin</li>
              <li>IBAN veya Iyzico ile direkt ödeme alırsınız</li>
              <li>Misafir WhatsApp'tan direkt sizi arar</li>
              <li>Google'da kendi markanız öne çıkar</li>
              <li>Müşteri verisi, tarihçe, sadakat — sizde kalır</li>
            </ul>
          </div>
          <div class="why-card why-cta">
            <div class="why-label why-label--cta">Vent ile başlamak</div>
            <ul>
              <li>7 günde yayında, hızlı kurulum</li>
              <li>Mobil uyumlu ve hızlı yüklenen tasarım</li>
              <li>WhatsApp + IBAN / Iyzico entegrasyonu</li>
              <li>Tek seferlik ücret — aylık maliyet yok</li>
              <li>İstediğiniz zaman fiyat ve içerik güncellemesi</li>
            </ul>
            <a class="why-cta-btn" href="${wa}" target="_blank" rel="nofollow">Ücretsiz görüşme ayarla →</a>
          </div>
        </div>
      </div>
    </section>`;
}

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Inter:wght@400;500;600;700&display=swap');
  :root{
    --ink:#0f1a15;--muted:#5a6b62;--soft:#8a9e93;--line:#dde6df;--cream:#f4f0e6;--paper:#fdfcf7;--white:#ffffff;
    --moss:#1a3d28;--sage:#3d6b52;--gold:#9a7a35;--red:#b83030;--green:#1a5c3a;
    --shadow-xs:0 2px 8px rgba(15,26,21,.07);--shadow-sm:0 6px 20px rgba(15,26,21,.1);--shadow:0 16px 48px rgba(15,26,21,.14);--shadow-lg:0 32px 80px rgba(15,26,21,.18);
    --r:12px;--r-sm:8px;
  }
  *{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth}
  body{font-family:'Inter',ui-sans-serif,system-ui,sans-serif;color:var(--ink);background:var(--cream);overflow-x:hidden;-webkit-font-smoothing:antialiased}
  a{color:inherit;text-decoration:none}
  img{display:block;max-width:100%}

  /* ── DEMO BAR ── */
  .demo-bar{
    position:sticky;top:0;z-index:100;
    display:flex;justify-content:center;align-items:center;gap:12px;
    padding:10px 20px;
    background:var(--moss);color:#fff;
    font-size:13px;font-weight:500;text-align:center;line-height:1.4;
    letter-spacing:.01em;
  }
  .demo-bar strong{font-weight:700}
  .demo-bar a{
    display:inline-flex;align-items:center;gap:5px;
    color:#fff;font-weight:700;
    border-bottom:1px solid rgba(255,255,255,.4);
    padding-bottom:1px;
    transition:border-color .15s;
  }
  .demo-bar a:hover{border-color:#fff}

  /* ── NAV ── */
  .nav{
    position:absolute;top:46px;left:0;right:0;z-index:20;
    display:flex;align-items:center;justify-content:space-between;
    padding:18px clamp(20px,5vw,72px);
    color:#fff;
  }
  .brand{
    font-family:'Playfair Display',Georgia,serif;
    font-size:clamp(20px,2.4vw,30px);
    line-height:1;letter-spacing:-.01em;
  }
  .nav-links{display:flex;gap:24px;font-size:13.5px;font-weight:500;align-items:center;letter-spacing:.01em}
  .nav-links a{opacity:.88;transition:opacity .15s}
  .nav-links a:hover{opacity:1}
  .nav-cta{
    padding:9px 20px;border-radius:40px;
    border:1.5px solid rgba(255,255,255,.55);
    background:rgba(255,255,255,.12);
    backdrop-filter:blur(12px);
    font-weight:600;opacity:1 !important;
    transition:background .18s;
  }
  .nav-cta:hover{background:rgba(255,255,255,.22)}

  /* ── HERO ── */
  .hero{
    position:relative;
    min-height:96vh;
    display:grid;align-items:end;
    padding:160px clamp(20px,5vw,72px) 64px;
    color:#fff;
    overflow:hidden;
  }
  .hero-bg{
    position:absolute;inset:0;z-index:0;
    background-size:cover;background-position:center;
    transform:scale(1.04);
    transition:transform 8s ease;
  }
  .hero-bg::after{
    content:'';position:absolute;inset:0;
    background:linear-gradient(165deg,rgba(8,16,12,.18) 0%,rgba(8,16,12,.65) 55%,rgba(8,16,12,.88) 100%);
  }
  .hero>*{position:relative;z-index:1}
  .hero-grid{
    width:min(1240px,100%);
    display:grid;grid-template-columns:minmax(0,1fr) 400px;
    gap:clamp(32px,6vw,96px);
    align-items:end;
  }
  .eyebrow{
    display:inline-flex;align-items:center;gap:8px;
    margin-bottom:20px;
    color:rgba(255,255,255,.72);
    font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;
  }
  .eyebrow::before{content:'';display:block;width:24px;height:1.5px;background:rgba(255,255,255,.5)}
  h1{
    font-family:'Playfair Display',Georgia,serif;
    font-size:clamp(46px,7.5vw,110px);
    line-height:.93;letter-spacing:-.03em;font-weight:600;
  }
  .hero-copy{
    max-width:560px;margin-top:22px;
    color:rgba(255,255,255,.82);
    font-size:clamp(16px,1.8vw,20px);line-height:1.65;font-weight:400;
  }
  .hero-actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:32px}
  .btn{
    display:inline-flex;align-items:center;justify-content:center;gap:8px;
    min-height:48px;padding:0 26px;border-radius:40px;
    font-size:14px;font-weight:700;white-space:nowrap;cursor:pointer;
    border:1.5px solid transparent;transition:all .2s;
  }
  .btn-white{background:#fff;color:var(--ink);border-color:#fff;box-shadow:0 4px 20px rgba(0,0,0,.2)}
  .btn-white:hover{background:var(--cream);transform:translateY(-1px);box-shadow:0 8px 28px rgba(0,0,0,.22)}
  .btn-outline{background:rgba(255,255,255,.1);color:#fff;border-color:rgba(255,255,255,.45);backdrop-filter:blur(12px)}
  .btn-outline:hover{background:rgba(255,255,255,.2)}
  .btn-moss{background:var(--moss);color:#fff;border-color:var(--moss)}
  .btn-moss:hover{background:#23522f;transform:translateY(-1px)}

  /* ── BOOKING CARD ── */
  .booking-card{
    background:rgba(253,252,247,.97);color:var(--ink);
    padding:28px;border-radius:var(--r);
    box-shadow:var(--shadow-lg);
    backdrop-filter:blur(16px);
  }
  .booking-card-head{margin-bottom:20px}
  .booking-card-head h2{
    font-family:'Playfair Display',Georgia,serif;
    font-size:22px;font-weight:600;margin-bottom:4px;
  }
  .booking-card-head p{color:var(--muted);font-size:13px;line-height:1.5}
  .booking-row{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px}
  .field{
    border:1.5px solid var(--line);border-radius:var(--r-sm);
    padding:12px 14px;background:var(--white);
  }
  .field-label{display:block;margin-bottom:4px;color:var(--soft);font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.08em}
  .field strong{font-size:14px;font-weight:600}
  .booking-card .btn{width:100%;margin-top:4px}
  .commission-badge{
    display:flex;align-items:flex-start;gap:10px;
    margin-top:14px;padding:12px 14px;
    background:#f0faf4;border:1.5px solid #b8dfc8;border-radius:var(--r-sm);
    font-size:12.5px;color:var(--green);line-height:1.5;
  }
  .commission-badge-icon{flex-shrink:0;margin-top:1px;font-size:15px}

  /* ── SECTIONS ── */
  .section{padding:clamp(64px,9vw,120px) clamp(20px,5vw,72px)}
  .section-inner{width:min(1240px,100%);margin:0 auto}
  .section-head{
    display:grid;grid-template-columns:1fr 1fr;
    gap:clamp(24px,4vw,64px);align-items:end;margin-bottom:48px;
  }
  .kicker{
    display:inline-block;margin-bottom:12px;
    color:var(--sage);font-size:11px;font-weight:800;
    text-transform:uppercase;letter-spacing:.14em;
  }
  .kicker--light{color:rgba(255,255,255,.6)}
  h2{
    font-family:'Playfair Display',Georgia,serif;
    font-size:clamp(30px,4.5vw,58px);
    line-height:1.04;letter-spacing:-.025em;font-weight:600;
  }
  .lead{color:var(--muted);font-size:17px;line-height:1.78;font-weight:400}

  /* ── FEATURE SECTION ── */
  .feature-grid{display:grid;grid-template-columns:1.2fr .8fr;gap:16px;align-items:start}
  .image-panel{
    min-height:560px;border-radius:var(--r);
    background-size:cover;background-position:center;
    box-shadow:var(--shadow);
    position:relative;overflow:hidden;
  }
  .image-panel::after{
    content:'';position:absolute;inset:0;
    background:linear-gradient(180deg,transparent 60%,rgba(15,26,21,.18) 100%);
  }
  .detail-list{display:grid;gap:10px}
  .detail{
    display:flex;gap:16px;align-items:flex-start;
    padding:20px 22px;border-radius:var(--r-sm);
    background:var(--paper);border:1.5px solid var(--line);
    transition:border-color .2s,box-shadow .2s,transform .2s;
  }
  .detail:hover{border-color:var(--sage);box-shadow:var(--shadow-sm);transform:translateX(4px)}
  .detail-num{
    flex-shrink:0;
    width:32px;height:32px;border-radius:50%;
    display:flex;align-items:center;justify-content:center;
    background:var(--cream);border:1.5px solid var(--line);
    font-size:11px;font-weight:800;color:var(--sage);letter-spacing:.04em;
    margin-top:2px;
  }
  .detail h3{font-size:17px;font-weight:700;margin-bottom:5px;letter-spacing:-.01em}
  .detail p{color:var(--muted);line-height:1.65;font-size:14.5px}

  /* ── AMENITIES ── */
  .amenities{
    display:grid;grid-template-columns:repeat(4,1fr);
    border:1.5px solid var(--line);
    background:var(--paper);border-radius:var(--r);overflow:hidden;
  }
  .amenity{
    padding:24px 22px;
    border-right:1.5px solid var(--line);border-bottom:1.5px solid var(--line);
    transition:background .2s;
  }
  .amenity:hover{background:#f0f5f1}
  .amenity:nth-child(4n){border-right:0}
  .amenity-icon{display:block;font-size:18px;color:var(--sage);margin-bottom:10px}
  .amenity b{display:block;font-size:15px;font-weight:700;margin-bottom:6px;letter-spacing:-.01em}
  .amenity p{color:var(--muted);font-size:13.5px;line-height:1.65}

  /* ── GALLERY ── */
  .gallery-section{background:var(--ink);padding:clamp(64px,9vw,120px) clamp(20px,5vw,72px)}
  .gallery-section .kicker{color:rgba(255,255,255,.5)}
  .gallery-section h2{color:#fff}
  .gallery-section .lead{color:rgba(255,255,255,.55)}
  .gallery{display:grid;grid-template-columns:1.3fr .7fr .7fr;gap:12px;margin-top:48px}
  .gallery div{min-height:280px;border-radius:var(--r);background-size:cover;background-position:center;overflow:hidden;transition:transform .3s,box-shadow .3s}
  .gallery div:hover{transform:scale(1.01);box-shadow:var(--shadow)}
  .gallery .g1{grid-row:span 2;min-height:572px}
  .gallery .g4{
    background:linear-gradient(145deg,var(--sage) 0%,var(--moss) 100%);
    display:flex;align-items:flex-end;
    padding:24px;
  }
  .gallery .g4 p{
    font-family:'Playfair Display',Georgia,serif;
    font-size:clamp(16px,2vw,22px);color:#fff;line-height:1.3;
    border-top:1.5px solid rgba(255,255,255,.25);padding-top:14px;width:100%;
  }

  /* ── WHY SECTION ── */
  .why-section{background:var(--ink);padding:clamp(72px,10vw,130px) clamp(20px,5vw,72px)}
  .why-top{text-align:center;max-width:700px;margin:0 auto 56px}
  .why-h2{color:#fff;font-size:clamp(32px,5vw,60px)}
  .why-sub{color:rgba(255,255,255,.58);font-size:17px;line-height:1.75;margin-top:16px}
  .why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
  .why-card{
    padding:28px;border-radius:var(--r);
    border:1.5px solid rgba(255,255,255,.08);
    background:rgba(255,255,255,.04);
  }
  .why-bad{border-color:rgba(184,48,48,.3);background:rgba(184,48,48,.05)}
  .why-good{border-color:rgba(26,92,58,.4);background:rgba(26,92,58,.08)}
  .why-cta{border-color:rgba(255,255,255,.16);background:rgba(255,255,255,.07)}
  .why-label{
    display:inline-block;margin-bottom:18px;
    padding:4px 12px;border-radius:20px;
    font-size:11px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;
  }
  .why-label--bad{background:rgba(184,48,48,.15);color:#e07070}
  .why-label--good{background:rgba(26,92,58,.2);color:#6fcf97}
  .why-label--cta{background:rgba(255,255,255,.1);color:rgba(255,255,255,.8)}
  .why-card ul{list-style:none;display:grid;gap:10px}
  .why-card ul li{
    display:flex;align-items:flex-start;gap:9px;
    font-size:14px;line-height:1.6;color:rgba(255,255,255,.62);
  }
  .why-card ul li::before{content:'—';color:rgba(255,255,255,.25);flex-shrink:0;margin-top:1px}
  .why-bad ul li::before{content:'✕';color:#e07070;font-size:12px}
  .why-good ul li::before{content:'✓';color:#6fcf97;font-size:13px;font-weight:700}
  .why-cta ul li::before{content:'→';color:rgba(255,255,255,.5)}
  .why-cta-btn{
    display:inline-flex;align-items:center;justify-content:center;
    margin-top:24px;padding:12px 22px;border-radius:40px;width:100%;
    background:#fff;color:var(--moss);
    font-size:14px;font-weight:700;
    transition:background .18s,transform .15s;
  }
  .why-cta-btn:hover{background:var(--cream);transform:translateY(-1px)}

  /* ── CONTACT ── */
  .contact-grid{display:grid;grid-template-columns:.85fr 1.15fr;gap:16px;align-items:stretch}
  .map-card{
    position:relative;border-radius:var(--r);overflow:hidden;
    min-height:440px;display:flex;flex-direction:column;justify-content:flex-end;
    padding:32px;color:#fff;
    background-size:cover;background-position:center;
    box-shadow:var(--shadow);
  }
  .map-card::after{
    content:'';position:absolute;inset:0;
    background:linear-gradient(180deg,rgba(15,26,21,.05) 0%,rgba(15,26,21,.82) 100%);
  }
  .map-card>*{position:relative;z-index:1}
  .map-card .kicker{color:rgba(255,255,255,.55)}
  .map-card h3{
    font-family:'Playfair Display',Georgia,serif;
    font-size:clamp(22px,3vw,36px);font-weight:600;
    margin-bottom:8px;line-height:1.1;
  }
  .map-card p{color:rgba(255,255,255,.7);font-size:14.5px;line-height:1.6}
  .contact-card{
    background:var(--paper);border:1.5px solid var(--line);
    border-radius:var(--r);padding:36px;
  }
  .contact-card h2{font-size:clamp(26px,3.5vw,46px);margin-bottom:28px}
  .contact-lines{display:grid;gap:0;border-top:1.5px solid var(--line)}
  .contact-line{
    display:grid;grid-template-columns:auto 1fr;gap:16px;
    padding:16px 0;border-bottom:1.5px solid var(--line);
    align-items:baseline;
  }
  .contact-line-label{
    font-size:10.5px;font-weight:800;text-transform:uppercase;
    letter-spacing:.1em;color:var(--soft);white-space:nowrap;
  }
  .contact-line-val{font-size:15px;color:var(--ink);font-weight:500}
  .contact-actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:24px}
  .contact-note{margin-top:18px;color:var(--soft);font-size:12.5px;line-height:1.65}

  /* ── FOOTER ── */
  footer{
    padding:24px clamp(20px,5vw,72px);
    background:var(--white);border-top:1.5px solid var(--line);
    display:flex;justify-content:space-between;align-items:center;
    gap:16px;flex-wrap:wrap;
    font-size:13px;color:var(--soft);
  }
  footer a{color:var(--moss);font-weight:600}

  /* ── RESPONSIVE ── */
  @media(max-width:960px){
    .nav-links{display:none}
    .hero-grid,.feature-grid,.contact-grid,.section-head{grid-template-columns:1fr}
    .booking-card{max-width:100%}
    .amenities{grid-template-columns:repeat(2,1fr)}
    .amenity:nth-child(2n){border-right:0}
    .gallery{grid-template-columns:1fr 1fr}
    .gallery .g1{grid-row:auto;min-height:380px;grid-column:span 2}
    .why-grid{grid-template-columns:1fr}
  }
  @media(max-width:560px){
    .demo-bar{font-size:12px;gap:6px}
    .nav{top:46px}
    .hero{min-height:auto;padding-top:130px}
    .hero-grid,.section-inner{width:100%;max-width:calc(100vw - 32px)}
    .hero-grid>div,.hero-copy,.booking-card{width:min(360px,calc(100vw - 40px));max-width:min(360px,calc(100vw - 40px))}
    .section-head>div,.lead,.contact-card,.map-card{max-width:min(380px,calc(100vw - 40px))}
    .hero-actions,.contact-actions{flex-direction:column}
    .btn,.why-cta-btn{width:100%}
    .booking-row,.amenities,.gallery{grid-template-columns:1fr}
    .amenity:nth-child(n){border-right:0}
    .gallery .g1{grid-column:auto}
    .gallery div,.gallery .g1,.image-panel,.map-card{min-height:320px}
    .hero-copy,.lead,h1,h2{max-width:100%}
    h1{font-size:38px;line-height:1.05}
    h2{font-size:30px}
    .section-head{grid-template-columns:1fr}
  }
`;

function render(property) {
  required(property, ["name","slug","location","headline","description","heroImage","contact.phone"]);
  if (!slugSafe(property.slug)) throw new Error(`Invalid slug: ${property.slug}`);

  const wa = whatsappUrl(property);
  const featureImage = property.featureImage || property.heroImage;
  const firstGallery = property.gallery?.[0] || property.heroImage;

  return `<!doctype html>
<html lang="tr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(property.name)} | Rezervasyon Vitrini</title>
  <meta name="description" content="${escapeHtml(property.name)} — ${escapeHtml(property.location)}. Direkt rezervasyon, komisyon yok.">
  <style>${CSS}</style>
</head>
<body>

  <div class="demo-bar">
    Bu sayfa <strong>${escapeHtml(property.name)}</strong> için özel hazırlandı &nbsp;·&nbsp;
    <a href="${wa}" target="_blank" rel="nofollow">Sahiplenin, yayına alın →</a>
  </div>

  <nav class="nav" aria-label="Ana navigasyon">
    <a class="brand" href="#">${escapeHtml(property.name)}</a>
    <div class="nav-links">
      <a href="#deneyim">Deneyim</a>
      <a href="#olanaklar">Olanaklar</a>
      <a href="#galeri">Galeri</a>
      <a href="#neden">Neden kendi sitesi?</a>
      <a href="#iletisim" class="nav-cta">Müsaitlik Sor</a>
    </div>
  </nav>

  <header class="hero">
    <div class="hero-bg" style="background-image:url('${cssUrl(property.heroImage)}')"></div>
    <div class="hero-grid">
      <div>
        <p class="eyebrow">${escapeHtml(property.eyebrow || property.location)}</p>
        <h1>${escapeHtml(property.headline)}</h1>
        <p class="hero-copy">${escapeHtml(property.description)}</p>
        <div class="hero-actions">
          <a class="btn btn-white" href="${wa}" target="_blank" rel="nofollow">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp'tan Müsaitlik Sor
          </a>
          <a class="btn btn-outline" href="#galeri">Galeriye Bak</a>
        </div>
      </div>
      <aside class="booking-card" aria-label="Rezervasyon ön talep">
        <div class="booking-card-head">
          <h2>Hızlı ön talep</h2>
          <p>Doğrudan iletişim — platform komisyonu olmadan.</p>
        </div>
        <div class="booking-row">
          <div class="field"><span class="field-label">Giriş</span><strong>Tarih seçilecek</strong></div>
          <div class="field"><span class="field-label">Çıkış</span><strong>Tarih seçilecek</strong></div>
        </div>
        <div class="booking-row">
          <div class="field"><span class="field-label">Misafir</span><strong>Kişi sayısı</strong></div>
          <div class="field"><span class="field-label">Konaklama</span><strong>${escapeHtml(property.type || "Konaklama")}</strong></div>
        </div>
        <a class="btn btn-moss" href="${wa}" target="_blank" rel="nofollow">WhatsApp'a Bağlan →</a>
        <div class="commission-badge">
          <span class="commission-badge-icon">✓</span>
          <span>Booking.com komisyonu yok — her rezervasyonun tamamı size kalır.</span>
        </div>
      </aside>
    </div>
  </header>

  <main>

    <section class="section" id="deneyim">
      <div class="section-inner">
        <div class="section-head">
          <div>
            <p class="kicker">Konaklama Deneyimi</p>
            <h2>Misafir karar vermek için gereken her şeyi burada bulur.</h2>
          </div>
          <p class="lead">Tesis bilgileri, görseller ve rezervasyon tek sayfada. Misafir başka yere bakmadan, doğrudan sizi arar.</p>
        </div>
        <div class="feature-grid">
          <div class="image-panel" style="background-image:url('${cssUrl(featureImage)}')" role="img" aria-label="${escapeHtml(property.name)} görseli"></div>
          <div class="detail-list">${renderFeatures(property.features || [])}</div>
        </div>
      </div>
    </section>

    <section class="section" id="olanaklar">
      <div class="section-inner">
        <div class="section-head">
          <div>
            <p class="kicker">Olanaklar</p>
            <h2>Siteniz soruları peşinen yanıtlar.</h2>
          </div>
          <p class="lead">Misafirler özellikleri başka platformlarda aramak zorunda kalmaz — her şey burada, net ve hızlı.</p>
        </div>
        <div class="amenities">${renderAmenities(property.amenities || [])}</div>
      </div>
    </section>

    <section class="gallery-section" id="galeri">
      <div class="section-inner">
        <div class="section-head">
          <div>
            <p class="kicker">Galeri</p>
            <h2>Fotoğraflar rezervasyon kararını verir.</h2>
          </div>
          <p class="lead">İyi kurulmuş bir site, doğru görsellerle platformlara kıyasla çok daha yüksek dönüşüm sağlar.</p>
        </div>
        <div class="gallery" aria-label="${escapeHtml(property.name)} galeri">${renderGallery(property.gallery || [property.heroImage])}</div>
      </div>
    </section>

    ${renderWhySection(wa)}

    <section class="section" id="iletisim">
      <div class="section-inner">
        <div class="section-head">
          <div>
            <p class="kicker">İletişim</p>
            <h2>Rezervasyon için doğrudan ulaşın.</h2>
          </div>
          <p class="lead">Aracı platform yok. Misafir doğrudan sizi arar, ödeme direkt size gelir.</p>
        </div>
        <div class="contact-grid">
          <div class="map-card" style="background-image:url('${cssUrl(firstGallery)}')">
            <p class="kicker">Konum</p>
            <h3>${escapeHtml(property.location)}</h3>
            <p>Detaylı konum ve çevre rehberi yayın aşamasında eklenir.</p>
          </div>
          <div class="contact-card">
            <h2>Müsaitlik ve rezervasyon</h2>
            <div class="contact-lines">
              <div class="contact-line">
                <span class="contact-line-label">Telefon / WhatsApp</span>
                <span class="contact-line-val">${escapeHtml(property.contact.phone)}</span>
              </div>
              ${property.contact.email ? `<div class="contact-line"><span class="contact-line-label">E-posta</span><span class="contact-line-val">${escapeHtml(property.contact.email)}</span></div>` : ""}
              <div class="contact-line">
                <span class="contact-line-label">Adres</span>
                <span class="contact-line-val">${escapeHtml(property.contact.address || property.location)}</span>
              </div>
              ${property.contact.instagram ? `<div class="contact-line"><span class="contact-line-label">Instagram</span><span class="contact-line-val">@${escapeHtml(property.contact.instagram)}</span></div>` : ""}
            </div>
            <div class="contact-actions">
              <a class="btn btn-moss" href="${wa}" target="_blank" rel="nofollow">WhatsApp'a Git</a>
              ${property.contact.email ? `<a class="btn btn-outline" style="color:var(--moss);border-color:var(--moss);background:transparent" href="mailto:${escapeHtml(property.contact.email)}">E-posta Gönder</a>` : ""}
            </div>
            <p class="contact-note">Bu taslak site, yayın öncesi işletme onayıyla fiyat, müsaitlik ve koşullarla tamamlanır.</p>
          </div>
        </div>
      </div>
    </section>

  </main>

  <footer>
    <span>${escapeHtml(property.name)} — ${escapeHtml(property.location)}</span>
    <span>Taslak <a href="${wa}" target="_blank" rel="nofollow">Vent</a> tarafından hazırlandı · Yayına almak için iletişime geçin</span>
  </footer>

</body>
</html>`;
}

fs.mkdirSync(outDir, { recursive: true });
const built = [];
let firstHtml = "";

for (const file of fs.readdirSync(dataDir).filter((f) => f.endsWith(".json"))) {
  const property = JSON.parse(fs.readFileSync(path.join(dataDir, file), "utf8"));
  const html = render(property);
  if (!firstHtml) firstHtml = html;
  fs.writeFileSync(path.join(outDir, property.slug + ".html"), html);
  built.push({ name: property.name, slug: property.slug, location: property.location, type: property.type });
  console.log(`built demos/public/${property.slug}.html`);
}

if (firstHtml) {
  fs.writeFileSync(path.join(outDir, "index.html"), firstHtml);
  console.log("built demos/public/index.html");
}

const indexRows = built.map((p) => `
      <a class="demo-item" href="${p.slug}.html">
        <div>
          <strong>${escapeHtml(p.name)}</strong>
          <span>${escapeHtml(p.type || "Konaklama")} — ${escapeHtml(p.location)}</span>
        </div>
        <span class="arrow">→</span>
      </a>`).join("");

fs.writeFileSync(path.join(outDir, "list.html"), `<!doctype html>
<html lang="tr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Konaklama Demo Vitrinleri — Vent</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=Inter:wght@400;500;700&display=swap');
    body{margin:0;font-family:'Inter',ui-sans-serif,sans-serif;background:#f4f0e6;color:#0f1a15;-webkit-font-smoothing:antialiased}
    main{width:min(820px,calc(100vw - 36px));margin:0 auto;padding:72px 0}
    h1{font-family:'Playfair Display',Georgia,serif;font-size:clamp(34px,7vw,68px);line-height:1;margin:0 0 12px;letter-spacing:-.02em}
    .sub{color:#5a6b62;font-size:16px;line-height:1.7;margin:0 0 40px}
    .list{display:grid;gap:8px}
    .demo-item{
      display:flex;justify-content:space-between;align-items:center;gap:16px;
      padding:18px 22px;
      border:1.5px solid #dde6df;border-radius:10px;
      background:#fdfcf7;text-decoration:none;color:inherit;
      transition:border-color .18s,box-shadow .18s,transform .15s;
    }
    .demo-item:hover{border-color:#3d6b52;box-shadow:0 6px 20px rgba(15,26,21,.1);transform:translateX(3px)}
    .demo-item strong{display:block;font-size:17px;font-weight:700;margin-bottom:3px}
    .demo-item span{color:#5a6b62;font-size:13.5px}
    .arrow{color:#1a3d28;font-size:20px;opacity:.4;flex-shrink:0}
    .demo-item:hover .arrow{opacity:.8}
  </style>
</head>
<body>
  <main>
    <h1>Demo vitrinler</h1>
    <p class="sub">İşletmeler için özel hazırlanmış taslak siteler. Komisyon ödemeden direkt rezervasyon.</p>
    <div class="list">${indexRows}</div>
  </main>
</body>
</html>`);
