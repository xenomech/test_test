"use client";
import { STORAGE_KEYS } from "@/constants/keys";
import { refreshTokenApi } from "@/services/auth";
import {
  getLocalStorageItem,
  setLocalStorageItem,
  removeLocalStorageItem,
} from "@workspace/utils/storage";
import axios, {
  AxiosResponse,
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";
import { BASE_URL } from "@/constants/urls";

interface RetryConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

interface QueueItem {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}

let failedQueue: QueueItem[] = [];
let isRefreshing = false;

const processQueue = (error: Error | null): void => {
  failedQueue.forEach((request) => {
    if (error) {
      request.reject(error);
    } else {
      request.resolve();
    }
  });
  failedQueue = [];
};

export const resetAuthHeaders = () => {
  removeLocalStorageItem(STORAGE_KEYS.ACCESS_TOKEN);
  removeLocalStorageItem(STORAGE_KEYS.REFRESH_TOKEN);
  delete axios.defaults.headers.common.Authorization;
};

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || BASE_URL,
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = getLocalStorageItem(STORAGE_KEYS.ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => Promise.reject(error),
);

api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  async (error: AxiosError): Promise<unknown> => {
    const originalRequest = error.config as RetryConfig;
    const isAuthError = error.response?.status === 401;

    if (isAuthError && originalRequest?.url?.includes("refresh")) {
      if (typeof window !== "undefined") {
        window.location.href = "/auth/login";
      }
      return Promise.reject(error);
    }

    if (isAuthError && !originalRequest?._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = getLocalStorageItem(STORAGE_KEYS.REFRESH_TOKEN);

      if (!refreshToken) {
        if (typeof window !== "undefined") {
          window.location.href = "/auth/login";
        }
        return Promise.reject(error);
      }

      try {
        const response = await refreshTokenApi(refreshToken);
        const { access, refresh } = response.data;

        setLocalStorageItem(STORAGE_KEYS.ACCESS_TOKEN, access);
        setLocalStorageItem(STORAGE_KEYS.REFRESH_TOKEN, refresh);
        api.defaults.headers.common.Authorization = `Bearer ${access}`;

        processQueue(null);
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as Error);
        resetAuthHeaders();
        if (typeof window !== "undefined") {
          window.location.href = "/auth/login";
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;
