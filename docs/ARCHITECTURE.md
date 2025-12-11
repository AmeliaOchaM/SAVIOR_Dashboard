# SAVIOR Dashboard - Architecture Overview

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    SAVIOR Dashboard                          │
│                   (React + Tailwind CSS)                     │
└─────────────────────────────────────────────────────────────┘
                              │
                              │
          ┌───────────────────┼───────────────────┐
          │                   │                   │
          ▼                   ▼                   ▼
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│  Blood Pressure  │ │  Stress Monitor  │ │   Health Chart   │
│     Monitor      │ │                  │ │                  │
│                  │ │                  │ │                  │
│ • 5 Categories   │ │ • 3 Categories   │ │ • Line Chart     │
│ • Sistol/Diastol │ │ • Stress Level   │ │ • Area Chart     │
│ • Heart Rate     │ │ • HRV            │ │ • Time Filters   │
└──────────────────┘ └──────────────────┘ └──────────────────┘
          │                   │                   │
          └───────────────────┼───────────────────┘
                              │
                              ▼
                  ┌───────────────────────┐
                  │   Alert System        │
                  │                       │
                  │ • Auto Detection      │
                  │ • 4 Severity Levels   │
                  │ • Notifications       │
                  └───────────────────────┘
                              │
          ┌───────────────────┼───────────────────┐
          │                   │                   │
          ▼                   ▼                   ▼
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│  Device Status   │ │   API Service    │ │  Mock Data Svc   │
│                  │ │                  │ │                  │
│ • Connection     │ │ • REST API       │ │ • Development    │
│ • Battery        │ │ • WebSocket      │ │ • Testing        │
│ • Sync Status    │ │ • Real-time      │ │ • Demo Mode      │
└──────────────────┘ └──────────────────┘ └──────────────────┘
                              │
                              │
                    ┌─────────┴─────────┐
                    │                   │
                    ▼                   ▼
          ┌──────────────────┐ ┌──────────────────┐
          │   Backend API    │ │  IoT Smartwatch  │
          │                  │ │                  │
          │ • Data Storage   │ │ • Sensors        │
          │ • AI Processing  │ │ • Data Capture   │
          │ • User Auth      │ │ • BLE/WiFi       │
          └──────────────────┘ └──────────────────┘
```

## 📊 Component Hierarchy

```
Dashboard (Main)
│
├── DeviceStatus
│   ├── Connection Status
│   ├── Battery Indicator
│   └── Sync Button
│
├── AlertSystem
│   └── Alert Cards (Critical/Warning/Info/Success)
│
├── BloodPressureMonitor
│   ├── Current Reading (Systolic/Diastolic)
│   ├── Heart Rate Display
│   ├── Category Badge
│   ├── Category Reference
│   └── Recommendations
│
├── StressMonitor
│   ├── Stress Level Progress Bar
│   ├── Category Badge
│   ├── HRV Display
│   ├── Level Guide
│   └── Recommendations
│
├── HealthChart (Blood Pressure)
│   ├── Time Range Selector
│   ├── Line Chart (Systolic/Diastolic)
│   └── Interactive Tooltip
│
└── HealthChart (Stress Level)
    ├── Time Range Selector
    ├── Area Chart
    └── Interactive Tooltip
```

## 🔄 Data Flow

```
┌─────────────┐
│ Smartwatch  │ (Sensors: PPG, GSR, etc.)
└──────┬──────┘
       │ BLE/WiFi
       ▼
┌─────────────┐
│ IoT Gateway │
└──────┬──────┘
       │ MQTT/HTTP
       ▼
┌─────────────┐
│  AI Model   │ (Blood Pressure & Stress Detection)
└──────┬──────┘
       │ Processed Data
       ▼
┌─────────────┐
│ Backend API │ (Store & Serve)
└──────┬──────┘
       │ REST API / WebSocket
       ▼
┌─────────────┐
│  Dashboard  │ (Visualization)
└─────────────┘
       │
       ▼
┌─────────────┐
│    User     │ (Health Monitoring)
└─────────────┘
```

## 🎨 Blood Pressure Categories

```
  Systolic (mmHg)

  200 ├─────────────────────────────────────────────
      │
  180 ├─────────────────────────────────────────────
      │         🔴 HIPERTENSI STAGE 2
  160 ├─────────────────────────────────────────────
      │         🟠 HIPERTENSI STAGE 1
  140 ├─────────────────────────────────────────────
      │         ⚠️  PRE-HIPERTENSI
  120 ├─────────────────────────────────────────────
      │         ✅ NORMAL
   90 ├─────────────────────────────────────────────
      │         🔵 HIPOTENSI
    0 ├─────────────────────────────────────────────
      0    60   80   90   100  120  140  160  180
                  Diastolic (mmHg)
