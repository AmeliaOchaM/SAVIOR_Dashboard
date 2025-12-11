/**
 * SAVIOR - Stress Level Categories Configuration
 *
 * Kategori tingkat stress berdasarkan data sensor dan AI:
 * - Stress: Kondisi stress tinggi
 * - Baseline: Kondisi normal/tenang
 * - Amusement: Kondisi rileks/senang
 */

export const STRESS_CATEGORIES = {
  STRESS: {
    id: 'stress',
    label: 'Stress',
    description: 'Tingkat Stress Tinggi',
    color: '#ef4444',
    bgColor: 'bg-stress-stress',
    textColor: 'text-stress-stress',
    borderColor: 'border-stress-stress',
    icon: 'Frown',
    severity: 'high',
    recommendation: 'Disarankan untuk beristirahat dan melakukan relaksasi',
  },
  BASELINE: {
    id: 'baseline',
    label: 'Baseline',
    description: 'Kondisi Normal',
    color: '#10b981',
    bgColor: 'bg-stress-baseline',
    textColor: 'text-stress-baseline',
    borderColor: 'border-stress-baseline',
    icon: 'Smile',
    severity: 'normal',
    recommendation: 'Kondisi stress dalam batas normal',
  },
  AMUSEMENT: {
    id: 'amusement',
    label: 'Amusement',
    description: 'Kondisi Rileks',
    color: '#8b5cf6',
    bgColor: 'bg-stress-amusement',
    textColor: 'text-stress-amusement',
    borderColor: 'border-stress-amusement',
    icon: 'Laugh',
    severity: 'relaxed',
    recommendation: 'Kondisi sangat baik, pertahankan!',
  },
};

/**
 * Menentukan kategori stress berdasarkan nilai stress level
 * @param {string} stressLevel - Level stress dari AI ('stress', 'baseline', atau 'amusement')
 * @returns {Object} Kategori stress
 */
export const getStressCategory = (stressLevel) => {
  const level = stressLevel?.toLowerCase();

  switch (level) {
    case 'stress':
      return STRESS_CATEGORIES.STRESS;
    case 'amusement':
      return STRESS_CATEGORIES.AMUSEMENT;
    case 'baseline':
    default:
      return STRESS_CATEGORIES.BASELINE;
  }
};

/**
 * Menentukan kategori stress berdasarkan nilai numerik (0-100)
 * @param {number} stressValue - Nilai stress (0-100)
 * @returns {Object} Kategori stress
 */
export const getStressCategoryByValue = (stressValue) => {
  if (stressValue >= 70) {
    return STRESS_CATEGORIES.STRESS;
  } else if (stressValue <= 30) {
    return STRESS_CATEGORIES.AMUSEMENT;
  } else {
    return STRESS_CATEGORIES.BASELINE;
  }
};
