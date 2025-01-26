import { FavouritesContext } from "@/context";
import { useContext } from "react";

export const useFavourites= () => {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error("useFavouritesContext debe usarse dentro de FavouritesProvider");
  }
  return context;
};