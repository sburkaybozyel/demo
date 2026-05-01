# Konaklama Web Sitesi Outreach Operasyonu

## Proje Özeti

**Hedef:** Sapanca başta olmak üzere turistik bölgelerdeki konaklama işletmelerine demo web sitesi sunarak müşteri kazanmak.

**Fiyat:** 7.500 TL (işletme başına)

**Demo link formatı:** `sburkaybozyel.github.io/demo/[isletme-adi]`

**Kaynak:** [savibu.org.tr/villa-isletmeleri](https://savibu.org.tr/villa-isletmeleri)

---

## Operasyon Kuralları

1. Her işletme için önce demo site hazırla, sonra mesaj at
2. Demo sitede gerçek fotoğraf kullan (buvibu.com, otelz.com veya doğrudan Instagram linki)
3. Mesaj WhatsApp veya Instagram DM olarak gönderilir
4. Gönderimden sonra tabloyu güncelle
5. Günde minimum 30-40 işletmeye yazılır
6. Geri dönüş yapanlara 24 saat içinde yanıt verilir
7. İlk mesaj her zaman kısa ve net olur: sadece işletme adı, demo linki ve "ilgilenirseniz detaylar için buradayım" cümlesi kullanılır
8. İlk mesajda kendini tanıtma, avantaj anlatma, komisyon/ödeme/Google detayı, emoji ve uzun satış metni kullanılmaz

---

## Mesaj Şablonları

### Ana Şablon (WhatsApp / Instagram DM)

> Merhaba, [İŞLETME ADI] için ücretsiz bir web sitesi taslağı hazırladım:
> https://sburkaybozyel.github.io/demo/[SLUG]/
>
> İlgilenirseniz detaylar için buradayım.
> İyi günler.

---

### Kısa Versiyon (Instagram DM — karakter sınırı)

> Merhaba, [İŞLETME ADI] için ücretsiz bir web sitesi taslağı hazırladım:
> https://sburkaybozyel.github.io/demo/[SLUG]/
>
> İlgilenirseniz detaylar için buradayım.
> İyi günler.

---

### Geri Dönüş Geldiğinde — Takip Mesajı

> Merhaba, geçen gün site taslağını göndermiştim. Bakabildiyseniz ne düşündüğünüzü merak ettim.
>
> Kısaca: Booking.com/Airbnb'ye ödediğiniz komisyon biter, misafirler direkt sizi arar, ödemeyi kendiniz alırsınız. Fiyat 7.500 TL, 7 günde yayında.
>
> Uygunsa 15 dakikalık kısa bir görüşme yapabilir miyiz?

---

## Demo Teknik Akış

1. `demos/data/[slug].json` dosyası oluştur
2. `node scripts/build_demo_sites.js` çalıştır
3. `git add . && git commit -m "..." && git push github main`
4. GitHub Action otomatik olarak `gh-pages` branch'ine deploy eder.
5. Link hazır: `sburkaybozyel.github.io/demo/[slug]`

---

## Durum Kodları

| Kod | Anlam |
|-----|-------|
| ⬜ | Demo hazırlanmadı |
| 🔨 | Demo hazırlanıyor |
| ✅ | Demo hazır |
| 📤 | Mesaj gönderildi |
| 💬 | Geri dönüş geldi |
| 🤝 | Görüşme yapıldı |
| 💰 | Satış tamamlandı |
| ❌ | İlgilenmedi |

---

## Hedef Listesi - Sapanca

### Gönderildi

| # | İşletme | Telefon | Kanal | Demo | Gönderim | Durum | Not |
|---|---------|---------|-------|------|----------|-------|-----|
| 1 | Sebilla Sapanca | +90 546 796 90 33 | WhatsApp | [link](https://sburkaybozyel.github.io/demo/sebilla-sapanca) | 2026-04-30 | 📤 | |
| 2 | Koçbey Butik Otel | +90 533 232 33 74 | Instagram @kocbeybutikotelsapanca | [link](https://sburkaybozyel.github.io/demo/kocbey-butik-otel) | 2026-04-30 | 📤 | |

---

### Sırada - Demo Hazırlanacak

| # | İşletme | Telefon | Instagram | Demo | Durum |
|---|---------|---------|-----------|------|-------|
| 3 | Elysium Sapanca | 0530 521 58 96 | | [link](https://sburkaybozyel.github.io/demo/elysium-sapanca) | ✅ |
| 4 | Villa Azul & Verde | 0501 480 49 54 | | [link](https://sburkaybozyel.github.io/demo/villa-azul-verde) | ✅ |
| 5 | Nailiye Sapanca Dağ Evleri | 0532 113 03 88 | | ⬜ | ⬜ |
| 6 | Villa Uğur | 0530 497 88 02 | | ⬜ | ⬜ |
| 7 | Yakut Villam | 0533 380 69 73 | | ⬜ | ⬜ |
| 8 | Villa BND Sapanca | 0530 014 98 84 | | ⬜ | ⬜ |
| 9 | Tablo Sapanca | 0530 554 87 58 | | ⬜ | ⬜ |
| 10 | Erdil Villa | 0533 164 10 43 | | ⬜ | ⬜ |
| 11 | White Home | 0505 855 89 54 | | ⬜ | ⬜ |
| 12 | Sapanca Villa İpekyol | 0537 043 04 02 | | ⬜ | ⬜ |
| 13 | Doktorun Evi | 0532 545 76 82 | | ⬜ | ⬜ |
| 14 | Kule Sapanca | 0543 166 54 54 | | ⬜ | ⬜ |
| 15 | Gül Ev Sapanca | 0549 501 00 54 | | ⬜ | ⬜ |
| 16 | Villa Pine Sapanca | 0545 571 88 73 | | ⬜ | ⬜ |
| 17 | Astra Wooden House | 0535 631 24 91 | | ⬜ | ⬜ |
| 18 | Elmalı Bahçe Sapanca | 0507 961 28 30 | | ⬜ | ⬜ |
| 19 | Villa Blue Sapanca | 0538 073 21 72 | | ⬜ | ⬜ |
| 20 | Karakaya Villa Suit | 0532 720 24 44 | | ⬜ | ⬜ |
| 21 | Villa Liya | 0530 399 11 96 | | ⬜ | ⬜ |
| 22 | Villam Sapanca | 0538 070 05 58 | | ⬜ | ⬜ |
| 23 | Villa Sakin Sapanca | 0532 740 92 01 | | ⬜ | ⬜ |
| 24 | Sapanca Villa Şen | 0541 395 99 19 | | ⬜ | ⬜ |
| 25 | Nevras Resort Sapanca | 0537 486 14 51 | | ⬜ | ⬜ |
| 26 | Sapanca Işıklı Bahçe Villa | 0507 856 41 21 | | ⬜ | ⬜ |
| 27 | Alyas Haus Sapanca | 0533 432 49 54 | | ⬜ | ⬜ |
| 28 | Alphan House | 0532 173 33 54 | | ⬜ | ⬜ |
| 29 | Villa SEU | 0542 794 44 14 | | ⬜ | ⬜ |
| 30 | Aşiyan Konaklama | 0507 926 73 90 | | ⬜ | ⬜ |
| 31 | Merjan Sapanca | 0533 917 33 54 | | ⬜ | ⬜ |
| 32 | Villa Focus Sapanca | 0505 296 78 56 | | ⬜ | ⬜ |
| 33 | Sapanca Melih Villa | 0506 638 94 60 | | ⬜ | ⬜ |
| 34 | Bungo Rise Bungalov & Villa | 0505 891 71 06 | | ⬜ | ⬜ |
| 35 | Sapanca Montana Villa | 0554 567 33 33 | | ⬜ | ⬜ |
| 36 | Nil Konaklama Sapanca | 0532 379 85 97 | | ⬜ | ⬜ |
| 37 | İkiz Villalar | 0539 252 92 48 | | ⬜ | ⬜ |
| 38 | Luz de Luna Sapanca | 0535 029 97 97 | | ⬜ | ⬜ |
| 39 | Sapanca Villa Fivestar | 0533 669 26 41 | | ⬜ | ⬜ |
| 40 | My Natural Villa | 0533 271 49 77 | | ⬜ | ⬜ |
| 41 | Villa Saraylı Sapanca | 0533 343 04 35 | | ⬜ | ⬜ |
| 42 | Şengül Konaklama | 0530 204 34 61 | | ⬜ | ⬜ |
| 43 | World Class Sapanca | 0535 628 67 40 | | ⬜ | ⬜ |
| 44 | Posada Sapanca | 0539 686 41 27 | | ⬜ | ⬜ |
| 45 | Havuzlu Bahçe | 0538 327 37 33 | | ⬜ | ⬜ |
| 46 | Sapanca Pink House Atlas | 0552 441 92 30 | | ⬜ | ⬜ |
| 47 | Villa Frapan | 0536 673 47 07 | | ⬜ | ⬜ |
| 48 | Efe Köy Evi | 0533 640 68 84 | | ⬜ | ⬜ |
| 49 | Selvi Life Villas | 0534 602 95 06 | | ⬜ | ⬜ |
| 50 | Kale Houses | 0541 930 21 28 | | ⬜ | ⬜ |
| 51 | Villa Ay Işığı Sapanca | 0532 795 77 44 | | ⬜ | ⬜ |
| 52 | Yakut Villas | 0532 723 77 06 | | ⬜ | ⬜ |
| 53 | Mehmet Bey Villaları | 0543 490 10 61 | | ⬜ | ⬜ |
| 54 | Zirve Konak Resort | 0534 447 22 38 | | ⬜ | ⬜ |
| 55 | Pago Villa Sapanca | 0555 034 11 00 | | ⬜ | ⬜ |
| 56 | Konak Sapanca | 0545 877 54 00 | | ⬜ | ⬜ |
| 57 | Kıyıcı Konak | 0532 630 80 08 | | ⬜ | ⬜ |
| 58 | Nihane Villa | 0507 147 13 07 | | ⬜ | ⬜ |
| 59 | Sapanca Villa Eyfel | 0536 251 97 87 | | ⬜ | ⬜ |
| 60 | Sapanca Hot Ice Villa | 0552 813 05 10 | | ⬜ | ⬜ |
| 61 | Sasirius Shine Sapanca | 0546 259 01 01 | | ⬜ | ⬜ |
| 62 | Villa Nilüfer Sapanca | 0544 448 94 96 | | ⬜ | ⬜ |
| 63 | Sapanca Aynalı Villa | 0507 534 41 54 | | ⬜ | ⬜ |
| 64 | Villa Cevizli | 0539 596 63 07 | | ⬜ | ⬜ |
| 65 | Villa Polente | 0532 556 74 85 | | ⬜ | ⬜ |
| 66 | Sofhan Kırkpınar | 0530 681 55 55 | | ⬜ | ⬜ |
| 67 | Villa Abuç Sapanca | 0507 567 54 51 | | ⬜ | ⬜ |
| 68 | Villa Keyif | 0554 701 53 81 | | ⬜ | ⬜ |
| 69 | Sapancaba Villas | 0532 551 54 41 | | ⬜ | ⬜ |
| 70 | Mega Village Sapanca | 0534 227 15 47 | | ⬜ | ⬜ |
| 71 | Kırkpınar Göl Yolu Evleri | 0530 932 71 41 | | ⬜ | ⬜ |
| 72 | Sapanca Bakır Dağ Evi | 0536 612 90 12 | | ⬜ | ⬜ |
| 73 | Kozahan Dağ Evi | 0532 716 01 22 | | ⬜ | ⬜ |
| 74 | Boss Villa Garden | 0530 785 45 54 | | ⬜ | ⬜ |
| 75 | Stargate Sapanca Villa | 0541 523 73 61 | | ⬜ | ⬜ |
| 76 | Safir Sapanca Villas | 0549 100 54 00 | | ⬜ | ⬜ |
| 77 | Eren Villa Sapanca | 0532 651 71 05 | | ⬜ | ⬜ |
| 78 | Sapanca Begonvilla | 0532 592 10 43 | | ⬜ | ⬜ |
| 79 | Villa B Private Sapanca | 0535 564 32 56 | | ⬜ | ⬜ |
| 80 | Sapanca Villa Klass | 0538 037 31 11 | | ⬜ | ⬜ |
| 81 | Shiningore Sapanca | 0532 566 85 79 | | ⬜ | ⬜ |
| 82 | Sunset Villas Sapanca | 0532 332 72 84 | | ⬜ | ⬜ |
| 83 | Villa Moyo | 0532 414 17 70 | | ⬜ | ⬜ |
| 84 | Sawsana Villaları | 0530 299 09 41 | | ⬜ | ⬜ |
| 85 | Yel Değirmeni Villaları | 0552 460 54 09 | | ⬜ | ⬜ |
| 86 | Sapanca Selvilla | 0530 626 93 54 | | ⬜ | ⬜ |
| 87 | Sapanca Tanura Villa | 0534 716 13 64 | | ⬜ | ⬜ |
| 88 | Kiwi Sapanca | 0531 360 29 30 | | ⬜ | ⬜ |
| 89 | BG Sapanca Hotel | 0532 015 01 54 | | ⬜ | ⬜ |
| 90 | Sapanca Çark Taş Ev | 0533 685 16 55 | | ⬜ | ⬜ |
| 91 | Gigi Village Sapanca | 0530 844 57 79 | | ⬜ | ⬜ |
| 92 | Tale House Sapanca | 0542 712 39 04 | | ⬜ | ⬜ |
| 93 | Sapanca Villa Bahçe | 0533 283 29 29 | | ⬜ | ⬜ |
| 94 | Lotus Villa Bungalov | 0533 339 50 98 | | ⬜ | ⬜ |
| 95 | Arı Villaları Sapanca | 0532 270 18 08 | | ⬜ | ⬜ |
| 96 | Villa Poli | 0533 210 55 87 | | ⬜ | ⬜ |
| 97 | Lacasede Madera | 0530 175 24 76 | | ⬜ | ⬜ |
| 98 | Casamia Suit | 0533 134 54 10 | | ⬜ | ⬜ |
| 99 | Villa Aras | 0535 399 99 98 | | ⬜ | ⬜ |
| 100 | Sapanca Demir Dağ Evi | 0532 604 67 02 | | ⬜ | ⬜ |
| 101 | Twinvil Sapanca | 0533 618 95 54 | | ⬜ | ⬜ |
| 102 | Güzel Evler Sapanca | 0545 254 64 54 | | ⬜ | ⬜ |
| 103 | Sapanca Seyrü Sefa Villa | 0532 698 85 41 | | ⬜ | ⬜ |
| 104 | Sapanca Lavender | 0541 672 91 70 | | ⬜ | ⬜ |
| 105 | Sade Sapanca | 0531 247 50 35 | | ⬜ | ⬜ |
| 106 | Begonvil Konaklama | 0501 070 31 25 | | ⬜ | ⬜ |
| 107 | Hidden Garden Villa | 0533 501 04 54 | | ⬜ | ⬜ |
| 108 | Deep Luxury Sapanca | 0542 589 51 54 | | ⬜ | ⬜ |
| 109 | Han Sapanca | 0532 569 84 34 | | ⬜ | ⬜ |
| 110 | Tropical Sapanca | 0533 203 28 23 | | ⬜ | ⬜ |
| 111 | Bons House | 0531 684 87 93 | | ⬜ | ⬜ |
| 112 | Sümbül House | 0539 818 79 10 | | ⬜ | ⬜ |
| 113 | Sunset Villa Bungalov | 0554 253 27 79 | | ⬜ | ⬜ |
| 114 | Sapanca Villa Kivi | 0533 639 62 54 | | ⬜ | ⬜ |
| 115 | Sindoma Mountain House | 0538 546 00 23 | | ⬜ | ⬜ |
| 116 | Villa Holiday | 0532 502 61 99 | | ⬜ | ⬜ |
| 117 | Taş Bahçe Sapanca | 0530 368 88 54 | | ⬜ | ⬜ |
| 118 | Villa Arif Bey Sapanca | 0553 222 03 64 | | ⬜ | ⬜ |
| 119 | Green Palace Butik Villa | 0543 504 54 54 | | ⬜ | ⬜ |
| 120 | Nibras Villa Resort | 0552 832 24 88 | | ⬜ | ⬜ |
| 121 | Villa Fazi | 0530 525 88 68 | | ⬜ | ⬜ |
| 122 | Villa North Sapanca | 0532 212 25 01 | | ⬜ | ⬜ |
| 123 | Bonana Villaları | 0530 496 01 89 | | ⬜ | ⬜ |
| 124 | Villa in Nature Sapanca | 0535 048 18 82 | | ⬜ | ⬜ |
| 125 | Sapanca İnci Suit | 0535 785 17 54 | | ⬜ | ⬜ |
| 126 | Sapanca Sunrise Villa | 0533 371 36 12 | | ⬜ | ⬜ |
| 127 | Country Life Sapanca | 0533 503 80 53 | | ⬜ | ⬜ |
| 128 | Villa Vadi | 0533 359 08 86 | | ⬜ | ⬜ |
| 129 | Rüya Sapanca | 0531 929 68 99 | | ⬜ | ⬜ |
| 130 | Sapanca Villa Palas | 0531 896 31 54 | | ⬜ | ⬜ |
| 131 | Sapanca Zirve Resort | 0532 606 01 62 | | ⬜ | ⬜ |
| 132 | Real Love Villas | 0534 073 63 47 | | ⬜ | ⬜ |
| 133 | Villa Güneş Sapanca | 0536 375 74 17 | | ⬜ | ⬜ |
| 134 | Sapanca Doğa Evleri | 0532 502 68 61 | | ⬜ | ⬜ |
| 135 | Villa Freya Sapanca | 0532 730 44 54 | | ⬜ | ⬜ |
| 136 | Sapanca Villa Sakura | 0530 857 59 86 | | ⬜ | ⬜ |
| 137 | Cherry Hill Premium Villas | 0530 570 57 19 | | ⬜ | ⬜ |
| 138 | Sapanca Mavi Yeşil Köy Evi | 0538 550 27 04 | | ⬜ | ⬜ |
| 139 | Voda Sapanca | 0507 233 03 54 | | ⬜ | ⬜ |
| 140 | 4 Mevsim Dağ Evi Sapanca | 0536 795 94 80 | | ⬜ | ⬜ |
| 141 | Sapanca Ağaç Evler | 0530 411 44 54 | | ⬜ | ⬜ |
| 142 | Atlı Köşk Villa | 0541 802 25 15 | | ⬜ | ⬜ |
| 143 | Sapanca Kokina Suit | 0538 410 26 54 | | ⬜ | ⬜ |
| 144 | Seçkin Villa Bungalov | 0533 962 87 54 | | ⬜ | ⬜ |
| 145 | Sevimli Villa | 0532 385 80 03 | | ⬜ | ⬜ |
| 146 | Terra House Sapanca | 0530 320 41 11 | | ⬜ | ⬜ |
| 147 | The Bellus Sapanca | 0537 493 92 57 | | ⬜ | ⬜ |
| 148 | MCLife Villas | 0850 420 03 02 | | ⬜ | ⬜ |
| 149 | Sapanca Mavi Villa | 0533 257 20 27 | | ⬜ | ⬜ |
| 150 | Best Western Plus Sapanca | 0545 973 46 36 | | ⬜ | ⬜ |
| 151 | Sapanca Rips Suit Villas | 0530 818 46 54 | | ⬜ | ⬜ |
| 152 | Eight Sapanca | 0542 420 00 88 | | ⬜ | ⬜ |
| 153 | Hame Pira Bungalov | 0533 583 72 81 | | ⬜ | ⬜ |
| 154 | Sapanca Sazlıgöl Bungalov | | | ⬜ | ⬜ |

---

## Hedef Listesi - İznik (YENİ)

| # | İşletme | Telefon | Instagram | Demo | Durum |
|---|---------|---------|-----------|------|-------|
| 1 | Rock n' Lake İznik | +90 532 258 49 58 | @rocknlake | [link](https://sburkaybozyel.github.io/demo/rock-n-lake-iznik) | ✅ |
| 2 | Balcı House İznik | +90 5XX XXX XX XX | @balcihouse | [link](https://sburkaybozyel.github.io/demo/balci-house-iznik) | ✅ |
| 3 | Kuzeymen İznik | +90 542 297 47 48 | @kuzeymeniznik | [link](https://sburkaybozyel.github.io/demo/kuzeymen-iznik) | ✅ |
| 4 | La Cabaña İznik | +90 507 524 14 14 | | [link](https://sburkaybozyel.github.io/demo/la-cabana-iznik) | ✅ |
| 5 | İznik Seyir Kamp | +90 542 184 31 16 | | [link](https://sburkaybozyel.github.io/demo/iznik-seyir-kamp) | ✅ |

---

## Geri Dönüş Takibi

| Tarih | İşletme | Kanal | Mesaj | Aksiyon |
|-------|---------|-------|-------|---------|
| | | | | |

---

## Haftalık Hedef

| Hafta | Hedef | Gönderilen | Demo Hazır | Geri Dönüş | Satış |
|-------|-------|-----------|-----------|-----------|-------|
| 1 (2026-04-28) | 150 | 2 | 2 | 0 | 0 |
| 2 | 200 | | | | |
| 3 | 200 | | | | |
| 4 | 200 | | | | |

---

## Hedef Listesi - Mersin (YENİ)

| # | İşletme | Telefon | Kanal | Demo | Durum |
|---|---------|---------|-------|------|-------|
| 1 | SRC Ekinci Apart Otel | +90 5XX XXX XX XX | @srcekinciapart | [link](https://sburkaybozyel.github.io/demo/src-ekinci-apart-otel) | ✅ |
| 2 | Palmero Butik Hotel | +90 5XX XXX XX XX | @palmerobutikhotel | [link](https://sburkaybozyel.github.io/demo/palmero-butik-hotel) | ✅ |
| 3 | Grand Ezel Hotel | +90 5XX XXX XX XX | @grandezelhotel | [link](https://sburkaybozyel.github.io/demo/grand-ezel-hotel) | ✅ |
| 4 | Marin Butik Otel | +90 5XX XXX XX XX | @marinbutikmersin | [link](https://sburkaybozyel.github.io/demo/marin-butik-otel) | ✅ |
| 5 | Mavi Beyaz Butik Otel | +90 5XX XXX XX XX | @mavibeyazkizkalesi | [link](https://sburkaybozyel.github.io/demo/mavi-beyaz-butik-otel) | ✅ |
