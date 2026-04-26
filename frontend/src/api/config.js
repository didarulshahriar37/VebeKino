const RAW_API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_BASE_URL = RAW_API_BASE_URL.replace(/\/+$/, '');

export default API_BASE_URL;
