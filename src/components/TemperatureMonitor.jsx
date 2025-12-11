/**
 * SAVIOR - Temperature Monitor Component
 * 
 * Komponen untuk monitoring suhu tubuh dengan kategori
 * 
 * Props:
 * - temperature: number - Suhu tubuh dalam Celsius
 * - timestamp: Date - Waktu pengukuran
 * - showFahrenheit: boolean - Tampilkan konversi Fahrenheit
 */

import React from 'react';
import { Thermometer, TrendingUp, TrendingDown, Snowflake, Wind, CheckCircle, ThermometerSun, Flame } from 'lucide-react';
import { getTemperatureCategory, celsiusToFahrenheit, TEMP_CATEGORIES } from '../config/temperatureConfig';

const TemperatureMonitor = ({
    temperature = 36.5,
    timestamp = new Date(),
    showFahrenheit = true
}) => {
    const category = getTemperatureCategory(temperature);
    const fahrenheit = celsiusToFahrenheit(temperature);

    // Icon mapping
    const iconMap = {
        'Snowflake': Snowflake,
        'Wind': Wind,
        'CheckCircle': CheckCircle,
        'ThermometerSun': ThermometerSun,
        'Flame': Flame,
    };

    const CategoryIcon = iconMap[category.icon] || Thermometer;

    const formatTime = (date) => {
        return new Date(date).toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Animated thermometer fill
    const tempPercentage = Math.min(Math.max((temperature - 34) / 8 * 100, 0), 100);

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${category.bgColor} bg-opacity-10`}>
                        <Thermometer className={`w-6 h-6 ${category.textColor}`} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">Suhu Tubuh</h3>
                        <p className="text-sm text-gray-500">Body Temperature</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-xs text-gray-500">Terakhir diukur</p>
                    <p className="text-sm font-semibold text-gray-700">{formatTime(timestamp)}</p>
                </div>
            </div>

            {/* Main Reading */}
            <div className="flex items-center justify-between mb-6">
                {/* Temperature Display */}
                <div className="flex-1">
                    <div className="flex items-baseline gap-2 mb-2">
                        <span className={`text-6xl font-bold ${category.textColor}`}>
                            {temperature.toFixed(1)}
                        </span>
                        <span className="text-2xl text-gray-500">°C</span>
                    </div>
                    {showFahrenheit && (
                        <p className="text-sm text-gray-600">
                            {fahrenheit.toFixed(1)}°F
                        </p>
                    )}
                </div>

                {/* Visual Thermometer */}
                <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-40 bg-gray-200 rounded-full overflow-hidden relative">
                        <div
                            className={`absolute bottom-0 w-full ${category.bgColor} transition-all duration-500`}
                            style={{ height: `${tempPercentage}%` }}
                        >
                            <div className="absolute inset-0 animate-pulse-slow opacity-50"></div>
                        </div>
                    </div>
                    <div className="w-12 h-12 rounded-full border-4 border-gray-200 flex items-center justify-center"
                        style={{ borderColor: category.color }}>
                        <div className={`w-8 h-8 rounded-full ${category.bgColor}`}></div>
                    </div>
                </div>
            </div>

            {/* Category Badge */}
            <div className="mb-6">
                <div
                    className="px-4 py-2 rounded-xl text-white flex items-center gap-2 w-fit text-lg font-semibold"
                    style={{ backgroundColor: category.color }}
                >
                    <CategoryIcon className="w-6 h-6" />
                    <span>{category.label}</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">{category.description}</p>
            </div>

            {/* Temperature Range Reference */}
            <div className="space-y-2 mb-6">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Referensi Suhu
                </p>
                {Object.values(TEMP_CATEGORIES).map((cat) => (
                    <div
                        key={cat.id}
                        className={`flex items-center justify-between p-2 rounded-lg transition-all ${cat.id === category.id
                                ? `${cat.bgColor} bg-opacity-10 border-2 ${cat.borderColor}`
                                : 'bg-gray-50 border-2 border-transparent'
                            }`}
                    >
                        <div className="flex items-center gap-2">
                            <span className="text-sm">{cat.icon}</span>
                            <span className={`text-sm font-medium ${cat.id === category.id ? cat.textColor : 'text-gray-600'
                                }`}>
                                {cat.label}
                            </span>
                        </div>
                        <span className="text-xs text-gray-500">
                            {cat.range.min === 0 ? '<' : cat.range.max === 999 ? '>' : ''}
                            {cat.range.min === 0 ? cat.range.max : cat.range.max === 999 ? cat.range.min : `${cat.range.min}-${cat.range.max}`}°C
                        </span>
                    </div>
                ))}
            </div>

            {/* Trend Indicator (Mock) */}
            <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Tren 24 jam</span>
                    <div className="flex items-center gap-1">
                        {temperature >= 37 ? (
                            <>
                                <TrendingUp className="w-4 h-4 text-red-500" />
                                <span className="text-sm font-semibold text-red-500">+0.3°C</span>
                            </>
                        ) : (
                            <>
                                <TrendingDown className="w-4 h-4 text-green-500" />
                                <span className="text-sm font-semibold text-green-500">Stabil</span>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Recommendations */}
            {category.severity !== 'normal' && (
                <div className={`p-4 rounded-lg border-l-4 ${category.severity === 'critical' || category.severity === 'high'
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
                            ? 'Demam tinggi terdeteksi. Minum banyak air, istirahat, dan konsultasi dokter.'
                            : category.severity === 'elevated'
                                ? 'Suhu sedikit meningkat. Monitor kondisi dan istirahat yang cukup.'
                                : category.severity === 'critical'
                                    ? 'Suhu tubuh sangat rendah. Segera cari bantuan medis dan hangatkan tubuh.'
                                    : 'Suhu tubuh rendah. Hangatkan tubuh dan monitor kondisi.'}
                    </p>
                </div>
            )}
        </div>
    );
};

export default TemperatureMonitor;
