import { createBrowserRouter } from "react-router-dom";

// Epicas
import { LoginPage, RegisterPage } from "../pages/Epica01";
import { ProfileBuyerPage } from "../pages/Epica02";
import { MainPage, SearchPage } from "../pages/Epica03";
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
    element: <Layout />,
    // loader:
    children: [
      {
        // path: "/:userId/main",
        path: "/",
        element: <MainPage />,
        // loader:
      },
      {
        // path: "/:userId/search",
        path: "/search",
        element: <SearchPage />,
        // loader:
      },
      {
        // path: "/:userId/profile-buyer",
        path: "/profile-buyer",
        element: <ProfileBuyerPage />,
        // loader:
      },
      {
        // path: "/:userId/product/productId",
        path: "/product",
        element: <ProductPage />,
        // loader:
      },
      {
        // path: "/:userId/products-management",
        path: "/products-management",
        element: <ProductsManagementPage />,
        // loader:
      },
      {
        // path: "/:userId/my-published-products",
        path: "/my-published-products",
        element: <MyPublishedProductsPage />,
        // loader:
      },
      {
        // path: "/:userId/publish-product",
        path: "/publish-product",
        element: <PublishProductPage />,
        // loader:
      },
      {
        // path: "/:userId/edit-product/productId",
        path: "/edit-product",
        element: <EditProductPage />,
        // loader:
      },
      {
        // path: "/:userId/favourites",
        path: "/favourites",
        element: <FavouritesPage />,
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
