import { Bell, Heart, Search, ShoppingCart } from "lucide-react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MenuAccount } from "./MenuAccount";
import { NavigationComponent } from "./NavigationComponent";
import { useAuth,useCart } from "@/hooks";
import { useState } from "react";
const icons = [
  { component: <Bell size={28} className="text-secondaryLight" />, link: "/chat" },
  {
    component: <Heart size={28} className="text-secondaryLight" />,
    link: "/favourites",
  },
];

export const Navbar = () => {
  const { authId} = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const { items } = useCart(); // Obtener productos del carrito



  

  const handleSearch = () => {
    if (searchTerm) {
      navigate(`/search?nombre=${encodeURIComponent(searchTerm)}`);
    } else {
      navigate("/search"); 
    }
  };
  
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
          <div className="relative w-full">
            <Input
              className="pr-10"
              placeholder="Buscar productos"
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <Search
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-terciaryLight"
              size={20}
            />
          </div>
        </div>

        {/* Íconos de navegación */}
        <div className="flex items-center space-x-4 ml-3">
          {authId ? (
            <>
              {icons.map((icon, index) => (
                <Button key={index} variant="ghost" size="icon">
                  <NavLink to={icon.link}>{icon.component}</NavLink>
                </Button>
              ))}
              <Button variant="ghost" size="icon">
                <NavLink to="/shopping-cart" className="flex justify-center items-center gap-1">
                  <ShoppingCart size={28} className="text-secondaryLight" />
                  <span>{items.length}</span>
                </NavLink>
              </Button>
              <MenuAccount />
            </>
          ) : (
            <div className="flex gap-2">
              <Button
                className="px-7 bg-transparent text-black hover:text-secondaryLight hover:bg-transparent"
                onClick={() => navigate("/login")}
              >
                Log in
              </Button>
              <Button
                className="px-7 bg-transparent text-black hover:text-secondaryLight hover:bg-transparent"
                onClick={() => navigate("/register")}
              >
                Sign up
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Menú de navegación */}
      <div className="flex items-center py-2 border-b">
        <NavigationComponent />
      </div>
    </nav>
  );
};
