# SAVIOR Dashboard - Panduan Pengembangan

## Setup Development Environment

### Prerequisites

- Node.js 16+ dan npm/yarn
- Git
- VS Code (recommended) dengan extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - ES7+ React/Redux/React-Native snippets

### Initial Setup

1. Clone dan install dependencies:

```bash
git clone https://github.com/AmeliaOchaM/SAVIOR_Dashboard.git
cd savior
npm install
```

2. Setup environment variables:

```bash
cp .env.example .env
```

3. Start development server:

```bash
npm run dev
```

## Project Architecture

### Component Structure

Semua komponen diorganisir secara modular:

```
src/
├── components/          # Reusable UI components
│   ├── BloodPressureMonitor.jsx
│   ├── StressMonitor.jsx
│   ├── HealthChart.jsx
│   ├── AlertSystem.jsx
│   └── DeviceStatus.jsx
├── config/              # Configuration files
│   ├── bloodPressureConfig.js
│   └── stressConfig.js
├── services/            # API and business logic
│   ├── apiService.js
│   └── mockDataService.js
└── pages/               # Page components
    └── Dashboard.jsx
```

### Component Guidelines

#### 1. Component Template

```javascript
/**
 * Component Name - Brief description
 *
 * Detailed explanation of component purpose
 *
 * Props:
 * - propName: type - description
 */

import React from 'react';

const ComponentName = ({
  propName = defaultValue,
  // ... more props
}) => {
  // Component logic

  return <div>{/* JSX */}</div>;
};

export default ComponentName;
```

#### 2. Props Documentation

Selalu dokumentasikan props dengan JSDoc:

```javascript
/**
 * @param {number} systolic - Tekanan sistol (mmHg)
 * @param {number} diastolic - Tekanan diastol (mmHg)
 * @param {Date} timestamp - Waktu pengukuran
 */
```

#### 3. State Management

Untuk state sederhana, gunakan `useState`:

```javascript
const [data, setData] = useState(initialValue);
```

Untuk state kompleks atau global, pertimbangkan Context API atau state management library.

#### 4. Styling

Gunakan Tailwind CSS utility classes:

```jsx
<div className="bg-white rounded-xl shadow-lg p-6">{/* Content */}</div>
```

Untuk styling dinamis:

```jsx
<div className={`badge ${category.bgColor} ${category.textColor}`}>{category.label}</div>
```

## Menambah Fitur Baru

### Langkah-langkah:

1. **Buat komponen baru** di `src/components/`

```bash
touch src/components/NewFeature.jsx
```

2. **Implement komponen** dengan struktur yang konsisten

3. **Export dan import** di Dashboard:

```javascript
import NewFeature from '../components/NewFeature';
```

4. **Tambahkan ke Dashboard**:

```jsx
<NewFeature prop1={value1} prop2={value2} />
```

5. **Test** fungsionalitas

### Contoh: Menambah Heart Rate Monitor

```javascript
// src/components/HeartRateMonitor.jsx
import React from 'react';
import { Heart } from 'lucide-react';

const HeartRateMonitor = ({ heartRate, timestamp }) => {
  const getHeartRateCategory = (hr) => {
    if (hr < 60) return { label: 'Rendah', color: 'blue' };
    if (hr > 100) return { label: 'Tinggi', color: 'red' };
    return { label: 'Normal', color: 'green' };
  };

  const category = getHeartRateCategory(heartRate);

  return (
    <div className="card">
      <div className="flex items-center gap-3">
        <Heart className={`w-8 h-8 text-${category.color}-500`} />
        <div>
          <p className="text-4xl font-bold">{heartRate}</p>
          <p className="text-sm text-gray-500">bpm</p>
        </div>
      </div>
      <p className={`mt-2 text-${category.color}-600`}>{category.label}</p>
    </div>
  );
};

export default HeartRateMonitor;
```

## Integrasi dengan Backend

### Setup API Client

Edit `src/services/apiService.js`:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL;

export const fetchHealthData = async () => {
  const response = await fetch(`${API_BASE_URL}/health/current`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch health data');
  }

  return await response.json();
};
```

### Menggunakan Real Data

Update Dashboard component:

```javascript
import { fetchHealthData } from '../services/apiService';

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const healthData = await fetchHealthData();
        setData(healthData);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  // ... rest of component
};
```

### WebSocket Integration

```javascript
import { HealthDataStream } from '../services/apiService';

