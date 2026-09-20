// runtime-config.js permite cambiar el backend en Hostinger sin recompilar Angular.
export const API_BASE_URL = window.__PEDIDOS360_CONFIG__?.apiUrl?.replace(/\/$/, '')
  ?? 'http://localhost:3000/api/v1';

