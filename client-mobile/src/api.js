import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
    baseURL: "http://21fd118e0c6c.ngrok.io"
});


api.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem("auth_token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
)

export default api;