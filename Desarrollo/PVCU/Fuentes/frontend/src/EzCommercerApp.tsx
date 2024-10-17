import routes from "./router/AppRouter"
import { RouterProvider } from "react-router-dom";

export const EzCommercerApp = () => {
  return (
    <>
        <RouterProvider router={routes} />
    </>
  )
}
