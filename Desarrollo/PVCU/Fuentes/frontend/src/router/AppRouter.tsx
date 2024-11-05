import { createBrowserRouter } from "react-router-dom";

// Epicas
import { LoginPage, RegisterPage } from "../pages/Epica01";
import { ProfileBuyerPage } from "../pages/Epica02";
import { MainPage, SearchPage } from "../pages/Epica03";
import {PlansPage,PaymentConfirmation,RegisterTrademark} from "../pages/Epica05";
import {
  ProductsManagementPage,
  MyPublishedProductsPage,
  PublishProductPage,
  EditProductPage,
  ShoppingCartPage,
  FavouritesPage,
  ProductPage,
} from "../pages/Epica04";
import { Layout } from "../components/layouts/Layout";
import {PrivateRoute} from "../components/Epica1/PrivateRoute";

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
    element: <Layout />,
    // loader:
    children: [
      {
        path: "/",
        element: <MainPage />,
        // loader:
      },
      {
        path: "/search",
        element: <SearchPage />,
        // loader:
      },
      {
        path: "/profile-buyer",
        element: <PrivateRoute><ProfileBuyerPage /></PrivateRoute>,
        // loader:
      },
      {
        // path: "/product/productId",
        path: "/product",
        element: <ProductPage />,
        // loader:
      },
      {
        path: "/products-management",
        element: <PrivateRoute><ProductsManagementPage /></PrivateRoute>,
        // loader:
      },
      {
        path: "/my-published-products",
        element: <PrivateRoute><MyPublishedProductsPage /></PrivateRoute>,
        // loader:
      },
      {
        path: "/publish-product",
        element: <PrivateRoute><PublishProductPage /></PrivateRoute>,
        // loader:
      },
      {
        // path: "/edit-product/productId",
        path: "/edit-product",
        element: <PrivateRoute><EditProductPage /></PrivateRoute>,
        // loader:
      },
      {
        path: "/favourites",
        element: <PrivateRoute><FavouritesPage /></PrivateRoute>,
        // loader:
      },
      {
        path: "/shopping-cart",
        element: <PrivateRoute><ShoppingCartPage /></PrivateRoute>,
        // loader:
      },
      {
        path: "/plans",
        element: <PrivateRoute><PlansPage /></PrivateRoute>,
      },
      {
        path: "/register-trademark",
        element: <PrivateRoute><RegisterTrademark /></PrivateRoute>,
      },
      {
        path: "/payment-confirmation",
        element: <PrivateRoute><PaymentConfirmation /></PrivateRoute>,
      }
    ],
  },
]);

export default routes;
