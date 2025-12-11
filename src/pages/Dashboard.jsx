/**
 * SAVIOR - Main Dashboard Component
 * 
 * Komponen utama dashboard yang mengintegrasikan semua monitoring components
 * - Blood Pressure Monitor
 * - Stress Level Monitor
 * - Heart Rate Monitor
 * - Temperature Monitor
 * - Health Charts
 * - Alert System
 * - Device Status
 */

import React, { useState, useEffect } from 'react';
import { Activity, RefreshCw } from 'lucide-react';
import BloodPressureMonitor from '../components/BloodPressureMonitor';
import StressMonitor from '../components/StressMonitor';
import HeartRateMonitor from '../components/HeartRateMonitor';
import TemperatureMonitor from '../components/TemperatureMonitor';
import HealthChart from '../components/HealthChart';
import AlertSystem from '../components/AlertSystem';
import DeviceStatus from '../components/DeviceStatus';
import {
    generateBPData,
    generateStressData,
    generateHeartRateData,
    generateTemperatureData,
    generateHistoricalData,
    generateHeartRateHistory,
    generateTemperatureHistory,
    generateAlerts,
    getDeviceStatus as getMockDeviceStatus
} from '../services/mockDataService';

const Dashboard = () => {
    // State management
    const [bloodPressureData, setBloodPressureData] = useState(generateBPData());
    const [stressData, setStressData] = useState(generateStressData());
    const [heartRateData, setHeartRateData] = useState(generateHeartRateData());
    const [temperatureData, setTemperatureData] = useState(generateTemperatureData());
    const [deviceStatus, setDeviceStatus] = useState(getMockDeviceStatus());
    const [alerts, setAlerts] = useState([]);
    const [bpHistoricalData, setBpHistoricalData] = useState([]);
    const [stressHistoricalData, setStressHistoricalData] = useState([]);
    const [hrHistoricalData, setHrHistoricalData] = useState([]);
    const [tempHistoricalData, setTempHistoricalData] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [bpTimeRange, setBpTimeRange] = useState('24h');
    const [stressTimeRange, setStressTimeRange] = useState('24h');
    const [hrTimeRange, setHrTimeRange] = useState('24h');
    const [tempTimeRange, setTempTimeRange] = useState('24h');

    // Initialize data on mount
    useEffect(() => {
        loadHistoricalData();
        updateAlerts();
    }, []);

    // Auto-refresh every 30 seconds (simulating real-time updates)
    useEffect(() => {
        const interval = setInterval(() => {
            refreshCurrentData();
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    const loadHistoricalData = () => {
        const hours = bpTimeRange === '24h' ? 24 : bpTimeRange === '7d' ? 168 : 720;
        setBpHistoricalData(generateHistoricalData('bp', hours));

        const stressHours = stressTimeRange === '24h' ? 24 : stressTimeRange === '7d' ? 168 : 720;
        setStressHistoricalData(generateHistoricalData('stress', stressHours));

        const hrHours = hrTimeRange === '24h' ? 24 : hrTimeRange === '7d' ? 168 : 720;
        setHrHistoricalData(generateHeartRateHistory(hrHours));

        const tempHours = tempTimeRange === '24h' ? 24 : tempTimeRange === '7d' ? 168 : 720;
        setTempHistoricalData(generateTemperatureHistory(tempHours));
    };

    const refreshCurrentData = () => {
        const newBpData = generateBPData();
        const newStressData = generateStressData();
        const newHrData = generateHeartRateData();
        const newTempData = generateTemperatureData();
        const newDeviceStatus = getMockDeviceStatus();

        setBloodPressureData(newBpData);
        setStressData(newStressData);
        setHeartRateData(newHrData);
        setTemperatureData(newTempData);
        setDeviceStatus(newDeviceStatus);
        updateAlerts(newBpData, newStressData, newTempData, newHrData);
    };

    const handleRefresh = async () => {
        setIsRefreshing(true);

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        refreshCurrentData();
        loadHistoricalData();

        setIsRefreshing(false);
    };

    const updateAlerts = (bpData = bloodPressureData, stData = stressData, tempData = temperatureData, hrData = heartRateData) => {
        const newAlerts = generateAlerts(bpData, stData, tempData, hrData);
        setAlerts(newAlerts);
    };

    const handleAlertDismiss = (alertId) => {
        setAlerts(alerts.filter(alert => alert.id !== alertId));
    };

    const handleBpTimeRangeChange = (range) => {
        setBpTimeRange(range);
        const hours = range === '24h' ? 24 : range === '7d' ? 168 : 720;
        setBpHistoricalData(generateHistoricalData('bp', hours));
    };

    const handleStressTimeRangeChange = (range) => {
        setStressTimeRange(range);
        const hours = range === '24h' ? 24 : range === '7d' ? 168 : 720;
        setStressHistoricalData(generateHistoricalData('stress', hours));
    };

    const handleHrTimeRangeChange = (range) => {
        setHrTimeRange(range);
        const hours = range === '24h' ? 24 : range === '7d' ? 168 : 720;
        setHrHistoricalData(generateHeartRateHistory(hours));
    };

    const handleTempTimeRangeChange = (range) => {
        setTempTimeRange(range);
        const hours = range === '24h' ? 24 : range === '7d' ? 168 : 720;
        setTempHistoricalData(generateTemperatureHistory(hours));
    };

    const handleDeviceSync = async () => {
        setIsRefreshing(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        const newDeviceStatus = getMockDeviceStatus();
        setDeviceStatus({ ...newDeviceStatus, lastSync: new Date() });
        refreshCurrentData();
        setIsRefreshing(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <header className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl">
                                <Activity className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800">
                                    SAVIOR Dashboard
                                </h1>
                                <p className="text-gray-600 mt-1">
                                    Smart Assistance VItal ORgan
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={handleRefresh}
                            disabled={isRefreshing}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${isRefreshing
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-primary-600 text-white hover:bg-primary-700 active:scale-95'
                                }`}
                        >
                            <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
                            {isRefreshing ? 'Memperbarui...' : 'Refresh Data'}
                        </button>
                    </div>
                </header>

                {/* Device Status */}
                <DeviceStatus
                    {...deviceStatus}
                    onSync={handleDeviceSync}
                />

                {/* Alerts */}
                {alerts.length > 0 && (
                    <AlertSystem
                        alerts={alerts}
                        onDismiss={handleAlertDismiss}
                    />
                )}

                {/* Current Metrics - 2x2 Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <BloodPressureMonitor
                        systolic={bloodPressureData.systolic}
                        diastolic={bloodPressureData.diastolic}
                        heartRate={bloodPressureData.heartRate}
                        timestamp={bloodPressureData.timestamp}
                    />

                    <StressMonitor
                        stressLevel={stressData.stressLevel}
                        stressValue={stressData.stressValue}
                        hrv={stressData.hrv}
                        timestamp={stressData.timestamp}
                    />

                    <HeartRateMonitor
                        heartRate={heartRateData.heartRate}
                        zone={heartRateData.zone}
                        timestamp={heartRateData.timestamp}
                        age={heartRateData.age}
                    />

                    <TemperatureMonitor
                        temperature={temperatureData.temperature}
                        timestamp={temperatureData.timestamp}
                    />
                </div>

                {/* Historical Data Charts */}
                <div className="grid grid-cols-1 gap-6">
                    <HealthChart
                        data={bpHistoricalData}
                        type="bp"
                        timeRange={bpTimeRange}
                        onTimeRangeChange={handleBpTimeRangeChange}
                    />

                    <HealthChart
                        data={stressHistoricalData}
                        type="stress"
                        timeRange={stressTimeRange}
                        onTimeRangeChange={handleStressTimeRangeChange}
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <HealthChart
                            data={hrHistoricalData}
                            type="heartrate"
                            timeRange={hrTimeRange}
                            onTimeRangeChange={handleHrTimeRangeChange}
                        />

                        <HealthChart
                            data={tempHistoricalData}
                            type="temperature"
                            timeRange={tempTimeRange}
                            onTimeRangeChange={handleTempTimeRangeChange}
                        />
                    </div>
                </div>

                {/* Footer */}
                <footer className="text-center py-6 text-gray-500 text-sm">
                    <p>© 2025 SAVIOR Project - Health Monitoring System</p>
                    <p className="mt-1">Developed with ❤️ for better health awareness</p>
                </footer>
            </div>
        </div>
    );
};

export default Dashboard;
