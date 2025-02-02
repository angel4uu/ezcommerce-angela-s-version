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
          await userActivationService.activateUser({ uid, token });
          toast.success("Su cuenta ha sido activada con éxito");
          navigate("/login");
        } catch (error) {
          console.log(error);
          toast.error("Ha ocurrido un error al activar su cuenta");
          navigate("/");
        }
      } else {
        navigate("/");
      }
    };

    activateUser();
  }, []);

  return <div>Activando cuenta...</div>;
};
