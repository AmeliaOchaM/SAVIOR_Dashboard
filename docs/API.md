# SAVIOR Dashboard - Dokumentasi API

## Overview

Dokumentasi ini menjelaskan API endpoints yang dapat diintegrasikan dengan SAVIOR Dashboard untuk menerima data dari smartwatch IoT dan backend AI.

## Base URL

```
Production: https://api.savior.health/v1
Development: http://localhost:8000/api
```

## Authentication

Semua API requests memerlukan authentication header:

```http
Authorization: Bearer <your_api_token>
Content-Type: application/json
```

## Endpoints

### 1. Health Data

#### Get Current Health Data

Mendapatkan data kesehatan terkini dari smartwatch.

```http
GET /health/current
```

**Response:**

```json
{
  "success": true,
  "data": {
    "bloodPressure": {
      "systolic": 120,
      "diastolic": 80,
      "heartRate": 72,
      "timestamp": "2025-12-11T10:30:00Z",
      "category": "normal"
    },
    "stress": {
      "level": "baseline",
      "value": 45,
      "hrv": 50,
      "timestamp": "2025-12-11T10:30:00Z"
    }
  }
}
```

#### Get Historical Data

Mendapatkan data historis untuk visualisasi grafik.

```http
GET /health/history?type={type}&range={range}
```

**Parameters:**

- `type` (required): `bp` atau `stress`
- `range` (optional): `24h`, `7d`, `30d` (default: `24h`)

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "timestamp": "2025-12-11T09:00:00Z",
      "systolic": 118,
      "diastolic": 78,
      "heartRate": 70
    },
    {
      "timestamp": "2025-12-11T10:00:00Z",
      "systolic": 120,
      "diastolic": 80,
      "heartRate": 72
    }
  ],
  "metadata": {
    "type": "bp",
    "range": "24h",
    "count": 24
  }
}
```

#### Post Health Data

Mengirim data kesehatan baru dari device.

```http
POST /health/data
```

**Request Body:**

```json
{
  "deviceId": "savior-watch-001",
  "bloodPressure": {
    "systolic": 120,
    "diastolic": 80,
    "heartRate": 72
  },
  "stress": {
    "level": "baseline",
    "value": 45,
    "hrv": 50
  },
  "timestamp": "2025-12-11T10:30:00Z"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Health data saved successfully",
  "id": "hd_123456789"
}
```

### 2. Device Management

#### Get Device Status

Mendapatkan status perangkat smartwatch.

```http
GET /device/status
```

**Response:**

```json
{
  "success": true,
  "data": {
    "deviceId": "savior-watch-001",
    "deviceName": "SAVIOR Watch",
    "isConnected": true,
    "batteryLevel": 85,
    "lastSync": "2025-12-11T10:25:00Z",
    "firmwareVersion": "1.2.3",
    "signalStrength": -45
  }
}
```

#### Sync Device

Meminta sinkronisasi data dari device.

```http
POST /device/sync
```

**Request Body:**

```json
{
  "deviceId": "savior-watch-001"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Device sync initiated",
  "syncId": "sync_123456789",
  "estimatedTime": 30
}
```

### 3. Alerts

#### Get Alerts

Mendapatkan daftar alert kesehatan.

```http
GET /alerts?status={status}&limit={limit}
```

**Parameters:**

- `status` (optional): `active`, `dismissed`, `all` (default: `active`)
- `limit` (optional): number (default: `10`)

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "alert_123",
      "type": "critical",
      "title": "Tekanan Darah Tinggi",
      "message": "Tekanan darah Anda mencapai 165/105 mmHg",
      "timestamp": "2025-12-11T10:30:00Z",
      "status": "active",
      "relatedData": {
        "systolic": 165,
        "diastolic": 105
      }
    }
  ],
  "metadata": {
    "total": 1,
    "status": "active"
  }
}
```

#### Dismiss Alert

Menutup/dismiss alert.

