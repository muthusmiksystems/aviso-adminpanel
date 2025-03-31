import axios from "axios";
const baseUrl = 'http://127.0.0.1:3210/api'

// Create an Axios instance with default options
const axiosInstance = axios.create({
    baseURL: baseUrl,
    // withCredentials: true, // Uncomment if you need to send credentials with requests
});

export default axiosInstance;
