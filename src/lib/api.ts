// src/lib/api.ts
import axios from "axios";

/**
 * Axios instance for GitPulse backend API communication.
 * Automatically handles:
 * - Base URL (from .env)
 * - Cookie-based authentication (withCredentials)
 * - JSON headers and error propagation
 */

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
  withCredentials: true, // 🔑 Allows cookies (for JWT sessions)
  headers: {
    "Content-Type": "application/json",
  },
});

// ==============================================
// Global Interceptors (Optional but Recommended)
// ==============================================

// 🧠 Log every request in dev mode (helps debugging)
if (import.meta.env.DEV) {
  api.interceptors.request.use((config) => {
    console.log("➡️ [API Request]:", config.method?.toUpperCase(), config.url, config.data || "");
    return config;
  });
}

// 🚨 Handle API errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;

    if (status === 401) {
      console.warn("⚠️ Unauthorized - User may need to log in again");
    }

    if (import.meta.env.DEV) {
      console.error("❌ [API Error]:", status, message);
    }

    return Promise.reject(error);
  }
);
