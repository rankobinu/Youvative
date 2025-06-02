import axios from "axios";

// Create axios instance with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Add response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized errors (token expired)
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      // Clear token and redirect to login
      localStorage.removeItem("authToken");
      window.location.href = "/login";
      return Promise.reject(error);
    }

    // Handle other errors
    return Promise.reject(error);
  },
);

export default api;
