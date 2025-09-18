// Components
import { Logo } from "../../app/(core)/business/[id]/components/Logo";
import { NavMenu } from "./NavMenu";
import { NavigationSheet } from "./NavigationSheet";
import { Button } from "@/components/ui/button";

export default function NavigationBar() {
  return (
    <div className="bg-muted">
      <nav className="fixed top-6 inset-x-4 h-16 bg-transparent  dark:border-slate-700/70 max-w-(--breakpoint-xl) mx-auto rounded-full z-50">
        <div className="h-full flex items-center justify-between mx-auto px-4 relative z-50">
          {/* <Logo /> */}
          {/* Desktop Menu */}
          <NavMenu className="hidden sm:block" />
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="hidden md:inline-flex rounded-full cursor-pointer"
            >
              Reservar Ahora
            </Button>
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
