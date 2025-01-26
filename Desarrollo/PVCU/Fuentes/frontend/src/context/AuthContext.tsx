import { createContext, useEffect, useState, ReactNode } from "react";
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import { AuthState,  DecodedToken } from "@/types/types";
import { baseURL } from "@/api/api";

export interface AuthContextType {
  authState: AuthState;
  loginModal: boolean;
  setLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
export let refreshAccessToken: () => Promise<string | null>;
export let logout: () => void;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({ userId: null, accessToken: null });
  const [loginModal, setLoginModal] = useState<boolean>(false);

  useEffect(() => {
    refreshAccessToken();
  }, []);

  refreshAccessToken = async (): Promise<string | null> => {
    try {
      const response = await axios.post(`${baseURL}/api/token/refresh/`, {}, { withCredentials: true });
      const decodedToken: DecodedToken = jwtDecode(response.data.access);
      setAuthState({
        userId: decodedToken.user_id,
        accessToken: response.data.access,
      });
      console.log("Access token refreshed :)");
      return response.data.access;
    } catch (error) {
      console.error("Error refreshing access token:", error);
      logout();
      return null;
    }
  };

  const login = async (username: string, password: string): Promise<void> => {
    try {
      const response = await axios.post(`${baseURL}/api/token/`, {
        username,
        password,
      }, { withCredentials: true });
      const decodedToken: DecodedToken = jwtDecode(response.data.access);
      setAuthState({
        accessToken: response.data.access,
        userId: decodedToken.user_id,
      });
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Login failed");
    }
  };

  logout = (): void => {
    setAuthState({ userId: null, accessToken: null });
  };

  return (
    <AuthContext.Provider
      value={{ authState, loginModal, setLoginModal, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
