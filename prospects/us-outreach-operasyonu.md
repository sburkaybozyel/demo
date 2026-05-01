# US Boutique Lodging Outreach Operasyonu (Yol Haritası)

## Proje Özeti
**Hedef:** Amerika'nın yükselen tatil bölgelerindeki (Idyllwild, Broken Bow, Taos vb.) butik otel, motel ve kabin işletmelerine demo web sitesi sunarak müşteri kazanmak.
**Fiyatlandırma:** $200 - $250 (İşletme başına tek seferlik veya yıllık barındırma dahil)
**Değer Önerisi (Value Prop):** Booking/Expedia gibi OTA'lara (Online Travel Agencies) %15-20 komisyon ödemeyi bırakın, doğrudan rezervasyon alın.
**Demo Link Formatı:** `sburkaybozyel.github.io/demo/[slug]` (İngilizce kopya ile)

---

## Aşama 1: Veri Toplama (Scraping & Research)
Hedef pazardaki potansiyel müşterilerin belirlenmesi.

1. **Bölge Seçimi:** İlk olarak **Broken Bow, Oklahoma** ve **Idyllwild, California** gibi bağımsız tatil evlerinin/kabinlerin yoğun olduğu bölgelerle başlanacak.
2. **Filtreleme Kriterleri:** 
   - Google Maps üzerinden `boutique hotel`, `cabins`, `bed and breakfast`, `motel` araması yapılacak.
   - Resmi bir web sitesi **olmayan** veya linki bozuk olan işletmeler filtrelenecek.
   - İletişim için geçerli bir **Instagram hesabı** veya **WhatsApp/SMS** numarası bulunacak.
3. **Çıktı:** Tıpkı Türkiye pazarındaki gibi `us-deep-research-report.md` oluşturulacak.

---

## Aşama 2: Otomatize Demo Üretimi (Pipeline)
Türkiye için kurulan sistemin ABD pazarına entegre edilmesi.

1. **Dil Adaptasyonu:** JSON veri yapılarındaki metinler İngilizce'ye çevrilecek (Örn: *Headline: Peaceful Stay at [Hotel Name]*).
2. **Gerçek Görsel Çekimi:** `fetch_images.js` (Bing Scraper) kullanılarak işletmelerin kendi gerçek fotoğrafları anında JSON'a eklenecek.
3. **Toplu Render & Deploy:** Her 5'li veya 10'lu grup için `npm run build:demos` çalıştırılıp GitHub/Netlify üzerinden otomatik yayına alınacak.

---

## Aşama 3: İletişim (Outreach) & Mesaj Şablonları
İletişim tamamen İngilizce, çok kısa ve "merak uyandırıcı" (low-friction) olacak. 

### Instagram DM / WhatsApp Şablonu (Kısa ve Net)
> "Hi [Name/Hotel Name], I noticed you don't have a direct website for your property. I went ahead and built a free draft for you here: 
> https://sburkaybozyel.github.io/demo/[slug]/
> 
> A dedicated site helps you avoid Airbnb/Booking.com commissions and get direct bookings. Let me know if you're interested in making it official. Cheers!"

### Geri Dönüş (Follow-up) Şablonu
> "Hey! Just checking if you had a chance to look at the draft. We charge a one-time fee of $250 to get it fully live within 48 hours. Let me know if you have any questions!"

---

## Aşama 4: Satış & Kapanış (Conversion)
1. **Ödeme Altyapısı:** Anlaşma sağlanan işletmelere anında Stripe (veya kullanmakta olduğunuz) ödeme linki gönderilecek.
2. **Teslimat:** Ödeme alındıktan sonra taslak site kendi domainlerine (`.com`) bağlanarak teslim edilecek.
3. **Tablo Takibi:** Tüm süreç bu dökümanın altındaki takip tablolarında (Türkiye operasyonunda olduğu gibi) durum kodlarıyla (✅, 📤, 💰) takip edilecek.

---

## İlk Eylem Adımı (Next Step)
Aşama 1'i başlatmak için arkaplanda Google Maps ve Instagram taraması yapan bir script (`find_us_hotels.js`) oluşturulup, belirlediğimiz pilot bölge için ilk 20-30 işletmelik listeyi (hedef listesi) çıkaracağız.
