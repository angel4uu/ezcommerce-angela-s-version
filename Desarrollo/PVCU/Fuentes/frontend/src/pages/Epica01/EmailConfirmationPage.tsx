import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { userActivationService } from "@/api/apiUsuarios";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const EmailConfirmationPage = () => {
  const { uid, token } = useParams<{ uid: string; token: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const activateUser = async () => {
      if (uid && token) {
        try {
          const response = await userActivationService.activateUser({ uid, token });
          toast.success(response.data.detail);
          navigate("/login");
        } catch (error) {
          console.log(error);
          if (error instanceof AxiosError) {
            if (error.response?.status === 400) {
              toast.error("Link de activación inválido");
            } else {
              toast.error("Ha ocurrido un error inesperado");
            }
          } else {
            toast.error("Ha ocurrido un error inesperado");
          }
          navigate("/");
        }
      } else {
        navigate("/");
      }
    };

    activateUser();
  }, [uid, token, navigate]);

  return <div>Activando cuenta...</div>;
};
