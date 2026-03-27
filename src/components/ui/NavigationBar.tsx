"use client";

import { useEffect, useState } from "react";
import { NavMenu } from "./NavMenu";
import { NavigationSheet } from "./NavigationSheet";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "./button";

interface NavigationBarProps {
  id: string;
}

export default function NavigationBar({ id }: NavigationBarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="bg-muted">
      <nav
        className={cn(
          "fixed top-6 inset-x-4 h-16 max-w-(--breakpoint-xl) mx-auto rounded-full z-50 transition-all duration-300",
          scrolled
            ? "bg-black/45 backdrop-blur-md border border-white/10 shadow-lg"
            : "bg-white/5 backdrop-blur-sm border border-white/10",
        )}
      >
        <div className="h-full flex items-center justify-between mx-auto px-4 relative z-50">
          {/* Desktop Menu */}
          <NavMenu className="hidden sm:block" />
          <div className="flex items-center gap-3">
            <Link
              href={`/business/${id}/products`}
              className="hidden md:inline-flex rounded-full  border-white/20 text-black hover:bg-white/10 hover:text-white"
            >
              <Button
                variant="outline"
                size="sm"
                className="hover:cursor-pointer"
              >
                Reservar Ahora
              </Button>
            </Link>
            {/* Mobile Menu */}
            <div className="sm:hidden z-10">
              <NavigationSheet />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
