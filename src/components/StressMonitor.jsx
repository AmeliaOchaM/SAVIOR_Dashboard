/**
 * SAVIOR - Stress Level Monitor Component
 * 
 * Komponen modular untuk menampilkan monitoring tingkat stress
 * dengan 3 kategori: Stress, Baseline, Amusement
 * 
 * Props:
 * - stressLevel: string - Level stress ('stress', 'baseline', 'amusement')
 * - stressValue: number - Nilai stress (0-100)
 * - timestamp: Date - Waktu pengukuran
 * - hrv: number - Heart Rate Variability (ms)
 */

import React from 'react';
import { Brain, Waves, Zap, Activity, Frown, Smile, Laugh } from 'lucide-react';
import { getStressCategory, getStressCategoryByValue } from '../config/stressConfig';

const StressMonitor = ({
    stressLevel = 'baseline',
    stressValue = 50,
    timestamp = new Date(),
    hrv = 45,
    showDetails = true
}) => {
    // Determine category either from level or value
    const category = stressLevel
        ? getStressCategory(stressLevel)
        : getStressCategoryByValue(stressValue);

    // Icon mapping
    const iconMap = {
        'Frown': Frown,
        'Smile': Smile,
        'Laugh': Laugh,
    };

    const CategoryIcon = iconMap[category.icon] || Brain;

    const formatTime = (date) => {
        return new Date(date).toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Calculate stress percentage for visualization
    const getStressPercentage = () => {
        if (category.id === 'stress') return 85;
        if (category.id === 'amusement') return 20;
        return 50;
    };

    const stressPercentage = stressValue || getStressPercentage();

    return (
        <div className="card hover:shadow-xl transition-shadow duration-300">
            {/* Header */}
            <div className="card-header">
                <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${category.bgColor} bg-opacity-10`}>
                        <Brain className={`w-6 h-6 ${category.textColor}`} />
                    </div>
                    <div>
                        <h3 className="card-title">Tingkat Stress</h3>
                        <p className="text-sm text-gray-500">Stress Level Monitor</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-xs text-gray-500">Terakhir diukur</p>
                    <p className="text-sm font-semibold text-gray-700">{formatTime(timestamp)}</p>
                </div>
            </div>

            {/* Main Indicator */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-600">Status Saat Ini</span>
                    <span className={`text-3xl ${category.textColor} font-bold`}>
                        {Math.round(stressPercentage)}%
                    </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div
                        className={`h-full ${category.bgColor} transition-all duration-500 rounded-full relative`}
                        style={{ width: `${stressPercentage}%` }}
                    >
                        <div className="absolute inset-0 animate-pulse-slow opacity-50"></div>
                    </div>
                </div>
            </div>

            {/* Category Display */}
            <div className="mb-6">
                <div
                    className="badge text-white flex items-center gap-2 w-fit text-lg px-4 py-2 rounded-xl"
                    style={{ backgroundColor: category.color }}
                >
                    <CategoryIcon className="w-6 h-6" />
                    <span className="font-bold">{category.label}</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">{category.description}</p>
            </div>

            {/* HRV Display */}
            {showDetails && (
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Waves className="w-5 h-5 text-purple-600" />
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wide">HRV</p>
                                <p className="text-sm font-semibold text-gray-700">Heart Rate Variability</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-bold text-purple-600">{hrv}</p>
                            <p className="text-xs text-gray-500">ms</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Recommendation */}
            <div className={`px-5 py-4 rounded-lg border-l-4 ${category.id === 'stress'
                ? 'bg-red-50 border-red-500'
                : category.id === 'amusement'
                    ? 'bg-purple-50 border-purple-500'
                    : 'bg-green-50 border-green-500'
                }`}>
                <p className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    <span>Rekomendasi</span>
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">{category.recommendation}</p>
            </div>

            {/* Stress Level Guide */}
            {showDetails && (
                <div className="mt-6 space-y-3">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                        Panduan Tingkat Stress
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                        <div className={`px-3 py-4 rounded-lg text-center transition-all ${category.id === 'amusement'
                            ? 'bg-purple-100 border-2 border-purple-500'
                            : 'bg-gray-50'
                            }`}>
                            <Laugh className={`w-6 h-6 mx-auto mb-2 ${category.id === 'amusement' ? 'text-purple-700' : 'text-gray-400'}`} />
                            <p className={`text-xs font-semibold mb-1 ${category.id === 'amusement' ? 'text-purple-700' : 'text-gray-600'
                                }`}>
                                Rileks
                            </p>
                            <p className="text-xs text-gray-500 font-medium">0-30%</p>
                        </div>
                        <div className={`px-3 py-4 rounded-lg text-center transition-all ${category.id === 'baseline'
                            ? 'bg-green-100 border-2 border-green-500'
                            : 'bg-gray-50'
                            }`}>
                            <Smile className={`w-6 h-6 mx-auto mb-2 ${category.id === 'baseline' ? 'text-green-700' : 'text-gray-400'}`} />
                            <p className={`text-xs font-semibold mb-1 ${category.id === 'baseline' ? 'text-green-700' : 'text-gray-600'
                                }`}>
                                Normal
                            </p>
                            <p className="text-xs text-gray-500 font-medium">30-70%</p>
                        </div>
                        <div className={`px-3 py-4 rounded-lg text-center transition-all ${category.id === 'stress'
                            ? 'bg-red-100 border-2 border-red-500'
                            : 'bg-gray-50'
                            }`}>
                            <Frown className={`w-6 h-6 mx-auto mb-2 ${category.id === 'stress' ? 'text-red-700' : 'text-gray-400'}`} />
                            <p className={`text-xs font-semibold mb-1 ${category.id === 'stress' ? 'text-red-700' : 'text-gray-600'
                                }`}>
                                Stress
                            </p>
                            <p className="text-xs text-gray-500 font-medium">70-100%</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StressMonitor;
