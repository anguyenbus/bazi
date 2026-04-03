/**
 * API Configuration
 * Automatically detects environment and sets API base URL
 */

// Detect if running on production domain
const isProduction = window.location.hostname === 'huyencobattu.com' ||
    window.location.hostname === 'www.huyencobattu.com';

// API Base URL - adjust based on environment
// In production, API should be on the same domain or a specific API subdomain
const API_HOST = isProduction
    ? `${window.location.protocol}//${window.location.hostname}` // Same host, port 8888
    : 'http://localhost:8888';

// If you want to use a subdomain like api.huyencobattu.com, uncomment below:
// const API_HOST = isProduction 
//     ? 'https://api.huyencobattu.com'
//     : 'http://localhost:8888';

// Export API endpoints
export const API_CONFIG = {
    HOST: API_HOST,
    BASE_URL: `${API_HOST}/api`,
    AUTH: `${API_HOST}/api/auth`,
    CONSULTANT: `${API_HOST}/api/consultant`,
    ADMIN: `${API_HOST}/api/admin`,
    BAZI: `${API_HOST}/api/bazi`,
};

// For debugging
console.log('[API Config] Environment:', isProduction ? 'PRODUCTION' : 'DEVELOPMENT');
console.log('[API Config] API Host:', API_HOST);

export default API_CONFIG;
