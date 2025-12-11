# SAVIOR Dashboard

**S**martwatch **A**I-Driven **V**ital-sign **I**ntelligent **O**bservation and **R**ecognition

Dashboard monitoring kesehatan real-time untuk smartwatch SAVIOR yang mendeteksi tekanan darah dan tingkat stress menggunakan AI dan IoT.

![SAVIOR Dashboard](https://img.shields.io/badge/React-18.2.0-blue)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.3.6-38B2AC)
![License](https://img.shields.io/badge/license-MIT-green)

## 📋 Daftar Isi

- [Fitur Utama](#-fitur-utama)
- [Teknologi](#-teknologi)
- [Instalasi](#-instalasi)
- [Penggunaan](#-penggunaan)
- [Struktur Project](#-struktur-project)
- [Komponen](#-komponen)
- [Konfigurasi](#-konfigurasi)
- [Integrasi API](#-integrasi-api)
- [Deployment](#-deployment)
- [Kontribusi](#-kontribusi)

## ✨ Fitur Utama

### 1. **Monitoring Tekanan Darah**

- Menampilkan data sistol dan diastol real-time
- 5 kategori tekanan darah:
  - 🔵 **Hipotensi** (< 90/60 mmHg)
  - ✅ **Normal** (90-119/60-79 mmHg)
  - ⚠️ **Pre-Hipertensi** (120-139/80-89 mmHg)
  - 🟠 **Hipertensi Stage 1** (140-159/90-99 mmHg)
  - 🔴 **Hipertensi Stage 2** (≥ 160/100 mmHg)
- Detak jantung (Heart Rate)
- Rekomendasi kesehatan berdasarkan kategori

### 2. **Monitoring Tingkat Stress**

- Deteksi tingkat stress menggunakan AI
- 3 kategori stress:
  - 😰 **Stress** (70-100%)
  - 😌 **Baseline/Normal** (30-70%)
  - 😊 **Amusement/Rileks** (0-30%)
- Heart Rate Variability (HRV)
- Progress bar visual untuk stress level

### 3. **Visualisasi Data Historis**

- Grafik trend tekanan darah
- Grafik trend tingkat stress
- Filter waktu: 24 jam, 7 hari, 30 hari
- Interactive tooltips

### 4. **Sistem Peringatan**

- Alert otomatis untuk kondisi abnormal
- 4 level peringatan: Critical, Warning, Info, Success
- Rekomendasi tindakan untuk setiap alert

### 5. **Status Perangkat**

- Status koneksi smartwatch
- Level baterai
- Waktu sinkronisasi terakhir
- Tombol manual sync

## 🛠 Teknologi

Dashboard ini dibangun menggunakan:

- **React 18.2** - UI Framework
- **Vite** - Build tool & dev server
- **Tailwind CSS 3.3** - Styling
- **Recharts 2.10** - Data visualization
- **Lucide React** - Icon library
- **date-fns** - Date manipulation

## 📦 Instalasi

### Prerequisites

- Node.js 16+ dan npm/yarn
- Git

### Langkah Instalasi

1. **Clone repository**

```bash
git clone https://github.com/AmeliaOchaM/SAVIOR_Dashboard.git
cd savior
```

2. **Install dependencies**

```bash
npm install
# atau
yarn install
```

3. **Setup environment variables**

```bash
cp .env.example .env
```

Edit file `.env` sesuai konfigurasi Anda:

```env
VITE_API_URL=http://localhost:8000/api
VITE_WS_URL=ws://localhost:8000/ws
VITE_USE_MOCK_DATA=true
```

4. **Jalankan development server**

```bash
npm run dev
# atau
yarn dev
```

Dashboard akan berjalan di `http://localhost:3000`

## 🚀 Penggunaan

### Development Mode

```bash
npm run dev
```

Akan menjalankan server development dengan hot-reload di port 3000.

### Build untuk Production

```bash
npm run build
```

Build optimized untuk production di folder `dist/`.

### Preview Production Build

```bash
npm run preview
```

Preview hasil build production sebelum deploy.

## 📁 Struktur Project

```
savior/
├── public/                      # Static assets
├── src/
│   ├── components/              # Komponen React modular
│   │   ├── BloodPressureMonitor.jsx
│   │   ├── StressMonitor.jsx
│   │   ├── HealthChart.jsx
│   │   ├── AlertSystem.jsx
│   │   └── DeviceStatus.jsx
│   ├── config/                  # Konfigurasi aplikasi
│   │   ├── bloodPressureConfig.js
│   │   └── stressConfig.js
│   ├── services/                # API dan data services
│   │   ├── apiService.js
│   │   └── mockDataService.js
│   ├── pages/                   # Page components
│   │   └── Dashboard.jsx
│   ├── index.css                # Global styles
│   └── main.jsx                 # Entry point
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🧩 Komponen

### BloodPressureMonitor

Komponen untuk monitoring tekanan darah.

**Props:**

```javascript
<BloodPressureMonitor
  systolic={120} // number - Tekanan sistol (mmHg)
  diastolic={80} // number - Tekanan diastol (mmHg)
  heartRate={72} // number - Detak jantung (bpm)
  timestamp={new Date()} // Date - Waktu pengukuran
  showTrend={true} // boolean - Tampilkan trend
/>
```

**Features:**

- Auto-categorization berdasarkan nilai BP
- Color-coded categories
- Referensi kategori lengkap
- Rekomendasi kesehatan

### StressMonitor

Komponen untuk monitoring tingkat stress.

**Props:**

```javascript
<StressMonitor
  stressLevel="baseline" // string - 'stress' | 'baseline' | 'amusement'
  stressValue={50} // number - Nilai stress (0-100)
  hrv={45} // number - Heart Rate Variability (ms)
  timestamp={new Date()} // Date - Waktu pengukuran
  showDetails={true} // boolean - Tampilkan detail
/>
```

**Features:**

- Progress bar visual
- HRV indicator
- Panduan tingkat stress
- Rekomendasi berdasarkan level

### HealthChart

Komponen grafik untuk visualisasi data historis.

**Props:**

```javascript
<HealthChart
  data={historicalData} // Array - Data historis
  type="bp" // string - 'bp' | 'stress'
  timeRange="24h" // string - '24h' | '7d' | '30d'
  onTimeRangeChange={handler} // Function - Callback perubahan range
/>
```

**Features:**

- Line chart untuk BP (sistol & diastol)
- Area chart untuk stress level
- Interactive tooltips
- Time range selector

### AlertSystem

Komponen sistem peringatan kesehatan.

**Props:**

```javascript
<AlertSystem
  alerts={alertsArray} // Array - Daftar alert
  onDismiss={handler} // Function - Callback dismiss alert
  maxDisplay={5} // number - Max alert ditampilkan
/>
```

**Alert Object:**

```javascript
{
  id: 1,
  type: 'critical',        // 'critical' | 'warning' | 'info' | 'success'
  title: 'Tekanan Darah Tinggi',
  message: 'Detail peringatan...',
  timestamp: new Date()
}
```

### DeviceStatus

Komponen status koneksi smartwatch.

**Props:**

```javascript
<DeviceStatus
  isConnected={true} // boolean - Status koneksi
  batteryLevel={85} // number - Level baterai (0-100)
  lastSync={new Date()} // Date - Waktu sync terakhir
  deviceName="SAVIOR Watch" // string - Nama device
  onSync={handler} // Function - Callback manual sync
/>
```

## ⚙️ Konfigurasi

### Blood Pressure Categories

Edit `src/config/bloodPressureConfig.js` untuk mengubah kategori tekanan darah:

```javascript
export const BP_CATEGORIES = {
  HYPOTENSION: {
    range: {
      systolic: { min: 0, max: 90 },
      diastolic: { min: 0, max: 60 },
    },
    color: '#3b82f6',
    // ... konfigurasi lainnya
  },
  // ... kategori lainnya
};
```

### Stress Level Categories

Edit `src/config/stressConfig.js` untuk mengubah kategori stress:

```javascript
export const STRESS_CATEGORIES = {
  STRESS: {
    color: '#ef4444',
    recommendation: 'Saran untuk pengguna...',
    // ... konfigurasi lainnya
  },
  // ... kategori lainnya
};
```

### Tailwind Themes

Edit `tailwind.config.js` untuk customize warna dan theme:

```javascript
theme: {
  extend: {
    colors: {
      primary: { /* ... */ },
      bp: { /* Blood Pressure colors */ },
      stress: { /* Stress colors */ }
    }
  }
}
```

## 🔌 Integrasi API

### REST API Endpoints

Dashboard mendukung integrasi dengan backend API:

```javascript
// Get current health data
GET /api/health/current
Response: {
  bloodPressure: {
    systolic: 120,
    diastolic: 80,
    heartRate: 72,
    timestamp: "2025-12-11T10:30:00Z"
  },
  stress: {
    level: "baseline",
    value: 45,
    hrv: 50,
    timestamp: "2025-12-11T10:30:00Z"
  }
}

// Get historical data
GET /api/health/history?type=bp&range=24h
Response: {
  data: [
    {
      timestamp: "2025-12-11T09:00:00Z",
      systolic: 118,
      diastolic: 78,
      heartRate: 70
    },
    // ... more data points
  ]
}

// Get device status
GET /api/device/status
Response: {
  isConnected: true,
  batteryLevel: 85,
  lastSync: "2025-12-11T10:25:00Z",
  deviceName: "SAVIOR Watch"
}

// Sync device
POST /api/device/sync
Response: {
  success: true,
  message: "Device synced successfully"
}
```

### WebSocket Real-time Updates

Untuk update real-time, gunakan WebSocket connection:

```javascript
import { HealthDataStream } from './services/apiService';

const stream = new HealthDataStream();
stream.connect();

// Listen for blood pressure updates
stream.on('bloodPressure', (data) => {
  console.log('New BP data:', data);
});

// Listen for stress updates
stream.on('stress', (data) => {
  console.log('New stress data:', data);
});

// Cleanup
stream.disconnect();
```

### Mock Data (Development)

Saat `VITE_USE_MOCK_DATA=true`, dashboard menggunakan mock data dari `src/services/mockDataService.js`.

Edit file tersebut untuk customize mock data:

```javascript
export const generateBPData = () => {
  // Customize logic untuk generate BP data
};

export const generateStressData = () => {
  // Customize logic untuk generate stress data
};
```

## 🌐 Deployment

### Deploy ke Vercel

1. Push code ke GitHub
2. Import project di [Vercel](https://vercel.com)
3. Set environment variables
4. Deploy!

```bash
# Atau menggunakan Vercel CLI
npm i -g vercel
vercel
```

### Deploy ke Netlify

1. Build project

```bash
npm run build
```

2. Deploy folder `dist/`

```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

### Deploy ke VPS/Server

1. Build project

```bash
npm run build
```

2. Upload folder `dist/` ke server
3. Serve menggunakan nginx/apache atau static server

```bash
# Menggunakan serve
npm i -g serve
serve -s dist -p 3000
```

## 🤝 Kontribusi

Kontribusi sangat diterima! Silakan:

1. Fork repository
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 👥 Tim Pengembang

- **Amelia Ocha** - _Developer_ - [AmeliaOchaM](https://github.com/AmeliaOchaM)

## 📞 Kontak

Project Link: [https://github.com/AmeliaOchaM/SAVIOR_Dashboard](https://github.com/AmeliaOchaM/SAVIOR_Dashboard)

---

**SAVIOR** - Making Health Monitoring Smarter and Accessible 💙
