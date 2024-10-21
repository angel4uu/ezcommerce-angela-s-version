import routes from "./router/AppRouter"
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

export const EzCommercerApp = () => {
  return (
    <HelmetProvider>
        <RouterProvider router={routes} />
    </HelmetProvider>
  )
}
