// API URL from environment variables
export const API_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://youvative-backend.onrender.com/api";

// Authentication constants
export const AUTH_TOKEN_KEY = "authToken";
export const AUTH_EXPIRY = 3600; // 1 hour in seconds

// Admin credentials
export const ADMIN_EMAIL =
  import.meta.env.VITE_ADMIN_EMAIL || "admin@example.com";

// Feature flags
export const ENABLE_ANALYTICS =
  import.meta.env.VITE_ENABLE_ANALYTICS === "true";
export const ENABLE_MOCK_API = import.meta.env.VITE_ENABLE_MOCK_API === "true";
