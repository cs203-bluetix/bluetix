import axios from "axios";
import { SERVER_API_URL } from "./globals";

const instance = axios.create({
  baseURL: SERVER_API_URL,
  timeout: 5000,
  headers: {
    // 'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`,
    // "Content-Type": "application/json",
  },
});

// Request interceptor
instance.interceptors.request.use((config) => {
  // You can modify the request config here
  return config;
});

// Response interceptor
instance.interceptors.response.use((response) => {
  // You can modify the response data here
  return response;
});

export default instance;
