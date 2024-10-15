import { Bell, ChevronDown, Heart, MapPin, Search, ShoppingCart, User } from "lucide-react"

import { NavLink, Link } from "react-router-dom";

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

import { SheetComponent } from "./SheetComponent";

const faculties = ["FISI", "FCE", "FII","FCB","FCF","ALL"];

const icons = [
    { component: <Bell size={28} className="text-cyan-800"/>, link: "/notifications" },
    { component: <Heart size={28} className="text-cyan-800"/>, link: "/favorites" },
    { component: <ShoppingCart size={28} className="text-cyan-800"/>, link: "/shopping-cart" },
    { component: <User size={28} className="text-cyan-800"/>, link: "/profile-buyer" },
];

export const Navbar = () => {

  return (
    <nav className="border-b">
        <div className="grid grid-cols-5 px-4 pt-6 pb-3 items-center">
            <div className="w-40">
                <Link to="/main">
                    <img
                    src="/src/assets/Ezcommerce-Logo.png"
                    alt="Logo"
                    className="w-full"
                    />
                </Link>
            </div>
            <div className="col-start-2 col-span-3 flex items-center h-14">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center">
                        <MapPin className="mr-2" size={16} />
                        All
                        <ChevronDown className="ml-2" size={16} />
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                    {faculties.map((faculty) => (
                        <DropdownMenuItem key={faculty}>{faculty}</DropdownMenuItem>
                    ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                <div className="flex items-center space-x-2 w-full h-full">
                    <div className="relative w-full">
                        <Input
                            className="pr-10"
                            placeholder="Buscar productos"
                            type="search"
                        />
                        <Search
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={20}
                        />
                    </div>
                </div>
            </div>
            <div className="flex items-center space-x-4 h-16 ml-9">
            {icons.map((icon, index) => (
                <Button key={index} variant="ghost" size="icon">
                <NavLink to={icon.link}>{icon.component}</NavLink>
                </Button>
            ))}
            </div>
        </div>
        <div className="flex flex-wrap items-center justify-s space-x-4 space-y-2 h-[68px] pl-4 md:space-y-0 md:space-x-6 py-2">
            <SheetComponent />
            <Button variant="outline" className="flex items-center w-60">
                <MapPin size={16} className="mr-2" />
                Ingresa tu ubicación
            </Button>
            <Button variant="outline" className="w-20">
                Venta
            </Button>
            <Button variant="outline" className="w-64">
                Vendedores estudiantiles
            </Button>
            <Button variant="outline" className="w-20">
                Chat
            </Button>
        </div>
    </nav>
  );
}
