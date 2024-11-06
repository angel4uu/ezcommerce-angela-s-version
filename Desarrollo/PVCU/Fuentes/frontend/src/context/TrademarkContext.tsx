import { createContext, ReactNode, useState, useEffect } from "react";
import { Marca } from "@/types";

const marcaData:Marca={
  nombre: "marca1",
  logo: "logo1",
  descripcion: "descripcion1",
  facebook: "facebook1",
  instagram: "instagram1",
  tiktok: "tiktok1",
  otra_red_Social: "red_social1",
  activado:false,
}

interface TrademarkContextType {
  marca: Marca|null;
  setMarca: React.Dispatch<React.SetStateAction<Marca|null>>;
}

export const TrademarkContext = createContext<TrademarkContextType | null>(null);

export const TrademarkProvider = ({ children }: { children: ReactNode }) => {
  
  const [marca, setMarca] = useState<Marca|null>(null);

  useEffect(() => {
    //setMarca(get api from marca)
  }, [marca]);

  return (
    <TrademarkContext.Provider value={{ marca, setMarca}}>
      {children}
    </TrademarkContext.Provider>
  );
}
