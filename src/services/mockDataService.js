/**
 * SAVIOR - Mock Data Service
 *
 * Service untuk generate data dummy untuk development dan testing
 * Nantinya akan diganti dengan integrasi ke backend/IoT device
 */

/**
 * Generate random blood pressure data
 */
export const generateBPData = () => {
  const categories = [
    { systolic: 85, diastolic: 58 }, // Hypotension
    { systolic: 110, diastolic: 70 }, // Normal
    { systolic: 130, diastolic: 85 }, // Pre-hypertension
    { systolic: 145, diastolic: 92 }, // Stage 1
    { systolic: 165, diastolic: 105 }, // Stage 2
  ];

  const category = categories[Math.floor(Math.random() * categories.length)];
  return {
    systolic: category.systolic + Math.floor(Math.random() * 10 - 5),
    diastolic: category.diastolic + Math.floor(Math.random() * 10 - 5),
    heartRate: 60 + Math.floor(Math.random() * 40),
    timestamp: new Date(),
  };
};

/**
 * Generate random stress data
 */
export const generateStressData = () => {
  const levels = ['stress', 'baseline', 'amusement'];
  const stressLevel = levels[Math.floor(Math.random() * levels.length)];

  let stressValue;
  if (stressLevel === 'stress') stressValue = 70 + Math.floor(Math.random() * 30);
  else if (stressLevel === 'amusement') stressValue = Math.floor(Math.random() * 30);
  else stressValue = 30 + Math.floor(Math.random() * 40);

  return {
    stressLevel,
    stressValue,
    hrv: 30 + Math.floor(Math.random() * 40),
    timestamp: new Date(),
  };
};

/**
 * Generate historical data for charts
 */
export const generateHistoricalData = (type, hours = 24) => {
  const data = [];
  const now = new Date();

  for (let i = hours; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000);

    if (type === 'bp') {
      const bp = generateBPData();
      data.push({
        timestamp: timestamp.toISOString(),
        systolic: bp.systolic,
        diastolic: bp.diastolic,
        heartRate: bp.heartRate,
      });
    } else {
      const stress = generateStressData();
      data.push({
        timestamp: timestamp.toISOString(),
        stressValue: stress.stressValue,
        hrv: stress.hrv,
      });
    }
  }

  return data;
};

/**
 * Generate alerts based on current health data
 */
