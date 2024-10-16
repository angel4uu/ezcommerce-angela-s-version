import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { MapPin } from "lucide-react";

import { SheetComponent } from "./SheetComponent";
import { Button } from "../ui/button";

const navigationItems = [
    { item: 'Venta', link: '#' },
    { item: 'Vendedores estudiantiles', link: '#' },
    { item: 'Chat', link: '#' },
];

export const NavigationComponent = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList className="space-x-8 flex flex-wrap">
        <NavigationMenuItem>
            <SheetComponent />
        </NavigationMenuItem>
        <NavigationMenuItem>
            <NavigationMenuLink href="#">      
                <Button variant="link">
                    <MapPin size={20} className="mr-2"/>
                    Ingresa tu ubicación
                </Button>
            </NavigationMenuLink>
        </NavigationMenuItem>
        {navigationItems.map((items, index) => (
          <NavigationMenuItem key={index}>
            {/* Usamos href en lugar de envolver con <Link> */}
            <NavigationMenuLink href={items.link}>
                <Button variant='link'>
                    {items.item}
                </Button>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
