import axios from 'axios';

const api = axios.create({
    baseURL: "https://blog-website-5kcb.onrender.com/api", 
});

export default api;