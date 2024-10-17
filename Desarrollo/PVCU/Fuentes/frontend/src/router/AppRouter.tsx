import { createBrowserRouter } from "react-router-dom";

// Epicas
import { LoginPage,RegisterPage } from "../pages/Epica01";
import { ProfileBuyerPage } from "../pages/Epica02";
import { MainPage } from "../pages/Epica03";
import { ProductManagementPage, ShoppingCartPage } from "../pages/Epica04";

import { Layaout } from "../components/layouts/Layaout";

const routes = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
    // loader:
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    // path: "/:userId",
    element: <Layaout />,
    // loader:
    children: [
      {
        // path: "/:userId/main",
        path: "/",
        element: <MainPage />,
        // loader:
      },
      {
        // path: "/:userId/profile-buyer",
        path: "/profile-buyer",
        element: <ProfileBuyerPage />,
        // loader:
      },
      {
        // path: "/:userId/product-management",
        path: "/product-management",
        element: <ProductManagementPage />,
        // loader:
      },
      {
        // path: "/:userId/shopping-cart",
        path: "/shopping-cart",
        element: <ShoppingCartPage />,
        // loader:
      },
    ],
  },
]);

export default routes;