const Dashboard = () => {
  useEffect(() => {
    const stream = new HealthDataStream();
    stream.connect();

    stream.on('bloodPressure', (data) => {
      setBloodPressureData(data);
    });

    stream.on('stress', (data) => {
      setStressData(data);
    });

    return () => {
      stream.disconnect();
    };
  }, []);
};
```

## Testing

### Manual Testing

1. Test semua komponen dengan berbagai data input
2. Test responsive design di berbagai screen size
3. Test interaksi user (klik, hover, dll)
4. Test error handling

### Test Checklist

- [ ] Blood Pressure Monitor menampilkan semua kategori dengan benar
- [ ] Stress Monitor menampilkan level dengan akurat
- [ ] Charts menampilkan data historis
- [ ] Alerts muncul saat kondisi abnormal
- [ ] Device status update dengan benar
- [ ] Responsive di mobile, tablet, desktop
- [ ] Refresh data berfungsi
- [ ] Time range selector berfungsi

## Debugging

### React DevTools

Install React DevTools extension untuk Chrome/Firefox.

### Console Logging

Tambahkan logging untuk debugging:

```javascript
console.log('Current BP data:', bloodPressureData);
console.log('Alerts:', alerts);
```

### Error Boundaries

Implement error boundary untuk handle errors:

```javascript
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
  }

  render() {
    return this.props.children;
  }
}
```

## Performance Optimization

### Memoization

Gunakan `React.memo` untuk prevent unnecessary re-renders:

```javascript
export default React.memo(BloodPressureMonitor);
```

### useMemo & useCallback

```javascript
const expensiveCalculation = useMemo(() => {
  return calculateSomething(data);
}, [data]);

const handleClick = useCallback(() => {
  // Handler logic
}, [dependencies]);
```

### Code Splitting

```javascript
const HealthChart = React.lazy(() => import('./components/HealthChart'));

<Suspense fallback={<Loading />}>
  <HealthChart />
</Suspense>;
```

## Git Workflow

### Branch Naming

- `feature/nama-fitur` - Fitur baru
- `fix/nama-bug` - Bug fix
- `docs/update-docs` - Dokumentasi
- `refactor/component-name` - Refactoring

### Commit Messages

Format: `type(scope): message`

```bash
git commit -m "feat(bp-monitor): add trend indicator"
git commit -m "fix(alerts): resolve duplicate alerts issue"
git commit -m "docs(readme): update installation guide"
```

### Pull Request

1. Update branch dengan main:

```bash
git checkout main
git pull origin main
git checkout feature/your-feature
git rebase main
```

2. Push dan create PR:

```bash
git push origin feature/your-feature
```

3. PR description harus include:
   - Deskripsi perubahan
   - Screenshot (jika UI changes)
   - Testing yang sudah dilakukan

## Code Style

### ESLint & Prettier

Format code otomatis:

```bash
npm run lint
```

### Naming Conventions

- **Components**: PascalCase (`BloodPressureMonitor`)
- **Files**: PascalCase untuk components (`BloodPressureMonitor.jsx`)
- **Functions**: camelCase (`getBloodPressureCategory`)
- **Constants**: UPPER_SNAKE_CASE (`BP_CATEGORIES`)
- **CSS classes**: kebab-case (`blood-pressure-card`)

## Common Issues & Solutions

### Issue: Tailwind styles tidak muncul

**Solution:**

```bash
# Restart dev server
npm run dev
```

### Issue: WebSocket tidak connect

**Solution:**

- Check VITE_WS_URL di .env
- Pastikan backend WebSocket server running
- Check browser console untuk error

### Issue: Chart tidak render

**Solution:**

- Pastikan data format sesuai dengan yang diharapkan Recharts
- Check apakah data array tidak kosong
- Verify ResponsiveContainer parent has height

## Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Recharts Guide](https://recharts.org/en-US/guide)
- [Lucide Icons](https://lucide.dev)
- [Vite Guide](https://vitejs.dev/guide)

## Support

Jika ada pertanyaan atau issue:

1. Check dokumentasi ini dan README.md
2. Search di GitHub Issues
3. Buat issue baru jika belum ada
4. Contact: [GitHub](https://github.com/AmeliaOchaM)
