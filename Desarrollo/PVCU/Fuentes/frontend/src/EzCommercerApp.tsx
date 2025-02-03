import routes from "@/AppRouter";
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import {AuthProvider} from "./providers/AuthContext";
import { TrademarkProvider } from "./providers/TrademarkContext";
import { EtiquetasProvider } from "./providers/EtiquetasContext";
import { FavouritesProvider } from "./providers/FavouritesContext";
import { CartProvider } from "./providers/CartContext";




export const EzCommercerApp = () => {
  return (
    <HelmetProvider>
      <EtiquetasProvider>
        <AuthProvider>
          <TrademarkProvider>
            <FavouritesProvider>
              <CartProvider>
                <RouterProvider router={routes} />
              </CartProvider>       
            </FavouritesProvider>
          </TrademarkProvider> 
        </AuthProvider>
      </EtiquetasProvider>
    </HelmetProvider>
  )
}
