// Configuration file for TravelInsight
const API_URL = 'http://localhost:5000/api';

// Enable debug mode
const DEBUG = true;

// Debug logger
function debugLog(...args) {
    if (DEBUG) {
        console.log('[DEBUG]', ...args);
    }
}

// Add this to your config.js file
function logApiRequest(method, url, data = null) {
    if (DEBUG) {
        console.log(`[API ${method}]`, url, data ? data : '');
    }
} 