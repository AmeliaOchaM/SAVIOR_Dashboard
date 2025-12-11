/**
 * SAVIOR - Heart Rate Configuration
 *
 * Kategori heart rate berdasarkan zona dan kondisi:
 * - Bradycardia: Detak jantung sangat lambat (< 60 bpm)
 * - Resting: Istirahat normal (60-100 bpm)
 * - Elevated: Sedikit meningkat (100-120 bpm)
 * - Tachycardia: Detak jantung tinggi (> 120 bpm)
 */

export const HR_CATEGORIES = {
  BRADYCARDIA: {
    id: 'bradycardia',
    label: 'Bradikardia',
    description: 'Detak Jantung Lambat',
    color: '#3b82f6',
    bgColor: 'bg-blue-500',
    textColor: 'text-blue-500',
    borderColor: 'border-blue-500',
    range: { min: 0, max: 60 },
    icon: 'TrendingDown',
    severity: 'low',
  },
  RESTING: {
    id: 'resting',
    label: 'Normal',
    description: 'Detak Jantung Normal',
    color: '#10b981',
    bgColor: 'bg-green-500',
    textColor: 'text-green-500',
    borderColor: 'border-green-500',
    range: { min: 60, max: 100 },
    icon: 'Heart',
    severity: 'normal',
  },
  ELEVATED: {
    id: 'elevated',
    label: 'Meningkat',
    description: 'Detak Jantung Meningkat',
    color: '#f59e0b',
    bgColor: 'bg-amber-500',
    textColor: 'text-amber-500',
    borderColor: 'border-amber-500',
    range: { min: 100, max: 120 },
    icon: 'AlertCircle',
    severity: 'elevated',
  },
  TACHYCARDIA: {
    id: 'tachycardia',
    label: 'Takikardia',
    description: 'Detak Jantung Tinggi',
    color: '#ef4444',
    bgColor: 'bg-red-500',
    textColor: 'text-red-500',
    borderColor: 'border-red-500',
    range: { min: 120, max: 999 },
    icon: 'HeartCrack',
    severity: 'high',
  },
};

/**
 * Heart Rate Training Zones
 */
export const HR_ZONES = {
  ZONE_1: {
    name: 'Recovery',
    description: 'Pemulihan',
    percentage: '50-60%',
    color: '#3b82f6',
    benefits: 'Pemulihan dan pemanasan',
  },
  ZONE_2: {
    name: 'Fat Burn',
    description: 'Pembakaran Lemak',
    percentage: '60-70%',
    color: '#10b981',
    benefits: 'Pembakaran lemak optimal',
  },
  ZONE_3: {
    name: 'Cardio',
    description: 'Kardio',
    percentage: '70-80%',
    color: '#f59e0b',
    benefits: 'Meningkatkan ketahanan',
  },
  ZONE_4: {
    name: 'Peak',
    description: 'Puncak',
    percentage: '80-90%',
    color: '#ef4444',
    benefits: 'Latihan intensitas tinggi',
  },
};

/**
 * Menentukan kategori heart rate berdasarkan nilai (bpm)
 * @param {number} heartRate - Heart rate dalam bpm
 * @returns {Object} Kategori heart rate
 */
export const getHeartRateCategory = (heartRate) => {
  if (heartRate < 60) {
    return HR_CATEGORIES.BRADYCARDIA;
  }

  if (heartRate >= 120) {
    return HR_CATEGORIES.TACHYCARDIA;
  }

  if (heartRate >= 100) {
    return HR_CATEGORIES.ELEVATED;
  }

  return HR_CATEGORIES.RESTING;
};

/**
 * Calculate heart rate zone based on age and current HR
 * @param {number} age - User's age
 * @param {number} heartRate - Current heart rate
 * @returns {Object} Heart rate zone information
 */
export const calculateHRZone = (age, heartRate) => {
  const maxHR = 220 - age;
  const percentage = (heartRate / maxHR) * 100;

  if (percentage < 60) return { zone: 'ZONE_1', ...HR_ZONES.ZONE_1 };
  if (percentage < 70) return { zone: 'ZONE_2', ...HR_ZONES.ZONE_2 };
  if (percentage < 80) return { zone: 'ZONE_3', ...HR_ZONES.ZONE_3 };
  return { zone: 'ZONE_4', ...HR_ZONES.ZONE_4 };
};
