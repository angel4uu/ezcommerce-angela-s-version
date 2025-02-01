import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { userActivationService } from "@/api/apiUsuarios";
import { toast } from "sonner";

export const EmailConfirmationPage = () => {
  const { uid, token } = useParams<{ uid: string; token: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const activateUser = async () => {
      if (uid && token) {
        try {
          const response= await userActivationService.activateUser({uid, token});
          console.log(response);
          toast.success("Cuenta activada con éxito");
          navigate("/login");
        } catch (error) {
          console.log(error);
          toast.error("Error al activar la cuenta");
        }
      } else {
        navigate("/");
      }
    };

    activateUser();
  }, [uid, token]);

  return <div>Activando cuenta...</div>;
};
