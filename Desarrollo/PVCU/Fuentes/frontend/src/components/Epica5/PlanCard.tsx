import { useTrademark } from "@/hooks/useTrademark";
import { Button } from "../ui/button";
import { CircleCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Plan } from "@/types";
import { toast } from "sonner";

interface PlanCardProps {
  planObj: Plan;
}

export const PlanCard = ({ planObj }: PlanCardProps) => {
  const navigate = useNavigate();
  const { marca, plan, setGratisModal, setPlanSeleccionado } = useTrademark();

  function handleSeleccionarPlan() {
    if (planObj.tipo === "marcas" && marca) {
      setPlanSeleccionado(planObj);
      navigate("/pay-plan");
      toast.info("Usted cuenta con una marca previamente registrada");
    } else if (planObj.tipo === "marcas" && !marca) {
      setPlanSeleccionado(planObj);
      navigate("/register-trademark");
    } else {
      setGratisModal(true);
    }
  }

  return (
    <div className="border-secondaryLight border-2 bg-secondaryLightMoreOpacity rounded-2xl text-sm  p-5 flex flex-col justify-start w-3/4 gap-36">
      <div className="flex flex-col">
        <h3 className="font-bold text-xl capitalize">Plan {planObj.tipo}</h3>
        <p className="pt-5">
          <span className="text-secondaryLight text-2xl font-black ">
            S/{planObj.precio}.00
          </span>
          {planObj.duracion_meses ? (
            <span className="text-xs ml-1">
              por {planObj.duracion_meses}
              {planObj.duracion_meses == 1 ? " mes" : " meses"}
            </span>
          ) : (
            ""
          )}
        </p>
        <p className="pt-5 md:px-5">{planObj.descripcion}</p>
        <div className="text-start pt-5 pb-5">
          <p className="font-semibold text-base">Beneficios:</p>
          <ul>
            {planObj.beneficios?.map((beneficio, index) => (
              <li key={index} className="pt-3 flex items-center gap-2">
                <CircleCheck size={13} className="min-w-3" color="green" />
                <div>{beneficio}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Button
        className="bg-secondaryLight hover:bg-secondaryLightHovered text-sm rounded-xl mt-auto"
        disabled={plan?.tipo === "gratuito" && planObj.tipo === "gratuito"}
        onClick={handleSeleccionarPlan}
      >
        Seleccionar plan
      </Button>
    </div>
  );
};
