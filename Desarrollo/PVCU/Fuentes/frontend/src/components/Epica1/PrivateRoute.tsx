import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { ReactNode } from "react";

interface PrivateRouteProps {
  children: ReactNode;
}

export const PrivateRoute = ({ children }:PrivateRouteProps) => {
  const { authId } = useAuth();

  return authId? (
    children
  ) : (
    <Navigate to={"/"}/>
  );
};

