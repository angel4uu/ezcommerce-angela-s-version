import React, { createContext, useContext, useEffect, useState } from "react";
import { ProductCart, getProductCart } from "../helpers/getProducCart";

interface CartContextType {
  items: ProductCart[];
  addItem: (id: number) => Promise<void>;
  removeItem: (productTitle: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCartContext = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext debe usarse dentro de CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<ProductCart[]>([]);

  // Cargar los artículos del carrito desde el localStorage al inicializar
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      if (Array.isArray(parsedCart)) {
        setItems(parsedCart); // Cargar datos válidos del localStorage
      } else {
        console.warn("Datos corruptos en el localStorage, limpiando...");
        localStorage.removeItem("cart");
      }
    }
  }, []);

  // Sincronizar los cambios en el carrito con el localStorage
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("cart", JSON.stringify(items));
    } else {
      localStorage.removeItem("cart"); // Limpiar el `localStorage` si no hay artículos
    }
  }, [items]);

  const addItem = async (id: number) => {
    try {
      const productCart = await getProductCart(id);

      // Verificar duplicados
      if (!items.some((item) => item.productTitle === productCart.productTitle)) {
        setItems((prevItems) => [...prevItems, productCart]);
        console.log("Producto agregado:", productCart);
      } else {
        console.log("El producto ya está en el carrito.");
      }
    } catch (error) {
      console.error("Error al agregar producto al carrito:", error);
    }
  };

  const removeItem = (productTitle: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.productTitle !== productTitle));
    console.log("Producto eliminado:", productTitle);
  };

  const clearCart = () => {
    setItems([]);
    console.log("Carrito limpiado");
  };

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
