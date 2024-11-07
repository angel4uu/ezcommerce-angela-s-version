import { createContext, ReactNode, useState, useEffect } from "react";
import { Marca, Plan } from "@/types";

const marcaData:Marca={
  nombre: "marca1",
  logo: "logo1",
  descripcion: "descripcion1",
  facebook: "facebook1",
  instagram: "instagram1",
  tiktok: "tiktok1",
  otra_red_social: "red_social1",
  activado:false,
}
const planData:Plan={
  tipo: "gratuito",
  duracion: "ilimitado",
  precio: 0,
}

interface TrademarkContextType {
  marca: Marca|null;
  setMarca: React.Dispatch<React.SetStateAction<Marca|null>>;
  plan: Plan;
  setPlan: React.Dispatch<React.SetStateAction<Plan>>;
  planSeleccionado: Plan|null;
  setPlanSeleccionado: React.Dispatch<React.SetStateAction<Plan|null>>;
}

export const TrademarkContext = createContext<TrademarkContextType | null>(null);

export const TrademarkProvider = ({ children }: { children: ReactNode }) => {
  
  const [marca, setMarca] = useState<Marca|null>(null);
  const [plan, setPlan] = useState<Plan>(planData);
  const [planSeleccionado, setPlanSeleccionado] = useState<Plan|null>(null);

  useEffect(() => {
    //setMarca(get api from marca)
    //setPlan(get api from plan)
  }, []);

  return (
    <TrademarkContext.Provider value={{ marca, setMarca, plan, setPlan, planSeleccionado, setPlanSeleccionado}}>
      {children}
    </TrademarkContext.Provider>
  );
}
