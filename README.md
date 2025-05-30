# AgroMarket - O'zbekiston fermerlar va xaridorlar uchun onlayn bozor

<p style="text-align: center;">
  <img src="src/assets/logo.png" alt="AgroMarket logo" width="200"/>
</p>

AgroMarket - bu Qoraqalpogʻistondagi fermerlarini to'g'ridan-to'g'ri iste'molchilar bilan bog'laydigan innovatsion onlayn platforma. Ushbu loyiha mahalliy qishloq xo'jaligi mahsulotlarini sotib olish va sotish jarayonini soddalashtirish, oziq-ovqat tizimini barqarorlashtirish va qishloq jamiyatlarini qo'llab-quvvatlashga qaratilgan.

## Asosiy xususiyatlar

### Fermerlar uchun
- 🌱 Mahsulotlarni qo'shish va boshqarish
- 📊 Sotuvlar va daromadlar analitikasi
- 📦 Buyurtmalarni boshqarish
- 💰 To'lovlarni kuzatish
- 👤 Profil va ferma ma'lumotlarini sozlash

### Xaridorlar uchun
- 🛒 Mahalliy va organik mahsulotlarni qidirish va sotib olish
- 📍 Yaqin atrofdagi fermerlarni topish
- 🚚 Yetkazib berish yoki olib ketish variantlarini tanlash
- 💳 Xavfsiz to'lov usullari
- 📱 Buyurtmalarni kuzatish

## Texnologiyalar

AgroMarket quyidagi texnologiyalar asosida qurilgan:

- **Frontend**: React, TypeScript, TailwindCSS
- **State Management**: React Context API
- **Routing**: React Router
- **UI Components**: Heroicons, Custom Components
- **Responsive Design**: Mobile-first approach

## Qo'llanma

Loyihani o'z kompyuteringizda ishga tushirish uchun quyidagi ko'rsatmalarni bajaring.

### Talab qilinadigan dasturlar

- Node.js (v14.0.0 yoki undan yuqori)
- npm yoki yarn

### O'rnatish

1. Loyihani klonlang:
   ```bash
   git clone https://github.com/itisatashi/agromarket.git
   cd agromarket
   ```

2. Kerakli paketlarni o'rnating:
   ```bash
   npm install
   # yoki
   yarn install
   ```

3. Loyihani ishga tushiring:
   ```bash
   npm start
   # yoki
   yarn start
   ```

4. Brauzeringizda [http://localhost:3000](http://localhost:3000) sahifasini oching.

## Loyiha tuzilishi

```
/src
  /assets        # Rasmlar, ikonkalar va boshqa statik fayllar
  /components    # Qayta ishlatiladigan UI komponentlari
    /layout      # Asosiy layout komponentlari (Header, Footer, etc.)
    /ui          # Kichik UI komponentlari (Button, Card, etc.)
  /contexts      # React context providers
  /hooks         # Custom React hooks
  /pages         # Asosiy sahifalar
  /services      # API va boshqa xizmatlar
  /utils         # Yordamchi funksiyalar
```

## Qo'shimcha buyruqlar

### `npm test`

Test rejimida testlarni ishga tushiradi.

### `npm run build`

Loyihani production rejimida `build` papkasiga yig'adi.

### `npm run eject`

**Eslatma: bu bir tomonlama operatsiya. `eject` qilgandan so'ng, orqaga qayta olmaysiz!**

Agar konfiguratsiya va build vositalarini to'liq nazorat qilishni istasangiz, `eject` buyrug'ini ishlatishingiz mumkin.

## Litsenziya

Bu loyiha MIT litsenziyasi ostida tarqatilgan. Batafsil ma'lumot uchun `LICENSE` faylini ko'ring.

## Muallif

AgroMarket - Ideathon 2025 uchun ishlab chiqilgan loyiha.

---

<p  style="text-align: center;">
  <b>AgroMarket</b> - Mahalliy fermerlarni qo'llab-quvvatlash, sog'lom ovqatlanishni rag'batlantirish
</p>

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
