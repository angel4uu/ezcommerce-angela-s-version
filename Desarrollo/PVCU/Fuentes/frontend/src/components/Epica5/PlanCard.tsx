import { Button } from "../ui/button";
import { CircleCheck } from "lucide-react";

interface PlanCardProps {
  tipo: string;
  duracion: string;
  precio: number;
  descripcion: string;
  beneficios: string[];
}

export const PlanCard = ({
  tipo,
  duracion,
  precio,
  descripcion,
  beneficios,
}: PlanCardProps) => {
  return (
    <div className=" border-secondaryLight border-2 bg-secondaryLightMoreOpacity rounded-2xl text-sm w-1/2 md:w-1/3 p-5 flex flex-col justify-start ">
      <h3 className="font-bold text-xl">Plan {tipo}</h3>
      <p className="pt-5">
        <span className="text-secondaryLight text-2xl font-black ">
          S/{precio}.00
        </span>
        {duracion!="ilimitado"?<span className="text-xs ml-1">por {duracion}</span>:""}
      </p>
      <p className="pt-5 md:px-5">{descripcion}</p>
      <div className="text-start pt-5 pb-5">
        <p className="font-semibold text-base">Beneficios:</p>
        <ul>
          {beneficios.map((beneficio, index) => (
            <li key={index} className="pt-3 flex items-center gap-2">
              <CircleCheck size={13} color="green" />
              <div>{beneficio}</div>
            </li>
          ))}
        </ul>
      </div>
      <Button className="bg-secondaryLight hover:bg-secondaryLightHovered text-sm mt-auto rounded-xl">
        Seleccionar plan
      </Button>
    </div>
  );
};
