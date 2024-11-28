import React, { createContext, useContext, useEffect, useState } from "react";
import { ProductCart, getProductCart } from "../helpers/getProducCart";
import { toast } from "sonner"; // Importar el sistema de notificaciones

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

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      if (Array.isArray(parsedCart)) {
        setItems(parsedCart);
      } else {
        console.warn("Datos corruptos en el localStorage, limpiando...");
        localStorage.removeItem("cart");
      }
    }
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("cart", JSON.stringify(items));
    } else {
      localStorage.removeItem("cart");
    }
  }, [items]);

  const addItem = async (id: number) => {
    try {
      const productCart = await getProductCart(id);

      if (!items.some((item) => item.productTitle === productCart.productTitle)) {
        setItems((prevItems) => [...prevItems, productCart]);
        toast.success(`${productCart.productTitle} se agregó al carrito.`);
      } else {
        toast.warning(`${productCart.productTitle} ya está en el carrito.`);
      }
    } catch (error) {
      console.error("Error al agregar producto al carrito:", error);
      toast.error("Ocurrió un error al agregar el producto.");
    }
  };

  const removeItem = (productTitle: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.productTitle !== productTitle));
    toast.success(`${productTitle} se eliminó del carrito.`);
  };

  const clearCart = () => {
    setItems([]);
    toast.info("Carrito vaciado.");
  };

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
