/**
 * SAVIOR - Temperature Configuration
 *
 * Kategori suhu tubuh berdasarkan standar medis:
 * - Hypothermia: Suhu tubuh sangat rendah (< 35°C)
 * - Low: Suhu tubuh rendah (35-36.1°C)
 * - Normal: Suhu tubuh normal (36.1-37.2°C)
 * - Fever: Demam ringan (37.2-38°C)
 * - High Fever: Demam tinggi (> 38°C)
 */

export const TEMP_CATEGORIES = {
  HYPOTHERMIA: {
    id: 'hypothermia',
    label: 'Hipotermia',
    description: 'Suhu Tubuh Sangat Rendah',
    color: '#3b82f6',
    bgColor: 'bg-blue-500',
    textColor: 'text-blue-500',
    borderColor: 'border-blue-500',
    range: { min: 0, max: 35 },
    icon: 'Snowflake',
    severity: 'critical',
  },
  LOW: {
    id: 'low',
    label: 'Rendah',
    description: 'Suhu Tubuh Rendah',
    color: '#06b6d4',
    bgColor: 'bg-cyan-500',
    textColor: 'text-cyan-500',
    borderColor: 'border-cyan-500',
    range: { min: 35, max: 36.1 },
    icon: 'Wind',
    severity: 'low',
  },
  NORMAL: {
    id: 'normal',
    label: 'Normal',
    description: 'Suhu Tubuh Normal',
    color: '#10b981',
    bgColor: 'bg-green-500',
    textColor: 'text-green-500',
    borderColor: 'border-green-500',
    range: { min: 36.1, max: 37.2 },
    icon: 'CheckCircle',
    severity: 'normal',
  },
  FEVER: {
    id: 'fever',
    label: 'Demam Ringan',
    description: 'Suhu Sedikit Tinggi',
    color: '#f59e0b',
    bgColor: 'bg-amber-500',
    textColor: 'text-amber-500',
    borderColor: 'border-amber-500',
    range: { min: 37.2, max: 38 },
    icon: 'ThermometerSun',
    severity: 'elevated',
  },
  HIGH_FEVER: {
    id: 'high_fever',
    label: 'Demam Tinggi',
    description: 'Suhu Tubuh Tinggi',
    color: '#ef4444',
    bgColor: 'bg-red-500',
    textColor: 'text-red-500',
    borderColor: 'border-red-500',
    range: { min: 38, max: 999 },
    icon: 'Flame',
    severity: 'high',
  },
};

/**
 * Menentukan kategori suhu tubuh berdasarkan nilai (Celsius)
 * @param {number} temperature - Suhu tubuh dalam Celsius
 * @returns {Object} Kategori suhu
 */
export const getTemperatureCategory = (temperature) => {
  if (temperature < 35) {
    return TEMP_CATEGORIES.HYPOTHERMIA;
  }

  if (temperature >= 38) {
    return TEMP_CATEGORIES.HIGH_FEVER;
  }

  if (temperature >= 37.2) {
    return TEMP_CATEGORIES.FEVER;
  }

  if (temperature >= 36.1) {
    return TEMP_CATEGORIES.NORMAL;
  }

  return TEMP_CATEGORIES.LOW;
};

/**
 * Convert Celsius to Fahrenheit
 * @param {number} celsius - Temperature in Celsius
 * @returns {number} Temperature in Fahrenheit
 */
export const celsiusToFahrenheit = (celsius) => {
  return (celsius * 9) / 5 + 32;
};
