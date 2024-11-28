import { useState, useEffect } from "react";

export const useFavourites = () => {
  const [favourites, setFavourites] = useState<number[]>(() => {
    const storedFavourites = localStorage.getItem("favourites");
    return storedFavourites ? JSON.parse(storedFavourites) : [];
  });

  // Guardar favoritos en localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const toggleFavourite = (productId: number) => {
    setFavourites((prevFavourites) => {
      if (prevFavourites.includes(productId)) {
        // Si ya está en favoritos, lo quitamos
        return prevFavourites.filter((id) => id !== productId);
      } else {
        // Si no está en favoritos, lo agregamos
        return [...prevFavourites, productId];
      }
    });
  };

  return { favourites, toggleFavourite };
};
