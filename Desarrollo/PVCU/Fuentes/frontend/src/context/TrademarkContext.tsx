import { createContext, ReactNode, useState, useEffect } from "react";
import { Marca, Plan, Membresia } from "@/types";
import {
  getMembresiaByMarca,
  getPlan,
  getMarcaByUsuario,
} from "@/api/apiMarcas";
import { useAuth } from "@/hooks/useAuth";

interface TrademarkContextType {
  marca: Marca | null;
  setMarca: React.Dispatch<React.SetStateAction<Marca | null>>;
  membresia: Membresia | null;
  plan: Plan | null;
  planSeleccionado: Plan | null;
  setPlanSeleccionado: React.Dispatch<React.SetStateAction<Plan | null>>;
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

  const [planSeleccionado, setPlanSeleccionado] = useState<Plan | null>(null);
  const [gratisModal, setGratisModal] = useState<boolean>(false);
  const { authState } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (!authState.userId) return;

      try {
        const marcaResponse = await getMarcaByUsuario(authState.userId);
        const fetchedMarca = marcaResponse?.data?.results?.[0];
        if (!fetchedMarca?.id) return;
        setMarca(fetchedMarca);

        const membresiaResponse = await getMembresiaByMarca(fetchedMarca);
        const fetchedMembresia = membresiaResponse?.data?.results?.[0];
        if (!fetchedMembresia?.id) return;
        setMembresia(fetchedMembresia);

        const planResponse = await getPlan(fetchedMembresia.id_plan);
        const fetchedPlan = planResponse?.data?.results?.[0];
        if (!fetchedPlan?.id) return;
        setPlan(fetchedPlan);
      } catch (error) {
        console.log("Fetching error", error);
      }
    };

    fetchData();
    console.log(marca);
    console.log(membresia);
    console.log(plan);
  }, [authState.userId, marca, membresia, plan]);

  return (
    <TrademarkContext.Provider
      value={{
        marca,
        setMarca,
        membresia,
        plan,
        planSeleccionado,
        setPlanSeleccionado,
        gratisModal,
        setGratisModal,
      }}
    >
      {children}
    </TrademarkContext.Provider>
  );
};
