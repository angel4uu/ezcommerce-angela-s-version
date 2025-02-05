import { logout, refreshAccessToken } from "@/providers/AuthContext";
import axios, { AxiosInstance } from "axios";
import { toast } from "sonner";

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
  constructor(baseURL: string) {
    super(baseURL);
    this.addInterceptors();
  }

  addInterceptors() {
    this.instance.interceptors.request.use((config) => {
      const access_token = localStorage.getItem("access_token");
      if (access_token) {
        config.headers.Authorization = `Bearer ${access_token}`;
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
              originalRequest.headers.Authorization = `Bearer ${access}`;
              return this.instance(originalRequest);
            }
          } catch (refreshError) {
            console.error("Error refreshing token:", refreshError);
            logout();
          }
        }

        if (error.response) {
          const { status, data } = error.response;

          if (status >= 500) {
            toast.error("Error del servidor. Por favor, inténtalo de nuevo más tarde.");
          }
          else if (status >= 400) {
            const errorMessages =
              typeof data === "object" ? Object.values(data) : [String(data)];
            errorMessages.forEach((msg) => toast.error(String(msg)));
          }
        }
        
        return Promise.reject(error);
      }

      
    );
  }
}