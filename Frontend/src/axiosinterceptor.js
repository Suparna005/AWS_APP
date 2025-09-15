import axios from "axios";

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: "/api/", // change if your backend runs on another port
});

// Add request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["token"] = token; // 👈 attach token to headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor (optional for error handling)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      alert("Session expired. Please login again.");
      localStorage.removeItem("token");
      window.location.href = "/login"; // 👈 redirect to login if unauthorized
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
