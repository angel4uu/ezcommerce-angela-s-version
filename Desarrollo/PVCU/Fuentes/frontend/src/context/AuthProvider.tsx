import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {jwtDecode} from "jwt-decode";  
import axios from "axios";
import { baseURL } from "../api/api";

interface DecodedToken {
    user_id: number;
}
interface Tokens {
    access: string;
    refresh: string;
}
interface AuthState {
    accessToken: string | null;
    userId: number | null;
}
interface AuthContextType {
    authState: AuthState;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [authState, setAuthState] = useState<AuthState>(() => {
        const tokens: Tokens | null = JSON.parse(localStorage.getItem("tokens") || "null");
        if (tokens) {
            const { access } = tokens;
            const decodedToken: DecodedToken = jwtDecode(access);
            return { accessToken: access, userId: decodedToken.user_id };
        }
        return { accessToken: null, userId: null };
    });

    useEffect(() => {
        //Refreash access token if refresh token 
        refreshAccessToken();
        //Initialize request interceptor with authorization if tokens
        initializeRequestInterceptor();
        //Refresh access token if 401 error in response
        initializeResponseInterceptor();
    }, []);

    const initializeRequestInterceptor = () => {
        axios.interceptors.request.use((config) => {
            const tokens: Tokens | null = JSON.parse(localStorage.getItem("tokens") || "null");
            if (tokens?.access) {
                config.headers.Authorization = `Bearer ${tokens.access}`;
            }
            return config;
        });
    };

    const initializeResponseInterceptor = () => {
        axios.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;
                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    const newTokens = await refreshAccessToken();
                    if (newTokens) {
                        originalRequest.headers.Authorization = `Bearer ${newTokens.access}`;
                        console.log("401 so access token refreshed");
                        return axios(originalRequest);
                    }
                }
                return Promise.reject(error);
            }
        );
    };

    const refreshAccessToken = async (): Promise<Tokens | null> => {
        const tokens: Tokens | null = JSON.parse(localStorage.getItem("tokens") || "null");
        if (tokens?.refresh) {
            try {
                const response = await axios.post(`${baseURL}/token/refresh/`, {
                    refresh: tokens.refresh,
                });
                const newTokens = { ...tokens, access: response.data.access };
                setTokens(newTokens);
                const decodedToken: DecodedToken = jwtDecode(newTokens.access);
                setAuthState({ userId: decodedToken.user_id, accessToken: newTokens.access });
                console.log("New access token refreshed");
                return newTokens;
            } catch (error) {
                console.error("Error refreshing access token:", error);
                logout();
                return null;
            }
        } else {
            console.log("No refresh token set to refresh");
            return null;
        }
    };

    const login = async (username: string, password: string): Promise<void> => {
        try {
            const response = await axios.post(`${baseURL}/token/`, { username, password });
            const tokens: Tokens = { access: response.data.access, refresh: response.data.refresh };
            const decodedToken: DecodedToken = jwtDecode(tokens.access);
            setAuthState({ accessToken: tokens.access, userId: decodedToken.user_id });
            setTokens(tokens);
        } catch (error) {
            console.error("Login error:", error);
            throw new Error("Login failed");
        }
    };

    const logout = (): void => {
        setAuthState({ userId: null, accessToken: null });
        localStorage.removeItem("tokens");
    };

    const setTokens = (tokens: Tokens): void => {
        localStorage.setItem("tokens", JSON.stringify(tokens));
    };

    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for using the AuthContext
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};