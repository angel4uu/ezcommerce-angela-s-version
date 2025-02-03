import { FavouritesContext } from "@/providers";
import { useContext } from "react";

export const useFavourites= () => {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error("useFavouritesContext debe usarse dentro de FavouritesProvider");
  }
  return context;
};