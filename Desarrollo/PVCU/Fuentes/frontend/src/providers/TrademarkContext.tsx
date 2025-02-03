import { createContext, ReactNode, useState, useEffect } from "react";
import { Marca, Plan, Membresia } from "@/api";
import {
  membresiasService,
  planesService,
  marcasService,
} from "@/api/apiMarcas";
import { useAuth } from "@/hooks/useAuth";

interface TrademarkContextType {
  marca: Marca | null;
  setMarca: React.Dispatch<React.SetStateAction<Marca | null>>;
  membresia: Membresia | null;
  plan: Plan | null;
  gratisModal: boolean;
  setGratisModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TrademarkContext = createContext<TrademarkContextType | null>(
  null
);

export const TrademarkProvider = ({ children }: { children: ReactNode }) => {
  const [marca, setMarca] = useState<Marca | null>(null);
  const [membresia, setMembresia] = useState<Membresia | null>(null);
  const [plan, setPlan] = useState<Plan | null>(null);

  const [gratisModal, setGratisModal] = useState<boolean>(false);
  const { authId } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      
      if (!authId){
        setMarca(null);
        setMembresia(null);
        setPlan(null);
        return;
      }
      try {
        const marcaResponse = await marcasService.getMarcaByUsuario(authId);
        if (!marcaResponse) return;
        setMarca(marcaResponse);

        const membresiaResponse = await membresiasService.getMembresiaByMarca(marcaResponse.id!);
        if (!membresiaResponse) return;
        setMembresia(membresiaResponse);

        const planResponse = await planesService.getPlan(membresiaResponse.id_plan);
        if (!planResponse) return;
        setPlan(planResponse);
      } catch (error) {
        console.log("Fetching error", error);
      }
    };

    fetchData();
  }, [authId]);

  return (
    <TrademarkContext.Provider
      value={{
        marca,
        setMarca,
        membresia,
        plan,
        gratisModal,
        setGratisModal,
      }}
    >
      {children}
    </TrademarkContext.Provider>
  );
};
