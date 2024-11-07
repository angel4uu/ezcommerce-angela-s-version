import { Bell, Heart, Search, ShoppingCart } from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MenuFaculties } from "./MenuFaculties";
import { MenuAccount } from "./MenuAccount";
import { NavigationComponent } from "./NavigationComponent";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const icons = [
  { component: <Bell size={28} className="text-secondaryLight" />, link: "/" },
  {
    component: <Heart size={28} className="text-secondaryLight" />,
    link: "/favourites",
  },
  {
    component: <ShoppingCart size={28} className="text-secondaryLight" />,
    link: "/shopping-cart",
  },
];

export const Navbar = () => {
  const { authState } = useAuth();

  return (
    <nav className="px-4 sm:px-6 md:px-16 lg:px-32">
      <div className="flex flex-wrap items-center py-4 px-4 justify-between">
        {/* Logo */}
        <div className="w-40 lg:mr-9">
          <Link to="/">
            <img
              src="Ezcommerce-logo-light.png"
              alt="Logo"
              className="w-full"
            />
          </Link>
        </div>

        {/* Barra de búsqueda y menú */}
        <div className="order-last mt-4 w-full flex flex-grow lg:order-none lg:mt-0 lg:w-auto">
          <MenuFaculties />
          <div className="relative w-full">
            <Input
              className="pr-10"
              placeholder="Buscar productos"
              type="search"
            />
            <Search
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-terciaryLight"
              size={20}
            />
          </div>
        </div>

        {/* Íconos de navegación */}
        <div className="flex items-center space-x-4 ml-3">
          {icons.map((icon, index) => (
            <Button key={index} variant="ghost" size="icon">
              {authState.userId ? (
                <NavLink to={icon.link}>{icon.component}</NavLink>
              ) : (
                <span
                  onClick={() =>
                    toast.error("Inicie sesión para acceder a este módulo")
                  }
                >
                  {icon.component}
                </span>
              )}
            </Button>
          ))}
          <MenuAccount />
        </div>
      </div>

      {/* Menú de navegación */}
      <div className="flex items-center py-2 border-b">
        <NavigationComponent />
      </div>
    </nav>
  );
};
