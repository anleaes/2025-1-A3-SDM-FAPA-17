// app/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.191:8000',
});

export default api;