export const generateAlerts = (bpData, stressData, tempData = null, hrData = null) => {
  const alerts = [];
  let alertId = 1;

  // Check blood pressure
  if (bpData.systolic >= 160 || bpData.diastolic >= 100) {
    alerts.push({
      id: alertId++,
      type: 'critical',
      title: 'Tekanan Darah Sangat Tinggi',
      message:
        'Tekanan darah Anda berada pada tingkat hipertensi stage 2. Segera konsultasikan dengan dokter.',
      timestamp: new Date(),
    });
  } else if (bpData.systolic >= 140 || bpData.diastolic >= 90) {
    alerts.push({
      id: alertId++,
      type: 'warning',
      title: 'Tekanan Darah Tinggi',
      message: 'Tekanan darah Anda berada pada tingkat hipertensi stage 1. Monitor secara teratur.',
      timestamp: new Date(),
    });
  } else if (bpData.systolic < 90 || bpData.diastolic < 60) {
    alerts.push({
      id: alertId++,
      type: 'warning',
      title: 'Tekanan Darah Rendah',
      message:
        'Tekanan darah Anda rendah. Pastikan istirahat cukup dan konsumsi cairan yang memadai.',
      timestamp: new Date(),
    });
  }

  // Check stress level
  if (stressData.stressLevel === 'stress' || stressData.stressValue >= 70) {
    alerts.push({
      id: alertId++,
      type: 'warning',
      title: 'Tingkat Stress Tinggi',
      message:
        'Anda mengalami stress tinggi. Disarankan untuk beristirahat dan melakukan relaksasi.',
      timestamp: new Date(),
    });
  }

  // Check heart rate
  if (bpData.heartRate > 120) {
    alerts.push({
      id: alertId++,
      type: 'warning',
      title: 'Takikardia Terdeteksi',
      message: `Detak jantung Anda ${bpData.heartRate} bpm, sangat tinggi. Segera istirahat.`,
      timestamp: new Date(),
    });
  } else if (bpData.heartRate > 100) {
    alerts.push({
      id: alertId++,
      type: 'info',
      title: 'Detak Jantung Meningkat',
      message: `Detak jantung Anda ${bpData.heartRate} bpm, sedikit meningkat.`,
      timestamp: new Date(),
    });
  } else if (bpData.heartRate < 60) {
    alerts.push({
      id: alertId++,
      type: 'info',
      title: 'Detak Jantung Rendah',
      message: `Detak jantung Anda ${bpData.heartRate} bpm, lebih rendah dari normal.`,
      timestamp: new Date(),
    });
  }

  // Check temperature
  if (tempData) {
    if (tempData.temperature >= 38) {
      alerts.push({
        id: alertId++,
        type: 'warning',
        title: 'Demam Tinggi',
        message: `Suhu tubuh Anda ${tempData.temperature.toFixed(
          1
        )}°C. Minum banyak air dan istirahat.`,
        timestamp: new Date(),
      });
    } else if (tempData.temperature >= 37.2) {
      alerts.push({
        id: alertId++,
        type: 'info',
        title: 'Suhu Sedikit Meningkat',
        message: `Suhu tubuh Anda ${tempData.temperature.toFixed(1)}°C, sedikit di atas normal.`,
        timestamp: new Date(),
      });
    } else if (tempData.temperature < 35) {
      alerts.push({
        id: alertId++,
        type: 'critical',
        title: 'Hipotermia Terdeteksi',
        message: `Suhu tubuh Anda ${tempData.temperature.toFixed(
          1
        )}°C, sangat rendah. Segera cari bantuan medis!`,
        timestamp: new Date(),
      });
    } else if (tempData.temperature < 36.1) {
      alerts.push({
        id: alertId++,
        type: 'info',
        title: 'Suhu Tubuh Rendah',
        message: `Suhu tubuh Anda ${tempData.temperature.toFixed(1)}°C, lebih rendah dari normal.`,
        timestamp: new Date(),
      });
    }
  }

  return alerts;
};

/**
 * Generate random temperature data
 */
export const generateTemperatureData = () => {
  const ranges = [
    { temp: 34.5 }, // Hypothermia
    { temp: 35.5 }, // Low
    { temp: 36.5 }, // Normal
    { temp: 37.5 }, // Fever
    { temp: 38.5 }, // High Fever
  ];

  const range = ranges[Math.floor(Math.random() * ranges.length)];
  return {
    temperature: range.temp + (Math.random() * 0.6 - 0.3), // ±0.3°C variation
    timestamp: new Date(),
  };
};

/**
 * Generate random heart rate data with more detail
 */
export const generateHeartRateData = () => {
  const ranges = [
    { hr: 55 }, // Bradycardia
    { hr: 75 }, // Normal/Resting
    { hr: 110 }, // Elevated
    { hr: 130 }, // Tachycardia
  ];

  const range = ranges[Math.floor(Math.random() * ranges.length)];
  return {
    heartRate: range.hr + Math.floor(Math.random() * 10 - 5),
    timestamp: new Date(),
  };
};

/**
 * Generate historical data for temperature chart
 */
export const generateTemperatureHistory = (hours = 24) => {
  const data = [];
  const now = new Date();

  for (let i = hours; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000);
    const temp = generateTemperatureData();
    data.push({
      timestamp: timestamp.toISOString(),
      temperature: parseFloat(temp.temperature.toFixed(1)),
    });
  }

  return data;
};

/**
 * Generate historical data for heart rate chart
 */
export const generateHeartRateHistory = (hours = 24) => {
  const data = [];
  const now = new Date();

  for (let i = hours; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000);
    const hr = generateHeartRateData();
    data.push({
      timestamp: timestamp.toISOString(),
      heartRate: hr.heartRate,
    });
  }

  return data;
};

/**
 * Simulate device status
 */
export const getDeviceStatus = () => {
  return {
    isConnected: Math.random() > 0.1, // 90% chance connected
    batteryLevel: 60 + Math.floor(Math.random() * 40),
    lastSync: new Date(Date.now() - Math.random() * 300000), // Random within last 5 minutes
    deviceName: 'SAVIOR Watch',
  };
};
