import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.0.84:3333/'
});

export default api;