```

## 🧠 Stress Level Categories

```
  Stress Level (%)

  100 ├─────────────────────────────────────────────
      │
      │         😰 STRESS
   70 ├─────────────────────────────────────────────
      │
      │         😌 BASELINE
   30 ├─────────────────────────────────────────────
      │
      │         😊 AMUSEMENT
    0 ├─────────────────────────────────────────────
```

## 🔌 API Integration Points

```
Dashboard ──┐
            │
            ├─► GET  /health/current
            │   ↳ Latest BP & Stress data
            │
            ├─► GET  /health/history
            │   ↳ Historical data for charts
            │
            ├─► GET  /device/status
            │   ↳ Device connection & battery
            │
            ├─► POST /device/sync
            │   ↳ Trigger manual sync
            │
            └─► WS   /ws
                ↳ Real-time updates
```

## 📦 File Organization

```
src/
│
├── components/              # UI Components (Modular)
│   ├── BloodPressureMonitor.jsx
│   ├── StressMonitor.jsx
│   ├── HealthChart.jsx
│   ├── AlertSystem.jsx
│   └── DeviceStatus.jsx
│
├── config/                  # Configuration Files
│   ├── bloodPressureConfig.js
│   └── stressConfig.js
│
├── services/                # Business Logic & API
│   ├── apiService.js        # Real API integration
│   └── mockDataService.js   # Mock data for dev
│
├── pages/                   # Page Components
│   └── Dashboard.jsx        # Main page
│
├── index.css               # Global styles
└── main.jsx                # App entry point
```

## 🎯 Component Props Flow

### BloodPressureMonitor

```javascript
Props:
  systolic    : number  → from API or Mock
  diastolic   : number  → from API or Mock
  heartRate   : number  → from API or Mock
  timestamp   : Date    → from API or Mock
  showTrend   : boolean → from Dashboard state

Internal:
  category    : computed from systolic/diastolic
  color       : from category config
  icon        : from category config
```

### StressMonitor

```javascript
Props:
  stressLevel : string  → from AI ('stress'|'baseline'|'amusement')
  stressValue : number  → from AI (0-100)
  hrv         : number  → from Sensors
  timestamp   : Date    → from API or Mock
  showDetails : boolean → from Dashboard state

Internal:
  category    : computed from stressLevel or Value
  color       : from category config
  percentage  : computed for progress bar
```

### HealthChart

```javascript
Props:
  data        : Array   → Historical data from API
  type        : string  → 'bp' or 'stress'
  timeRange   : string  → '24h'|'7d'|'30d'
  onTimeRangeChange : Function → Callback to Dashboard

Internal:
  chartType   : LineChart for BP, AreaChart for Stress
  xAxis       : formatted timestamps
  yAxis       : mmHg for BP, % for Stress
```

## 🔐 Security Considerations

```
┌─────────────────────────────────────────┐
│         Security Layers                 │
├─────────────────────────────────────────┤
│                                         │
│  1. HTTPS/WSS Encryption               │
│     ↓                                   │
│  2. API Authentication                  │
│     (Bearer Token)                      │
│     ↓                                   │
│  3. CORS Configuration                  │
│     (Allowed origins)                   │
│     ↓                                   │
│  4. Input Validation                    │
│     (Client & Server)                   │
│     ↓                                   │
│  5. Rate Limiting                       │
│     (API throttling)                    │
│     ↓                                   │
│  6. Data Privacy                        │
│     (HIPAA compliant)                   │
│                                         │
└─────────────────────────────────────────┘
```

## 🚀 Deployment Pipeline

```
Developer
    │
    ▼
  Git Push ───► GitHub Repository
    │
    ▼
  GitHub Actions (CI/CD)
    │
    ├─► npm install
    ├─► npm run build
    ├─► Run tests
    └─► Check linting
    │
    ▼
  Build Success?
    │
    ├─► Yes ──► Deploy to Production
    │            │
    │            ├─► Vercel / Netlify
    │            └─► Monitoring (Sentry)
    │
    └─► No ───► Notify Developer
```

## 📈 Performance Metrics

```
Target Performance:
┌──────────────────────────────────┐
│ Metric          │ Target         │
├─────────────────┼────────────────┤
│ First Paint     │ < 1.0s         │
│ Interactive     │ < 2.0s         │
│ Chart Render    │ < 500ms        │
│ API Response    │ < 200ms        │
│ Bundle Size     │ < 500KB        │
│ Lighthouse      │ > 90/100       │
└──────────────────────────────────┘
```

---

**Architecture designed for scalability, modularity, and performance! 🚀**
