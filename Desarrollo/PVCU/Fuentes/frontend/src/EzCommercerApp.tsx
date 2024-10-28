import routes from "./router/AppRouter"
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import {AuthProvider} from "./context/AuthProvider";

export const EzCommercerApp = () => {
  return (
    <HelmetProvider>
      <AuthProvider>
        <RouterProvider router={routes} />
      </AuthProvider>
    </HelmetProvider>
  )
}
