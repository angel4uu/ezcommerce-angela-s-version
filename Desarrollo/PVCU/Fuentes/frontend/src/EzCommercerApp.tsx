import routes from "./router/AppRouter"
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import {AuthProvider} from "./context/AuthContext";
import { TrademarkProvider } from "./context/TrademarkContext";
import { EtiquetasProvider } from "./context/EtiquetasContext";
import { FavouritesProvider } from "./context/FavouritesContext";




export const EzCommercerApp = () => {
  return (
    <HelmetProvider>
      <EtiquetasProvider>
        <AuthProvider>
          <TrademarkProvider>
            <FavouritesProvider>        
              <RouterProvider router={routes} />
            </FavouritesProvider>
          </TrademarkProvider> 
        </AuthProvider>
      </EtiquetasProvider>
    </HelmetProvider>
  )
}
