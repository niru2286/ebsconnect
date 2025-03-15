import axios from "axios";

const API_BASE_URL = "http://172.18.18.212/api"; // Change this to your actual API URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Fetch JWT token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message); 

    // Auto logout if token is expired
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login"; // Redirect to login page
    }

    return Promise.reject(error);
  }
);

// ✅ Define API Endpoints
const apiService = {  
    send: (data: any) => api.post("/db_op", data),
};

export default apiService;
