/**
 * SAVIOR - Device Status Component
 * 
 * Komponen untuk menampilkan status koneksi smartwatch
 * 
 * Props:
 * - isConnected: boolean - Status koneksi
 * - batteryLevel: number - Level baterai (0-100)
 * - lastSync: Date - Waktu sinkronisasi terakhir
 * - deviceName: string - Nama perangkat
 */

import React from 'react';
import { Watch, Wifi, WifiOff, Battery, BatteryLow, BatteryMedium, BatteryFull, RefreshCw } from 'lucide-react';

const DeviceStatus = ({
    isConnected = true,
    batteryLevel = 85,
    lastSync = new Date(),
    deviceName = 'SAVIOR Watch',
    onSync
}) => {
    const getBatteryIcon = () => {
        if (batteryLevel < 20) return BatteryLow;
        if (batteryLevel < 50) return BatteryMedium;
        return BatteryFull;
    };

    const BatteryIcon = getBatteryIcon();

    const formatLastSync = (date) => {
        const now = new Date();
        const diff = Math.floor((now - new Date(date)) / 1000); // seconds

        if (diff < 60) return `${diff} detik yang lalu`;
        if (diff < 3600) return `${Math.floor(diff / 60)} menit yang lalu`;
        if (diff < 86400) return `${Math.floor(diff / 3600)} jam yang lalu`;
        return new Date(date).toLocaleString('id-ID');
    };

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                {/* Device Info */}
                <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${isConnected ? 'bg-green-100' : 'bg-gray-100'}`}>
                        <Watch className={`w-6 h-6 ${isConnected ? 'text-green-600' : 'text-gray-400'}`} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-800">{deviceName}</h3>
                        <div className="flex items-center gap-2 mt-1">
                            {isConnected ? (
                                <>
                                    <Wifi className="w-4 h-4 text-green-600" />
                                    <span className="text-sm text-green-600 font-medium">Terhubung</span>
                                </>
                            ) : (
                                <>
                                    <WifiOff className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm text-gray-400 font-medium">Terputus</span>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Battery & Sync */}
                <div className="flex items-center gap-6">
                    {/* Battery */}
                    <div className="flex items-center gap-2">
                        <BatteryIcon className={`w-5 h-5 ${batteryLevel < 20 ? 'text-red-600' :
                                batteryLevel < 50 ? 'text-yellow-600' :
                                    'text-green-600'
                            }`} />
                        <span className="text-sm font-semibold text-gray-700">{batteryLevel}%</span>
                    </div>

                    {/* Sync Info */}
                    <div className="text-right">
                        <p className="text-xs text-gray-500">Sinkronisasi terakhir</p>
                        <p className="text-sm font-medium text-gray-700">{formatLastSync(lastSync)}</p>
                    </div>

                    {/* Sync Button */}
                    {onSync && (
                        <button
                            onClick={onSync}
                            disabled={!isConnected}
                            className={`p-2 rounded-lg transition-all ${isConnected
                                    ? 'bg-primary-600 text-white hover:bg-primary-700 active:scale-95'
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                }`}
                            aria-label="Sinkronisasi data"
                        >
                            <RefreshCw className="w-5 h-5" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DeviceStatus;
