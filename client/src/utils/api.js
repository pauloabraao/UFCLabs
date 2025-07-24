import axios from 'axios';
import getCookie from './getCookies';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getCookie('token')}` // Incluindo o token do cookie no header
  }
});

export default api;