import { useState, useEffect } from "react";

export const useFavourites = () => {
  const [favourites, setFavourites] = useState<number[]>(() => {
    // Leer favoritos desde localStorage
    const storedFavourites = localStorage.getItem("favourites");
    return storedFavourites ? JSON.parse(storedFavourites) : [];
  });

  // Guardar favoritos en localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const toggleFavourite = (productId: number) => {
    setFavourites((prevFavourites) =>
      prevFavourites.includes(productId)
        ? prevFavourites.filter((id) => id !== productId) // Quitar de favoritos
        : [...prevFavourites, productId] // Agregar a favoritos
    );
  };

  return { favourites, toggleFavourite };
};
