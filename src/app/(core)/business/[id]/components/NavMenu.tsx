// Dependencies
import { ComponentProps } from "react";
// Components
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export const NavMenu = (props: ComponentProps<typeof NavigationMenu>) => (
  <NavigationMenu {...props}>
    <NavigationMenuList className="gap-3 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start data-[orientation=vertical]:justify-start">
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link href="#">Nosotros</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link href="#">Servicios</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link href="#">Horarios</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link href="#">Contáctanos</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
);
