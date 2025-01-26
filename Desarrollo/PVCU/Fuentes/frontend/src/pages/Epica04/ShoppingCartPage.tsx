import { Helmet } from "react-helmet-async";
import { AccordionShoppingCart } from "../../components/Epica04/AccordionShoppingCart";
import { CardOrderSummary } from "../../components/Epica04/CardOrderSummary";
import { useCart } from "@/hooks";

export const ShoppingCartPage = () => {
  const { items } = useCart();

  return (
    <>
      <Helmet>
        <title>Carrito de compra</title>
      </Helmet>

      <div className="my-3 py-2 px-0 space-y-4">
        <div className="text-4xl font-sans items-center">
          <span>Carrito de compras</span>
        </div>
        <div className="flex items-center py-2 px-0">
          <p className="text-base">
            {items.length > 0
              ? "Lista de los productos a comprar"
              : "Tu carrito está vacío, añade productos para continuar."}
          </p>
        </div>
        {items.length > 0 && (
          <div className="flex flex-wrap lg:flex-nowrap justify-between">
            <div className="w-full mr-10">
              <AccordionShoppingCart />
            </div>
            <div className="w-1/2 mt-4 lg:w-[396px] lg:mt-0">
              <CardOrderSummary />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
