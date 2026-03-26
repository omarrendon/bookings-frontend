"use client";

import { ComponentProps, useEffect, useState } from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "nosotros", label: "Nosotros" },
  { id: "fotos", label: "Fotos" },
  { id: "servicios", label: "Servicios" },
  { id: "contacto", label: "Contacto" },
];

export const NavMenu = (props: ComponentProps<typeof NavigationMenu>) => {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <NavigationMenu {...props}>
      <NavigationMenuList className="gap-3 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start data-[orientation=vertical]:justify-start">
        {SECTIONS.map(({ id, label }) => (
          <NavigationMenuItem key={id}>
            <NavigationMenuLink asChild>
              <Link
                href={`#${id}`}
                onClick={e => {
                  e.preventDefault();
                  handleClick(id);
                }}
                className={cn(
                  "font-semibold cursor-pointer transition-all duration-200",
                  "text-white",
                  activeSection === id
                    ? "opacity-100 underline underline-offset-4 decoration-2"
                    : "opacity-60 hover:opacity-100",
                )}
              >
                {label}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
