/**
 * SAVIOR - Health Metrics Chart Component
 * 
 * Komponen untuk menampilkan grafik trend data kesehatan
 * Mendukung: Blood Pressure, Stress Level, Heart Rate, dan Temperature
 * 
 * Props:
 * - data: Array - Data historis untuk ditampilkan
 * - type: string - Tipe chart ('bp', 'stress', 'heartrate', 'temperature')
 * - timeRange: string - Range waktu ('24h', '7d', '30d')
 */

import React, { useState } from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Calendar } from 'lucide-react';

const HealthChart = ({
    data = [],
    type = 'bp',
    timeRange = '24h',
    onTimeRangeChange
}) => {
    const [selectedRange, setSelectedRange] = useState(timeRange);

    const timeRanges = [
        { value: '24h', label: '24 Jam' },
        { value: '7d', label: '7 Hari' },
        { value: '30d', label: '30 Hari' }
    ];

    const handleRangeChange = (range) => {
        setSelectedRange(range);
        if (onTimeRangeChange) {
            onTimeRangeChange(range);
        }
    };

    const formatXAxis = (timestamp) => {
        const date = new Date(timestamp);
        if (selectedRange === '24h') {
            return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
        }
        return date.toLocaleDateString('id-ID', { month: 'short', day: 'numeric' });
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const getUnit = () => {
                switch (type) {
                    case 'bp': return ' mmHg';
                    case 'stress': return '%';
                    case 'heartrate': return ' bpm';
                    case 'temperature': return '°C';
                    default: return '';
                }
            };

            return (
                <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
                    <p className="text-sm font-semibold text-gray-700 mb-2">
                        {new Date(label).toLocaleString('id-ID')}
                    </p>
                    {payload.map((entry, index) => (
                        <p key={index} className="text-sm" style={{ color: entry.color }}>
                            {entry.name}: <span className="font-bold">{entry.value}</span>
                            {getUnit()}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="card">
            {/* Header */}
            <div className="card-header">
                <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-primary-100">
                        <TrendingUp className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                        <h3 className="card-title">
                            {type === 'bp' && 'Trend Tekanan Darah'}
                            {type === 'stress' && 'Trend Tingkat Stress'}
                            {type === 'heartrate' && 'Trend Detak Jantung'}
                            {type === 'temperature' && 'Trend Suhu Tubuh'}
                        </h3>
                        <p className="text-sm text-gray-500">Data historis {selectedRange === '24h' ? '24 jam terakhir' : selectedRange === '7d' ? '7 hari terakhir' : '30 hari terakhir'}</p>
                    </div>
                </div>

                {/* Time Range Selector */}
                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    {timeRanges.map((range) => (
                        <button
                            key={range.value}
                            onClick={() => handleRangeChange(range.value)}
                            className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${selectedRange === range.value
                                ? 'bg-primary-600 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            {range.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Chart */}
            <div className="mt-4">
                {data.length === 0 ? (
                    <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">Belum ada data untuk ditampilkan</p>
                    </div>
                ) : type === 'bp' ? (
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis
                                dataKey="timestamp"
                                tickFormatter={formatXAxis}
                                stroke="#6b7280"
                                style={{ fontSize: '12px' }}
                            />
                            <YAxis
                                stroke="#6b7280"
                                style={{ fontSize: '12px' }}
                                label={{ value: 'mmHg', angle: -90, position: 'insideLeft' }}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="systolic"
                                stroke="#ef4444"
                                strokeWidth={2}
                                dot={{ r: 4 }}
                                activeDot={{ r: 6 }}
                                name="Sistol"
                            />
                            <Line
                                type="monotone"
                                dataKey="diastolic"
                                stroke="#3b82f6"
                                strokeWidth={2}
                                dot={{ r: 4 }}
                                activeDot={{ r: 6 }}
                                name="Diastol"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                ) : type === 'heartrate' ? (
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorHeartRate" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.1} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis
                                dataKey="timestamp"
                                tickFormatter={formatXAxis}
                                stroke="#6b7280"
                                style={{ fontSize: '12px' }}
                            />
                            <YAxis
                                stroke="#6b7280"
                                style={{ fontSize: '12px' }}
                                domain={[40, 200]}
                                label={{ value: 'bpm', angle: -90, position: 'insideLeft' }}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Area
                                type="monotone"
                                dataKey="heartRate"
                                stroke="#f43f5e"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorHeartRate)"
                                name="Detak Jantung"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                ) : type === 'temperature' ? (
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis
                                dataKey="timestamp"
                                tickFormatter={formatXAxis}
                                stroke="#6b7280"
                                style={{ fontSize: '12px' }}
                            />
                            <YAxis
                                stroke="#6b7280"
                                style={{ fontSize: '12px' }}
                                domain={[34, 40]}
                                label={{ value: '°C', angle: -90, position: 'insideLeft' }}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="temperature"
                                stroke="#f59e0b"
                                strokeWidth={2}
                                dot={{ r: 4 }}
                                activeDot={{ r: 6 }}
                                name="Suhu Tubuh"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                ) : (
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorStress" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis
                                dataKey="timestamp"
                                tickFormatter={formatXAxis}
                                stroke="#6b7280"
                                style={{ fontSize: '12px' }}
                            />
                            <YAxis
                                stroke="#6b7280"
                                style={{ fontSize: '12px' }}
                                domain={[0, 100]}
                                label={{ value: 'Stress Level (%)', angle: -90, position: 'insideLeft' }}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Area
                                type="monotone"
                                dataKey="stressValue"
                                stroke="#8b5cf6"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorStress)"
                                name="Tingkat Stress"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
};

export default HealthChart;
