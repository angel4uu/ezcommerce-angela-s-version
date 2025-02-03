import { createContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner"; // Importar el sistema de notificaciones

export interface FavouritesContextProps {
  favourites: number[];
  toggleFavourite: (productId: number) => void;
}

export const FavouritesContext = createContext<FavouritesContextProps | undefined>(undefined);

export const FavouritesProvider = ({ children }: { children: ReactNode }) => {
  const [favourites, setFavourites] = useState<number[]>(() => {
    const storedFavourites = localStorage.getItem("favourites");
    return storedFavourites ? JSON.parse(storedFavourites) : [];
  });

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const toggleFavourite = (productId: number) => {
    setFavourites((prevFavourites) => {
      const isFavourite = prevFavourites.includes(productId);

      if (isFavourite) {
        toast.info("Se eliminó de favoritos.");
        return prevFavourites.filter((id) => id !== productId);
      } else {
        toast.success("Producto añadido a favoritos.");
        return [...prevFavourites, productId];
      }
    });
  };

  return (
    <FavouritesContext.Provider value={{ favourites, toggleFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
};
