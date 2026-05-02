import axios from 'axios';

const customAPI = axios.create({
    // Ye line khud hi .env se live link utha legi
    baseURL: import.meta.env.VITE_API_BASE_URL, 
});

// Agar aap JWT token use kar rahe hain to interceptor laga dein
customAPI.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default customAPI;