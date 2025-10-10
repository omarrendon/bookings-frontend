"use client";
// Components
import SecondaryButton from "@/components/ui/SecondaryButton";
import SubTitle from "@/components/ui/SubTitle";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
// Utils
import { getTranslatePath } from "@/utils/getTranslatePath";
// Hooks
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const pathname = usePathname();
  const routeName = getTranslatePath(pathname);

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b transition-all ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 h-4" />
        <div className="flex justify-between w-full items-center">
          <SubTitle text={routeName[0]} className="hidden md:block " />
          <div className="ml-auto flex items-center gap-2">
            <SecondaryButton>Cerrar sesión</SecondaryButton>
          </div>
        </div>
      </div>
    </header>
  );
}
