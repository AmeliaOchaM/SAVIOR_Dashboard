/**
 * SAVIOR - Alert System Component
 * 
 * Komponen untuk menampilkan peringatan kesehatan
 * Otomatis mendeteksi kondisi abnormal dan memberikan notifikasi
 * 
 * Props:
 * - alerts: Array - Daftar peringatan
 * - onDismiss: Function - Callback saat alert ditutup
 * - maxDisplay: number - Maksimal alert yang ditampilkan
 */

import React, { useState } from 'react';
import { AlertTriangle, AlertCircle, Info, CheckCircle, X, Bell } from 'lucide-react';

const AlertSystem = ({
    alerts = [],
    onDismiss,
    maxDisplay = 5
}) => {
    const [dismissedAlerts, setDismissedAlerts] = useState([]);

    const alertIcons = {
        critical: AlertTriangle,
        warning: AlertCircle,
        info: Info,
        success: CheckCircle
    };

    const alertStyles = {
        critical: {
            bg: 'bg-red-50',
            border: 'border-red-500',
            text: 'text-red-800',
            icon: 'text-red-600'
        },
        warning: {
            bg: 'bg-yellow-50',
            border: 'border-yellow-500',
            text: 'text-yellow-800',
            icon: 'text-yellow-600'
        },
        info: {
            bg: 'bg-blue-50',
            border: 'border-blue-500',
            text: 'text-blue-800',
            icon: 'text-blue-600'
        },
        success: {
            bg: 'bg-green-50',
            border: 'border-green-500',
            text: 'text-green-800',
            icon: 'text-green-600'
        }
    };

    const handleDismiss = (alertId) => {
        setDismissedAlerts([...dismissedAlerts, alertId]);
        if (onDismiss) {
            onDismiss(alertId);
        }
    };

    const activeAlerts = alerts
        .filter(alert => !dismissedAlerts.includes(alert.id))
        .slice(0, maxDisplay);

    if (activeAlerts.length === 0) {
        return null;
    }

    return (
        <div className="space-y-3">
            {activeAlerts.map((alert) => {
                const Icon = alertIcons[alert.type] || AlertCircle;
                const style = alertStyles[alert.type] || alertStyles.info;

                return (
                    <div
                        key={alert.id}
                        className={`${style.bg} ${style.border} border-l-4 p-4 rounded-lg shadow-md animate-in slide-in-from-top transition-all`}
                    >
                        <div className="flex items-start gap-3">
                            <Icon className={`w-5 h-5 ${style.icon} flex-shrink-0 mt-0.5`} />
                            <div className="flex-1">
                                <h4 className={`font-semibold ${style.text} mb-1`}>
                                    {alert.title}
                                </h4>
                                <p className={`text-sm ${style.text} opacity-90`}>
                                    {alert.message}
                                </p>
                                {alert.timestamp && (
                                    <p className={`text-xs ${style.text} opacity-75 mt-2`}>
                                        {new Date(alert.timestamp).toLocaleString('id-ID')}
                                    </p>
                                )}
                            </div>
                            <button
                                onClick={() => handleDismiss(alert.id)}
                                className={`${style.text} opacity-50 hover:opacity-100 transition-opacity`}
                                aria-label="Tutup peringatan"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default AlertSystem;
