/**
 * SAVIOR - Blood Pressure Monitor Component
 * 
 * Komponen modular untuk menampilkan monitoring tekanan darah
 * dengan 5 kategori: Hipotensi, Normal, Pre-Hipertensi, Stage 1, Stage 2
 * 
 * Props:
 * - systolic: number - Tekanan sistol (mmHg)
 * - diastolic: number - Tekanan diastol (mmHg)
 * - timestamp: Date - Waktu pengukuran
 * - heartRate: number - Detak jantung (bpm)
 */

import React from 'react';
import { Activity, Heart, TrendingUp, TrendingDown, CheckCircle, AlertTriangle, AlertCircle, AlertOctagon } from 'lucide-react';
import { getBloodPressureCategory, BP_CATEGORIES } from '../config/bloodPressureConfig';

const BloodPressureMonitor = ({
    systolic = 120,
    diastolic = 80,
    timestamp = new Date(),
    heartRate = 72,
    showTrend = true
}) => {
    const category = getBloodPressureCategory(systolic, diastolic);

    // Icon mapping
    const iconMap = {
        'TrendingDown': TrendingDown,
        'CheckCircle': CheckCircle,
        'AlertTriangle': AlertTriangle,
        'AlertCircle': AlertCircle,
        'AlertOctagon': AlertOctagon,
    };

    const CategoryIcon = iconMap[category.icon] || Activity;

    const formatTime = (date) => {
        return new Date(date).toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="card hover:shadow-xl transition-shadow duration-300">
            {/* Header */}
            <div className="card-header">
                <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${category.bgColor} bg-opacity-10`}>
                        <Activity className={`w-6 h-6 ${category.textColor}`} />
                    </div>
                    <div>
                        <h3 className="card-title">Tekanan Darah</h3>
                        <p className="text-sm text-gray-500">Blood Pressure Monitor</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-xs text-gray-500">Terakhir diukur</p>
                    <p className="text-sm font-semibold text-gray-700">{formatTime(timestamp)}</p>
                </div>
            </div>

            {/* Main Reading */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-baseline gap-2">
                    <span className={`metric-value ${category.textColor}`}>
                        {systolic}
                    </span>
                    <span className="text-2xl text-gray-400">/</span>
                    <span className={`text-3xl font-bold ${category.textColor}`}>
                        {diastolic}
                    </span>
                    <span className="text-lg text-gray-500 ml-2">mmHg</span>
                </div>

                <div className="text-right">
                    <div className="flex items-center gap-2 mb-1">
                        <Heart className="w-5 h-5 text-red-500 animate-pulse" />
                        <span className="text-2xl font-bold text-gray-800">{heartRate}</span>
                        <span className="text-sm text-gray-500">bpm</span>
                    </div>
                    <p className="text-xs text-gray-500">Detak Jantung</p>
                </div>
            </div>

            {/* Category Badge */}
            <div className="mb-6">
                <div
                    className="badge text-white flex items-center gap-2 w-fit rounded-xl"
                    style={{ backgroundColor: category.color }}
                >
                    <CategoryIcon className="w-5 h-5" />
                    <span>{category.label}</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">{category.description}</p>
            </div>

            {/* Category Range Indicator */}
            <div className="space-y-3">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                    Referensi Kategori
                </p>
                {Object.values(BP_CATEGORIES).map((cat) => {
                    const CatIcon = iconMap[cat.icon] || Activity;
                    return (
                        <div
                            key={cat.id}
                            className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all ${cat.id === category.id
                                ? `${cat.bgColor} bg-opacity-10 border-2 ${cat.borderColor}`
                                : 'bg-gray-50 border-2 border-transparent'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <CatIcon className="w-4 h-4" style={{ color: cat.color }} />
                                <span className={`text-sm font-medium ${cat.id === category.id ? cat.textColor : 'text-gray-600'
                                    }`}>
                                    {cat.label}
                                </span>
                            </div>
                            <span className="text-xs text-gray-500 font-medium">
                                {cat.range.systolic.min}-{cat.range.systolic.max === 999 ? '∞' : cat.range.systolic.max}/
                                {cat.range.diastolic.min}-{cat.range.diastolic.max === 999 ? '∞' : cat.range.diastolic.max}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Recommendations */}
            {category.severity !== 'normal' && (
                <div className={`mt-6 px-5 py-4 rounded-lg border-l-4 ${category.severity === 'critical' || category.severity === 'high'
                    ? 'bg-red-50 border-red-500'
                    : category.severity === 'elevated'
                        ? 'bg-yellow-50 border-yellow-500'
                        : 'bg-blue-50 border-blue-500'
                    }`}>
                    <p className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                        <span className="text-base">⚡</span>
                        <span>Rekomendasi</span>
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed pl-6">
                        {category.severity === 'critical' || category.severity === 'high'
                            ? 'Segera konsultasi dengan dokter. Hindari aktivitas berat dan kelola stress.'
                            : category.severity === 'elevated'
                                ? 'Monitor tekanan darah secara rutin. Kurangi konsumsi garam dan tingkatkan aktivitas fisik.'
                                : 'Pastikan istirahat cukup dan konsumsi cairan yang memadai.'}
                    </p>
                </div>
            )}
        </div>
    );
};

export default BloodPressureMonitor;
