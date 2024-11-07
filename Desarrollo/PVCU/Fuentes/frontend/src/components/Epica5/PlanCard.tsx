import { useTrademark } from "@/hooks/useTrademark";
import { Button } from "../ui/button";
import { CircleCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Plan } from "@/types";

  const infoPlans = [
    {
      descripcion: "Acceso a funcionalidades básicas.",
      beneficios: [
        "Publicar productos",
        "Comprar productos",
        "Carrito de compras",
        "Favoritos",
      ],
    },
    {
      descripcion:
        "Diseñado para universitarios que ya posean una marca, proporcionando funcionalidades avanzadas.",
      beneficios: [
        "Publicar productos",
        "Comprar productos",
        "Carrito de compras",
        "Favoritos",
        "Publicar anuncios",
        "Mayor publicidad de tus productos",
        "Sección especial de Marcas",
        "Productos con check de verificación",
      ],
    },
  ];

export const PlanCard = ({
  tipo,
  duracion,
  precio,
}: Plan) => {

  const navigate = useNavigate();
  const {marca,planActual}=useTrademark();

  function handleSeleccionarPlan(){
    if(tipo=="marcas"&&marca){
      navigate("/pay-plan");
    }
    else if(tipo=="marcas"&&!marca){
      navigate("/register-trademark");
    }
    else{
      //modal
    }
  }

  return (
    <div className=" border-secondaryLight border-2 bg-secondaryLightMoreOpacity rounded-2xl text-sm w-1/2 md:w-1/3 p-5 flex flex-col justify-start ">
      <h3 className="font-bold text-xl">Plan {tipo}</h3>
      <p className="pt-5">
        <span className="text-secondaryLight text-2xl font-black ">
          S/{precio}.00
        </span>
        {duracion!="ilimitado"?<span className="text-xs ml-1">por {duracion}</span>:""}
      </p>
      <p className="pt-5 md:px-5">{tipo=="gratuito"?infoPlans[0]["descripcion"]:infoPlans[1]["descripcion"]}</p>
      <div className="text-start pt-5 pb-5">
        <p className="font-semibold text-base">Beneficios:</p>
        <ul>
          {(tipo=="gratuito"?infoPlans[0]["beneficios"]:infoPlans[1]["beneficios"]).map((beneficio, index) => (
            <li key={index} className="pt-3 flex items-center gap-2">
              <CircleCheck size={13} color="green" />
              <div>{beneficio}</div>
            </li>
          ))}
        </ul>
      </div>
      <Button className="bg-secondaryLight hover:bg-secondaryLightHovered text-sm mt-auto rounded-xl"
              disabled={planActual?.tipo == "gratuito"&&tipo=="gratuito"}
              onClick={handleSeleccionarPlan}
      >
        Seleccionar plan
      </Button>
    </div>
  );
};
