import axios from 'axios';

// Creamos una instancia de axios con configuración base.
const api = axios.create({
  baseURL: 'http://localhost:5000', // URL base de nuestro backend
  headers: {
    'Content-Type': 'application/json',
  },
});

/*
  INTERCEPTOR DE PETICIONES (LA PARTE MÁS IMPORTANTE)
  
  Esto es como un "guardia de seguridad" que se ejecuta ANTES de que cada petición salga del frontend.
  Su trabajo es buscar el token en el localStorage y, si existe, añadirlo a los encabezados
  de la petición en 'x-auth-token'.
  
  Esto garantiza que CADA llamada al backend (a rutas protegidas) esté autenticada.
*/
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;