```http
PATCH /alerts/{alertId}/dismiss
```

**Response:**

```json
{
  "success": true,
  "message": "Alert dismissed successfully"
}
```

### 4. User Profile

#### Get User Profile

Mendapatkan profil pengguna.

```http
GET /user/profile
```

**Response:**

```json
{
  "success": true,
  "data": {
    "userId": "user_123",
    "name": "John Doe",
    "email": "john@example.com",
    "age": 30,
    "gender": "male",
    "medicalHistory": {
      "hasHypertension": false,
      "hasDiabetes": false,
      "medications": []
    },
    "preferences": {
      "alertFrequency": "realtime",
      "language": "id"
    }
  }
}
```

#### Update User Profile

Memperbarui profil pengguna.

```http
PATCH /user/profile
```

**Request Body:**

```json
{
  "preferences": {
    "alertFrequency": "hourly",
    "language": "en"
  }
}
```

## WebSocket Connection

### Connect to Real-time Stream

```javascript
const ws = new WebSocket('wss://api.savior.health/ws');

ws.onopen = () => {
  // Send authentication
  ws.send(
    JSON.stringify({
      type: 'auth',
      token: 'your_api_token',
    })
  );
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);

  switch (data.type) {
    case 'bloodPressure':
      console.log('New BP data:', data.payload);
      break;
    case 'stress':
      console.log('New stress data:', data.payload);
      break;
    case 'alert':
      console.log('New alert:', data.payload);
      break;
    case 'device':
      console.log('Device update:', data.payload);
      break;
  }
};
```

### WebSocket Message Types

#### Blood Pressure Update

```json
{
  "type": "bloodPressure",
  "payload": {
    "systolic": 120,
    "diastolic": 80,
    "heartRate": 72,
    "timestamp": "2025-12-11T10:30:00Z"
  }
}
```

#### Stress Level Update

```json
{
  "type": "stress",
  "payload": {
    "level": "baseline",
    "value": 45,
    "hrv": 50,
    "timestamp": "2025-12-11T10:30:00Z"
  }
}
```

#### Alert Notification

```json
{
  "type": "alert",
  "payload": {
    "id": "alert_123",
    "type": "warning",
    "title": "Tekanan Darah Meningkat",
    "message": "Detail peringatan...",
    "timestamp": "2025-12-11T10:30:00Z"
  }
}
```

## Error Responses

Semua error responses mengikuti format berikut:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description",
    "details": {}
  }
}
```

### Common Error Codes

- `AUTH_FAILED` (401): Authentication gagal
- `NOT_FOUND` (404): Resource tidak ditemukan
- `VALIDATION_ERROR` (422): Validasi request gagal
- `RATE_LIMIT` (429): Terlalu banyak request
- `SERVER_ERROR` (500): Internal server error

## Rate Limiting

API memiliki rate limit:

- 100 requests per minute untuk authenticated users
- 20 requests per minute untuk unauthenticated requests

Response headers akan menunjukkan rate limit status:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1702281600
```

## Pagination

Untuk endpoints yang mengembalikan list data:

```http
GET /health/history?page=1&limit=20
```

Response akan include metadata:

```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

## Testing

### Postman Collection

Import Postman collection untuk testing API:

```
docs/SAVIOR-API.postman_collection.json
```

### cURL Examples

```bash
# Get current health data
curl -X GET https://api.savior.health/v1/health/current \
  -H "Authorization: Bearer YOUR_TOKEN"

# Post health data
curl -X POST https://api.savior.health/v1/health/data \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "deviceId": "savior-watch-001",
    "bloodPressure": {
      "systolic": 120,
      "diastolic": 80,
      "heartRate": 72
    }
  }'
```

## Support

Untuk pertanyaan dan support, hubungi:

- Email: api-support@savior.health
- Documentation: https://docs.savior.health
- GitHub Issues: https://github.com/AmeliaOchaM/SAVIOR_Dashboard/issues
