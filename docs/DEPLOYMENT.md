# SAVIOR Dashboard - Deployment Guide

## 🌐 Deployment Options

Dashboard SAVIOR dapat di-deploy ke berbagai platform hosting. Berikut panduan untuk beberapa platform populer.

## 1. Vercel (Recommended)

### Via Vercel Dashboard

1. Push code ke GitHub
2. Buka [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import repository SAVIOR_Dashboard
5. Configure:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Add Environment Variables:
   ```
   VITE_API_URL=https://your-api-url.com/api
   VITE_WS_URL=wss://your-api-url.com/ws
   VITE_USE_MOCK_DATA=false
   ```
7. Click "Deploy"

### Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

**Konfigurasi** (`vercel.json`):

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "env": {
    "VITE_API_URL": "@vite_api_url",
    "VITE_WS_URL": "@vite_ws_url"
  }
}
```

## 2. Netlify

### Via Netlify Dashboard

1. Push code ke GitHub
2. Buka [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Choose repository
5. Configure:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Add Environment Variables
7. Click "Deploy site"

### Via Netlify CLI

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Initialize
netlify init

# Deploy
netlify deploy --prod
```

**Konfigurasi** (`netlify.toml`):

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  VITE_API_URL = "https://your-api-url.com/api"
  VITE_WS_URL = "wss://your-api-url.com/ws"
```

## 3. GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}

# Deploy
npm run deploy
```

**Update `vite.config.js`**:

```javascript
export default defineConfig({
  base: '/SAVIOR_Dashboard/', // Nama repository
  plugins: [react()],
});
```

## 4. Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize
firebase init hosting

# Build
npm run build

# Deploy
firebase deploy --only hosting
```

**Konfigurasi** (`firebase.json`):

```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

## 5. AWS S3 + CloudFront

### Build Project

```bash
npm run build
```

### Upload ke S3

```bash
# Install AWS CLI
# Configure credentials
aws configure

# Create S3 bucket
aws s3 mb s3://savior-dashboard

# Upload files
aws s3 sync dist/ s3://savior-dashboard --delete

# Enable static website hosting
aws s3 website s3://savior-dashboard \
  --index-document index.html \
  --error-document index.html
```

### Setup CloudFront

1. Create CloudFront distribution
2. Set origin to S3 bucket
3. Configure custom error pages
4. Add SSL certificate
5. Set up custom domain (optional)

## 6. Docker Deployment

**Dockerfile**:

```dockerfile
# Build stage
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

**nginx.conf**:

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://your-backend-url;
    }
}
```

**Build & Run**:

```bash
# Build image
docker build -t savior-dashboard .

# Run container
docker run -d -p 80:80 savior-dashboard
```

## 7. VPS/Server Manual Deployment

### Prerequisites

- Node.js 16+
- Nginx/Apache
- PM2 (for Node.js process management)

### Setup

```bash
# Clone repository
git clone https://github.com/AmeliaOchaM/SAVIOR_Dashboard.git
cd SAVIOR_Dashboard

# Install dependencies
npm install

# Build
npm run build

# Install serve globally
npm install -g serve

# Run with PM2
pm2 start "serve -s dist -p 3000" --name savior-dashboard

# Save PM2 configuration
pm2 save
pm2 startup
```

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name savior.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### SSL dengan Let's Encrypt

```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d savior.yourdomain.com

# Auto-renewal
sudo certbot renew --dry-run
```

## Environment Variables

Untuk production, set environment variables:

```bash
# .env.production
VITE_API_URL=https://api.savior.health/v1
VITE_WS_URL=wss://api.savior.health/ws
VITE_USE_MOCK_DATA=false
```

## Performance Optimization

### 1. Enable Gzip Compression

```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript;
gzip_min_length 1000;
```

### 2. Cache Static Assets

```nginx
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### 3. Build Optimization

```javascript
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'chart-vendor': ['recharts'],
        },
      },
    },
  },
});
```

## Monitoring & Analytics

### Google Analytics

```html
<!-- Add to index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Sentry Error Tracking

```bash
npm install @sentry/react
```

```javascript
// src/main.jsx
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: 'YOUR_SENTRY_DSN',
  environment: import.meta.env.MODE,
});
```

## Health Check

Tambahkan endpoint health check:

```javascript
// src/pages/HealthCheck.jsx
export default function HealthCheck() {
  return (
    <div>
      {JSON.stringify({
        status: 'ok',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
      })}
    </div>
  );
}
```

## Continuous Deployment

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build
        env:
          VITE_API_URL: ${{ secrets.VITE_API_URL }}
          VITE_WS_URL: ${{ secrets.VITE_WS_URL }}

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## Rollback Strategy

```bash
# Vercel
vercel rollback

# Netlify
netlify rollback

# Git-based rollback
git revert HEAD
git push origin main
```

## Checklist Pre-Deployment

- [ ] Build berhasil tanpa error
- [ ] Environment variables configured
- [ ] API endpoints working
- [ ] All tests passing
- [ ] Security headers configured
- [ ] SSL/HTTPS enabled
- [ ] Analytics setup
- [ ] Error tracking setup
- [ ] Performance optimized
- [ ] Mobile responsive tested
- [ ] Browser compatibility checked

## Post-Deployment

1. **Test production deployment**

   - Check all pages load
   - Test all features
   - Verify API connections
   - Test on mobile devices

2. **Monitor**

   - Watch error logs
   - Check performance metrics
   - Monitor user analytics

3. **Update documentation**
   - Update README with production URL
   - Document any deployment-specific configs

---

**Deploy dengan percaya diri! 🚀**
