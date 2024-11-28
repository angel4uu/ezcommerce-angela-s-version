import { ProductCart, getProductCart } from "../helpers/getProducCart";

export const useCart = () => {
  const getItems = (): ProductCart[] => {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  };

  const setItems = (items: ProductCart[]) => {
    localStorage.setItem("cart", JSON.stringify(items));
  };

  const addItem = async (id: number) => {
    try {
      // Obtener los datos del producto
      const productCart = await getProductCart(id);
      const currentItems = getItems();

      // Evitar duplicados
      if (!currentItems.some((item) => item.productTitle === productCart.productTitle)) {
        const updatedItems = [...currentItems, productCart];
        setItems(updatedItems);
        console.log("Producto agregado:", productCart);
      } else {
        console.log("El producto ya está en el carrito.");
      }
    } catch (error) {
      console.error("Error al agregar producto al carrito:", error);
    }
  };

  const removeItem = (productTitle: string) => {
    const currentItems = getItems();
    const updatedItems = currentItems.filter((item) => item.productTitle !== productTitle);
    setItems(updatedItems);
    console.log("Producto eliminado:", productTitle);
  };

  return {
    items: getItems(),
    addItem,
    removeItem,
  };
};
