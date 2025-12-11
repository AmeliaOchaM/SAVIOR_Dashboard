/**
 * SAVIOR - API Service
 *
 * Service untuk komunikasi dengan backend API dan IoT device
 * Saat ini menggunakan mock data, nantinya akan diintegrasikan dengan:
 * - REST API untuk data historis
 * - WebSocket/MQTT untuk real-time data dari smartwatch
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:8000/ws';

/**
 * Fetch current health data
 */
export const getCurrentHealthData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health/current`);
    if (!response.ok) throw new Error('Failed to fetch health data');
    return await response.json();
  } catch (error) {
    console.error('Error fetching health data:', error);
    throw error;
  }
};

/**
 * Fetch historical health data
 */
export const getHistoricalData = async (type, timeRange = '24h') => {
  try {
    const response = await fetch(`${API_BASE_URL}/health/history?type=${type}&range=${timeRange}`);
    if (!response.ok) throw new Error('Failed to fetch historical data');
    return await response.json();
  } catch (error) {
    console.error('Error fetching historical data:', error);
    throw error;
  }
};

/**
 * Fetch device status
 */
export const getDeviceStatus = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/device/status`);
    if (!response.ok) throw new Error('Failed to fetch device status');
    return await response.json();
  } catch (error) {
    console.error('Error fetching device status:', error);
    throw error;
  }
};

/**
 * Sync data with device
 */
export const syncDevice = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/device/sync`, {
      method: 'POST',
    });
    if (!response.ok) throw new Error('Failed to sync device');
    return await response.json();
  } catch (error) {
    console.error('Error syncing device:', error);
    throw error;
  }
};

/**
 * WebSocket connection for real-time updates
 */
export class HealthDataStream {
  constructor() {
    this.ws = null;
    this.listeners = {
      bloodPressure: [],
      stress: [],
      device: [],
      error: [],
    };
  }

  connect() {
    try {
      this.ws = new WebSocket(WS_URL);

      this.ws.onopen = () => {
        console.log('WebSocket connected');
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.notifyListeners(data.type, data.payload);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.notifyListeners('error', error);
      };

      this.ws.onclose = () => {
        console.log('WebSocket disconnected');
        // Attempt reconnect after 5 seconds
        setTimeout(() => this.connect(), 5000);
      };
    } catch (error) {
      console.error('Error connecting WebSocket:', error);
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  on(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event].push(callback);
    }
  }

  off(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter((cb) => cb !== callback);
    }
  }

  notifyListeners(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((callback) => callback(data));
    }
  }
}

export default {
  getCurrentHealthData,
  getHistoricalData,
  getDeviceStatus,
  syncDevice,
  HealthDataStream,
};
