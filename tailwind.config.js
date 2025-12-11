/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // SAVIOR Brand Colors
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        // Blood Pressure Status Colors
        bp: {
          hypotension: '#3b82f6', // Blue - Low BP
          normal: '#10b981', // Green - Normal
          prehypertension: '#f59e0b', // Yellow - Pre-Hypertension
          stage1: '#f97316', // Orange - Stage 1
          stage2: '#ef4444', // Red - Stage 2
        },
        // Stress Level Colors
        stress: {
          stress: '#ef4444', // Red - Stress
          baseline: '#10b981', // Green - Baseline/Normal
          amusement: '#8b5cf6', // Purple - Amusement/Relaxed
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};
