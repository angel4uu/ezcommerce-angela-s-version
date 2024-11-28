import { useState, useEffect } from "react";
import { ProductCart, getProductCart } from "../helpers/getProducCart";

export const useCart = () => {
  const [items, setItems] = useState<ProductCart[]>([]);

  // Inicializar los elementos desde localStorage
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("cart") || "[]");
    setItems(storedItems);
  }, []);

  // Actualizar localStorage cada vez que cambie el estado
  const syncLocalStorage = (updatedItems: ProductCart[]) => {
    localStorage.setItem("cart", JSON.stringify(updatedItems));
    setItems(updatedItems); // Actualiza el estado
  };

  const addItem = async (id: number) => {
    try {
      const productCart = await getProductCart(id);

      if (!items.some((item) => item.productTitle === productCart.productTitle)) {
        const updatedItems = [...items, productCart];
        syncLocalStorage(updatedItems);
        console.log("Producto agregado:", productCart);
      } else {
        console.log("El producto ya está en el carrito.");
      }
    } catch (error) {
      console.error("Error al agregar producto al carrito:", error);
    }
  };

  const removeItem = (productTitle: string) => {
    const updatedItems = items.filter((item) => item.productTitle !== productTitle);
    syncLocalStorage(updatedItems);
    console.log("Producto eliminado:", productTitle);
  };

  const updateQuantity = (productTitle: string, newQuantity: number) => {
    const updatedItems = items.map((item) =>
      item.productTitle === productTitle ? { ...item, cantidadProduct: newQuantity } : item
    );
    syncLocalStorage(updatedItems);
    console.log(`Cantidad actualizada para ${productTitle}: ${newQuantity}`);
  };

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
  };
};
