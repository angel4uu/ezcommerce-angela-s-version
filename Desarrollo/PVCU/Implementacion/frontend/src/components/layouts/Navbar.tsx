import { Bell, Heart, Search, ShoppingCart, User } from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MenuFaculties } from "./MenuFaculties";
import { NavigationComponent } from "./NavigationComponent";

const icons = [
  { component: <Bell size={28} className="text-cyan-800" />, link: "/notifications" },
  { component: <Heart size={28} className="text-cyan-800" />, link: "/favorites" },
  { component: <ShoppingCart size={28} className="text-cyan-800" />, link: "/shopping-cart" },
  { component: <User size={28} className="text-cyan-800" />, link: "/profile-buyer" },
];

export const Navbar = () => {
  return (
    <nav className="border-b">
      <div className="flex flex-wrap items-center py-4 px-4 justify-between">
        {/* Logo */}
        <div className="w-40 lg:mr-9">
          <Link to="/main">
            <img src="/src/assets/Ezcommerce-Logo.png" alt="Logo" className="w-full" />
          </Link>
        </div>

        {/* Barra de búsqueda y menú */}
        <div className="order-last mt-4 w-full flex flex-grow lg:order-none lg:mt-0 lg:w-auto">
          <MenuFaculties />
          <div className="relative w-full">
            <Input className="pr-10" placeholder="Buscar productos" type="search" />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>

        {/* Íconos de navegación */}
        <div className="flex items-center space-x-4 ml-3">
          {icons.map((icon, index) => (
            <Button key={index} variant="ghost" size="icon">
              <NavLink to={icon.link}>{icon.component}</NavLink>
            </Button>
          ))}
        </div>
      </div>
              
        {/* Menú de navegación */}
      <div className="flex items-center py-2">
        <NavigationComponent />
      </div>
    </nav>
  );
};
