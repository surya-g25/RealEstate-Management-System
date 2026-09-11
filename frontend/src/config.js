// Backend API Base URL
// In development, defaults to local server; in production, defaults to deployed API
const API_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD
    ? 'https://api.suryaworks.xyz'
    : 'http://localhost:8000');

export default API_URL;