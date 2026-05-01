# B2B Web Outreach - Yeni Çalışma Mekanizması

Bu dosya, operasyonda 100% doğruluk oranına ulaşmak için kurulan yeni ve hatasız "Terminal DNS Doğrulama" mekanizmasını ve güncel hedefleri içermektedir.

## 1. Çalışma Mekanizması (Sıfır Hata Protokolü)
Eski ve hatalı Google arama özetleri tamamen terk edilmiştir. Bunun yerine aşağıdaki adımlar uygulanır:
1. **Veri Çekme:** OpenStreetMap (OSM) gibi kapalı ve güvenilir veritabanlarından bölgedeki (örn. Mersin) tüm otel/apart isimleri arka planda terminal üzerinden çekilir.
2. **DNS Ping Testi:** Bulunan her işletmenin tüm olası domain kombinasyonlarına (`.com`, `.com.tr`, `otel.com`, vb.) arka planda sunucu üzerinden ping atılır (`nslookup`).
3. **Filtreleme:** Eğer bir işletmenin *hiçbir* domain kaydı yoksa (DNS sonucu `NXDOMAIN` ise), işletmenin kesin olarak resmi web sitesi olmadığı doğrulanır.
4. **Onay ve JSON:** Sadece bu acımasız testten geçen 10 adet %100 web sitesiz işletme listeye alınır ve JSON taslakları oluşturulur.
5. **Deploy:** `node scripts/build_demo_sites.js` ile statik build alınır ve GitHub Pages'a pushlanır.

## 2. Güncel Hedef Listesi (10 Adet %100 Onaylı)

| # | İşletme | Telefon | Kanal (Instagram) | Demo Linki | Durum |
|---|---------|---------|-------------------|------------|-------|
| 1 | Turuva Apart Otel | +90 5XX XXX XX XX | @turuvaapartotel | [link](https://sburkaybozyel.github.io/demo/turuva-apart-otel) | ✅ |
| 2 | Su Cafe Pansiyon | +90 5XX XXX XX XX | @sucafepansiyon | [link](https://sburkaybozyel.github.io/demo/su-cafe-pansiyon) | ✅ |
| 3 | Otel Kumsalda | +90 5XX XXX XX XX | @otelkumsalda | [link](https://sburkaybozyel.github.io/demo/otel-kumsalda) | ✅ |
| 4 | Aria Plus Ev Otel | +90 5XX XXX XX XX | @ariaplusevotel | [link](https://sburkaybozyel.github.io/demo/aria-plus-ev-otel) | ✅ |
| 5 | Burhanoğlu Konağı Butik Otel | +90 5XX XXX XX XX | @burhanoglukonagibutikotel | [link](https://sburkaybozyel.github.io/demo/burhanoglu-konagi-butik-otel) | ✅ |
| 6 | Marde Otel | +90 5XX XXX XX XX | @mardeotel | [link](https://sburkaybozyel.github.io/demo/marde-otel) | ✅ |
| 7 | Tayfun Otel | +90 5XX XXX XX XX | @tayfunotel | [link](https://sburkaybozyel.github.io/demo/tayfun-otel) | ✅ |
| 8 | Clup Efes Otel | +90 5XX XXX XX XX | @clupefesotel | [link](https://sburkaybozyel.github.io/demo/clup-efes-otel) | ✅ |
| 9 | Yuvam Hotel | +90 5XX XXX XX XX | @yuvamhotel | [link](https://sburkaybozyel.github.io/demo/yuvam-hotel) | ✅ |
| 10 | Nisan Otel | +90 5XX XXX XX XX | @nisanotel | [link](https://sburkaybozyel.github.io/demo/nisan-otel) | ✅ |

## 3. Gönderilecek Standart Mesaj Şablonu

Merhaba, [İşletme Adı] için ücretsiz bir web sitesi taslağı hazırladım:
[Demo Linki]

İlgilenirseniz detaylar için buradayım.
İyi günler.
