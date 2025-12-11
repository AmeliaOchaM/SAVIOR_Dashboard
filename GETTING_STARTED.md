# 🎯 SAVIOR Dashboard - Instruksi Penggunaan

## 📋 Langkah-Langkah Mulai Menggunakan Dashboard

### STEP 1: Install Dependencies ⚡

Buka terminal dan jalankan:

```bash
cd /home/amelia-ocha/Documents/sic/savior
npm install
```

Tunggu hingga semua dependencies terinstall (sekitar 2-3 menit).

### STEP 2: Jalankan Development Server 🚀

```bash
npm run dev
```

✅ **Dashboard akan berjalan di:** http://localhost:3000

Buka browser dan akses URL tersebut untuk melihat dashboard.

### STEP 3: Explore Dashboard 🔍

Dashboard yang akan Anda lihat memiliki:

1. **Header** - Judul dan tombol refresh
2. **Device Status** - Status koneksi smartwatch (mock)
3. **Alerts** - Peringatan kesehatan (muncul jika ada kondisi abnormal)
4. **Blood Pressure Monitor** - Monitoring tekanan darah dengan kategori
5. **Stress Monitor** - Monitoring tingkat stress
6. **Charts** - 2 grafik untuk visualisasi data historis

### STEP 4: Pahami Struktur Project 📂

```
savior/
├── src/
│   ├── components/         👈 5 komponen modular
│   ├── config/            👈 Konfigurasi kategori
│   ├── services/          👈 API & Mock data
│   ├── pages/             👈 Dashboard utama
│   └── main.jsx           👈 Entry point
├── docs/                   👈 Dokumentasi lengkap
└── README.md              👈 Mulai dari sini
```

### STEP 5: Customize Dashboard (Opsional) 🎨

#### Ubah Warna Theme

Edit `tailwind.config.js`:

```javascript
colors: {
  primary: {
    500: '#3b82f6',  // Warna utama
    // ... dll
  }
}
```

#### Ubah Kategori Tekanan Darah

Edit `src/config/bloodPressureConfig.js`

#### Ubah Kategori Stress

Edit `src/config/stressConfig.js`

### STEP 6: Integrasi dengan Backend (Ketika Siap) 🔌

1. **Buat file `.env`** di root folder:

```bash
cp .env.example .env
```

2. **Edit `.env`** dengan URL backend Anda:

```env
VITE_API_URL=http://localhost:8000/api
VITE_WS_URL=ws://localhost:8000/ws
VITE_USE_MOCK_DATA=false
```

3. **Backend harus menyediakan endpoints** sesuai `docs/API.md`

### STEP 7: Build untuk Production 📦

Ketika siap deploy:

```bash
npm run build
```

Hasil build ada di folder `dist/`.

### STEP 8: Deploy 🌐

Pilih salah satu platform:

- **Vercel** (Recommended): Baca `docs/DEPLOYMENT.md`
- **Netlify**: Baca `docs/DEPLOYMENT.md`
- **GitHub Pages**: Baca `docs/DEPLOYMENT.md`
- **VPS/Server**: Baca `docs/DEPLOYMENT.md`

---

## 📚 Dokumentasi Lengkap

| File                     | Untuk Apa                     |
| ------------------------ | ----------------------------- |
| **README.md**            | Overview lengkap project      |
| **QUICKSTART.md**        | Quick start (anda di sini)    |
| **PROJECT_SUMMARY.md**   | Summary semua yang dibuat     |
| **docs/API.md**          | Dokumentasi API untuk backend |
| **docs/DEVELOPMENT.md**  | Panduan development detail    |
| **docs/DEPLOYMENT.md**   | Panduan deploy production     |
| **docs/ARCHITECTURE.md** | Arsitektur sistem             |

---

## 🎓 Tutorial Cepat

### Cara Menambah Komponen Baru

1. Buat file `src/components/NamaKomponen.jsx`
2. Tulis komponen React:

```javascript
import React from 'react';

const NamaKomponen = ({ prop1, prop2 }) => {
  return <div className="card">{/* JSX content */}</div>;
};

export default NamaKomponen;
```

3. Import di `src/pages/Dashboard.jsx`:

```javascript
import NamaKomponen from '../components/NamaKomponen';
```

4. Gunakan di Dashboard:

```javascript
<NamaKomponen prop1={value1} prop2={value2} />
```

### Cara Mengubah Mock Data

Edit `src/services/mockDataService.js`:

```javascript
export const generateBPData = () => {
  return {
    systolic: 120, // Ubah nilai
    diastolic: 80, // Ubah nilai
    heartRate: 72, // Ubah nilai
    timestamp: new Date(),
  };
};
```

---

## 🎯 Checklist Untuk Project Anda

- [ ] ✅ Install dependencies (`npm install`)
- [ ] ✅ Jalankan dev server (`npm run dev`)
- [ ] ✅ Buka http://localhost:3000
- [ ] ✅ Explore semua fitur dashboard
- [ ] ✅ Baca README.md untuk overview
- [ ] ✅ Customize warna/theme sesuai brand
- [ ] ✅ Setup backend API (jika sudah ada)
- [ ] ✅ Test integrasi dengan real data
- [ ] ✅ Build untuk production
- [ ] ✅ Deploy ke hosting

---

## 🔥 Tips Penting

### 1. Development Tips

- Gunakan **React DevTools** extension di browser
- Install **VS Code extensions** yang direkomendasikan (lihat `.vscode/extensions.json`)
- Check **browser console** untuk debugging
- Gunakan **mock data** dulu untuk development cepat

### 2. Debugging Tips

- Jika ada error, check browser console
- Jika styles tidak muncul, restart dev server
- Jika dependencies error, hapus `node_modules` dan install ulang

### 3. Performance Tips

- Build menggunakan `npm run build` untuk production
- Optimalkan images
- Enable lazy loading untuk komponen besar
- Monitor bundle size

---

## 🐛 Troubleshooting

### Port 3000 sudah digunakan?

Edit `vite.config.js`:

```javascript
server: {
  port: 3001; // Ganti port
}
```

### Tailwind styles tidak muncul?

```bash
npm run dev  # Restart server
```

### Dependencies error saat install?

```bash
rm -rf node_modules package-lock.json
npm install
```

### Build error?

```bash
npm run build -- --debug
```

---

## 📞 Butuh Bantuan?

1. **Baca dokumentasi** di folder `docs/`
2. **Check README.md** untuk informasi umum
3. **Lihat contoh** di komponen-komponen existing
4. **GitHub Issues** untuk report bugs

---

## 🎉 Selamat!

Dashboard SAVIOR siap digunakan!

**Next Steps:**

1. Explore dan pahami semua komponen
2. Customize sesuai kebutuhan
3. Integrasikan dengan backend Anda
4. Deploy ke production

**Happy Coding! 💙**

---

## 📊 Quick Reference

### Commands

```bash
npm install          # Install dependencies
npm run dev         # Start dev server
npm run build       # Build for production
npm run preview     # Preview production build
```

### Ports

- **Dev Server**: http://localhost:3000
- **API**: http://localhost:8000 (sesuaikan di .env)
- **WebSocket**: ws://localhost:8000 (sesuaikan di .env)

### Key Files

- `src/pages/Dashboard.jsx` - Main dashboard
- `src/components/` - All UI components
- `src/config/` - Configurations
- `tailwind.config.js` - Theme colors
- `.env` - Environment variables

---

**Made with ❤️ for SAVIOR Project**
