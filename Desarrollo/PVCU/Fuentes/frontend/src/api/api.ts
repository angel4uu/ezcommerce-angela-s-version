import { logout, refreshAccessToken } from "@/context/AuthContext";
import axios, { AxiosInstance } from "axios";
export const baseURL = "http://localhost:8000";

export class AxiosService {
  instance: AxiosInstance;

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      withCredentials: true,
    });
  }
}

export class AxiosProtectedService extends AxiosService {
  access_token: string | null = null;

  constructor(baseURL: string) {
    super(baseURL);
    this.addInterceptors();
  }

  addInterceptors() {
    this.instance.interceptors.request.use((config) => {
      if (this.access_token) {
        config.headers.Authorization = `Bearer ${this.access_token}`;
        console.log("request with auth header :)");
      }
      return config;
    });

    this.instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const access = await refreshAccessToken();
            if (access) {
              this.access_token = access;
              originalRequest.headers.Authorization = `Bearer ${this.access_token}`;
              return this.instance(originalRequest);
            }
          } catch (refreshError) {
            console.error("Error refreshing token:", refreshError);
            logout();
          }
        }

        return Promise.reject(error);
      }
    );
  }
}