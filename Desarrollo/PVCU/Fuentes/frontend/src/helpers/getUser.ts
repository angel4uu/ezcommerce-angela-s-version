import { usuariosService } from "../api/apiUsuarios";
import { useAuth } from "@/hooks/useAuth";

export const LoadUsuarios = async (userId: number) => {
  const { authState } = useAuth();
  const access_token = authState.accessToken;
  const response = await usuariosService.getUsuarios(userId, access_token);
  return response.data;
};