/**
 * SAVIOR - Heart Rate Monitor Component
 * 
 * Komponen untuk monitoring heart rate dengan kategori dan zona latihan
 * 
 * Props:
 * - heartRate: number - Detak jantung (bpm)
 * - timestamp: Date - Waktu pengukuran
 * - age: number - Usia user (untuk kalkulasi zona)
 * - showZones: boolean - Tampilkan zona latihan
 */

import React from 'react';
import { Heart, Activity, Zap, TrendingDown, HeartCrack, AlertCircle } from 'lucide-react';
import { getHeartRateCategory, calculateHRZone, HR_ZONES } from '../config/heartRateConfig';

const HeartRateMonitor = ({
    heartRate = 72,
    timestamp = new Date(),
    age = 30,
    showZones = true
}) => {
    const category = getHeartRateCategory(heartRate);
    const zone = calculateHRZone(age, heartRate);
    const maxHR = 220 - age;
    const percentage = Math.round((heartRate / maxHR) * 100);

    // Icon mapping
    const iconMap = {
        'TrendingDown': TrendingDown,
        'Heart': Heart,
        'AlertCircle': AlertCircle,
        'HeartCrack': HeartCrack,
    };

    const CategoryIcon = iconMap[category.icon] || Heart;

    const formatTime = (date) => {
        return new Date(date).toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${category.bgColor} bg-opacity-10`}>
                        <Heart className={`w-6 h-6 ${category.textColor} animate-pulse`} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">Heart Rate</h3>
                        <p className="text-sm text-gray-500">Detak Jantung</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-xs text-gray-500">Terakhir diukur</p>
                    <p className="text-sm font-semibold text-gray-700">{formatTime(timestamp)}</p>
                </div>
            </div>

            {/* Main Reading */}
            <div className="text-center mb-6">
                <div className="flex items-baseline justify-center gap-2 mb-2">
                    <span className={`text-6xl font-bold ${category.textColor}`}>
                        {heartRate}
                    </span>
                    <span className="text-2xl text-gray-500">bpm</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <Activity className="w-4 h-4" />
                    <span>{percentage}% dari max HR ({maxHR} bpm)</span>
                </div>
            </div>

            {/* Category Badge */}
            <div className="mb-6">
                <div
                    className="px-4 py-2 rounded-xl text-white flex items-center gap-2 w-fit mx-auto text-lg font-semibold"
                    style={{ backgroundColor: category.color }}
                >
                    <CategoryIcon className="w-6 h-6" />
                    <span>{category.label}</span>
                </div>
                <p className="text-sm text-gray-600 mt-2 text-center">{category.description}</p>
            </div>

            {/* HR Zone Indicator */}
            {showZones && (
                <div className="mb-6">
                    <div
                        className="p-4 rounded-lg border-l-4"
                        style={{
                            backgroundColor: `${zone.color}20`,
                            borderColor: zone.color
                        }}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <Zap className="w-5 h-5" style={{ color: zone.color }} />
                                <span className="font-semibold text-gray-800">{zone.name}</span>
                            </div>
                            <span className="text-sm font-medium text-gray-600">{zone.percentage}</span>
                        </div>
                        <p className="text-sm text-gray-600">{zone.benefits}</p>
                    </div>
                </div>
            )}

            {/* Training Zones */}
            {showZones && (
                <div className="space-y-2">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                        Zona Latihan
                    </p>
                    {Object.values(HR_ZONES).map((z, index) => (
                        <div
                            key={index}
                            className={`flex items-center justify-between p-2 rounded-lg transition-all ${z.name === zone.name
                                    ? 'ring-2'
                                    : 'bg-gray-50'
                                }`}
                            style={z.name === zone.name ? {
                                backgroundColor: `${z.color}10`,
                                ringColor: z.color
                            } : {}}
                        >
                            <div>
                                <p className={`text-sm font-medium ${z.name === zone.name ? 'font-bold' : 'text-gray-700'
                                    }`}>
                                    {z.description}
                                </p>
                                <p className="text-xs text-gray-500">{z.benefits}</p>
                            </div>
                            <span className="text-xs font-medium text-gray-600">{z.percentage}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Recommendations */}
            {category.severity !== 'normal' && (
                <div className={`mt-6 p-4 rounded-lg border-l-4 ${category.severity === 'high'
                        ? 'bg-red-50 border-red-500'
                        : category.severity === 'elevated'
                            ? 'bg-amber-50 border-amber-500'
                            : 'bg-blue-50 border-blue-500'
                    }`}>
                    <p className="text-sm font-semibold text-gray-800 mb-1">
                        ⚕️ Rekomendasi
                    </p>
                    <p className="text-sm text-gray-600">
                        {category.severity === 'high'
                            ? 'Detak jantung tinggi. Istirahat dan konsultasi dokter jika berlanjut.'
                            : category.severity === 'elevated'
                                ? 'Detak jantung sedikit meningkat. Relaksasi dan hindari aktivitas berat.'
                                : 'Detak jantung rendah. Konsultasi dokter jika disertai gejala lain.'}
                    </p>
                </div>
            )}
        </div>
    );
};

export default HeartRateMonitor;
