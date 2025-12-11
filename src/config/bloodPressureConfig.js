/**
 * SAVIOR - Blood Pressure Categories Configuration
 *
 * Kategori tekanan darah berdasarkan standar medis:
 * - Hypotension: Tekanan darah rendah (< 90/60 mmHg)
 * - Normal: Tekanan darah normal (90-119/60-79 mmHg)
 * - Pre-Hypertension: Pra-hipertensi (120-139/80-89 mmHg)
 * - Stage 1: Hipertensi tingkat 1 (140-159/90-99 mmHg)
 * - Stage 2: Hipertensi tingkat 2 (≥ 160/100 mmHg)
 */

export const BP_CATEGORIES = {
  HYPOTENSION: {
    id: 'hypotension',
    label: 'Hipotensi',
    description: 'Tekanan Darah Rendah',
    color: '#3b82f6',
    bgColor: 'bg-bp-hypotension',
    textColor: 'text-bp-hypotension',
    borderColor: 'border-bp-hypotension',
    range: {
      systolic: { min: 0, max: 90 },
      diastolic: { min: 0, max: 60 },
    },
    icon: 'TrendingDown',
    severity: 'low',
  },
  NORMAL: {
    id: 'normal',
    label: 'Normal',
    description: 'Tekanan Darah Normal',
    color: '#10b981',
    bgColor: 'bg-bp-normal',
    textColor: 'text-bp-normal',
    borderColor: 'border-bp-normal',
    range: {
      systolic: { min: 90, max: 119 },
      diastolic: { min: 60, max: 79 },
    },
    icon: 'CheckCircle',
    severity: 'normal',
  },
  PREHYPERTENSION: {
    id: 'prehypertension',
    label: 'Pre-Hipertensi',
    description: 'Pra-Hipertensi',
    color: '#f59e0b',
    bgColor: 'bg-bp-prehypertension',
    textColor: 'text-bp-prehypertension',
    borderColor: 'border-bp-prehypertension',
    range: {
      systolic: { min: 120, max: 139 },
      diastolic: { min: 80, max: 89 },
    },
    icon: 'AlertTriangle',
    severity: 'elevated',
  },
  STAGE_1: {
    id: 'stage1',
    label: 'Hipertensi Stage 1',
    description: 'Hipertensi Tingkat 1',
    color: '#f97316',
    bgColor: 'bg-bp-stage1',
    textColor: 'text-bp-stage1',
    borderColor: 'border-bp-stage1',
    range: {
      systolic: { min: 140, max: 159 },
      diastolic: { min: 90, max: 99 },
    },
    icon: 'AlertCircle',
    severity: 'high',
  },
  STAGE_2: {
    id: 'stage2',
    label: 'Hipertensi Stage 2',
    description: 'Hipertensi Tingkat 2',
    color: '#ef4444',
    bgColor: 'bg-bp-stage2',
    textColor: 'text-bp-stage2',
    borderColor: 'border-bp-stage2',
    range: {
      systolic: { min: 160, max: 999 },
      diastolic: { min: 100, max: 999 },
    },
    icon: 'AlertOctagon',
    severity: 'critical',
  },
};

/**
 * Menentukan kategori tekanan darah berdasarkan nilai sistol dan diastol
 * @param {number} systolic - Nilai tekanan sistol (mmHg)
 * @param {number} diastolic - Nilai tekanan diastol (mmHg)
 * @returns {Object} Kategori tekanan darah
 */
export const getBloodPressureCategory = (systolic, diastolic) => {
  if (systolic < 90 || diastolic < 60) {
    return BP_CATEGORIES.HYPOTENSION;
  }

  if (systolic >= 160 || diastolic >= 100) {
    return BP_CATEGORIES.STAGE_2;
  }

  if (systolic >= 140 || diastolic >= 90) {
    return BP_CATEGORIES.STAGE_1;
  }

  if (systolic >= 120 || diastolic >= 80) {
    return BP_CATEGORIES.PREHYPERTENSION;
  }

  return BP_CATEGORIES.NORMAL;
};
