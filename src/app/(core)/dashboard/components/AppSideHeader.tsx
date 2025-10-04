"use client";
// Components
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function SiteHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b transition-all ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 h-4" />
        <div className="flex justify-between w-full items-center">
          <h1 className="text-base font-medium">Documents</h1>
          <div className="ml-auto flex items-center gap-2">
            <Button
              variant="ghost"
              asChild
              size="sm"
              className="hidden sm:flex "
            >
              <Link
                href="/dashboard"
                rel="noopener noreferrer"
                target="_blank"
                className="dark:text-foreground hover:bg-red-600 hover:text-white"
              >
                Cerrar sesión
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
