import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Definir el tipo del contexto
interface FavouritesContextProps {
  favourites: number[];
  toggleFavourite: (productId: number) => void;
}

// Crear el contexto
const FavouritesContext = createContext<FavouritesContextProps | undefined>(undefined);

// Hook para usar el contexto
export const useFavouritesContext = () => {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error("useFavouritesContext debe usarse dentro de FavouritesProvider");
  }
  return context;
};

// Proveedor del contexto
export const FavouritesProvider = ({ children }: { children: ReactNode }) => {
  const [favourites, setFavourites] = useState<number[]>(() => {
    const storedFavourites = localStorage.getItem("favourites");
    return storedFavourites ? JSON.parse(storedFavourites) : [];
  });

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const toggleFavourite = (productId: number) => {
    setFavourites((prevFavourites) =>
      prevFavourites.includes(productId)
        ? prevFavourites.filter((id) => id !== productId)
        : [...prevFavourites, productId]
    );
  };

  return (
    <FavouritesContext.Provider value={{ favourites, toggleFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
};
