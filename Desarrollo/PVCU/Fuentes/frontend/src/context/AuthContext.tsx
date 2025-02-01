import { createContext, useEffect, useState, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
const baseURL = import.meta.env.VITE_API_URL;
console.log(baseURL);

export interface AuthContextType {
  authId: number | null;
  loginModal: boolean;
  setLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}
export type DecodedToken = {
  user_id: number;
}

export const AuthContext = createContext<AuthContextType >({
  authId: null,
  loginModal: false,
  setLoginModal: () => {},
  login: async () => {},
  logout: () => {},
});
export let refreshAccessToken: () => Promise<string | null>;
export let logout: () => void;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authId, setAuthId] = useState<number | null>(null);
  const [loginModal, setLoginModal] = useState<boolean>(false);

  useEffect(() => {
    refreshAccessToken();

  }, []);

  refreshAccessToken = async (): Promise<string | null> => {
    try {
      const response = await axios.post(`${baseURL}/api/token/refresh/`, {}, { withCredentials: true });
      const decodedToken: DecodedToken = jwtDecode(response.data.access);
      setAuthId(decodedToken.user_id);
      localStorage.setItem("access_token", response.data.access);
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
      setAuthId(decodedToken.user_id);
      localStorage.setItem("access_token", response.data.access);
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Login failed");
    }
  };

  logout = (): void => {
    setAuthId(null);
    localStorage.removeItem("access_token");
  };

  return (
    <AuthContext.Provider
      value={{ authId, loginModal, setLoginModal, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
