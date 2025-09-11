// Components
import { Logo } from "./Logo";
import { NavMenu } from "./NavMenu";
import { NavigationSheet } from "./NavigationSheet";
import { Button } from "@/components/ui/button";

export default function NavigationBar() {
  return (
    <div className="bg-muted">
      <nav className="fixed top-6 inset-x-4 h-16 bg-background border dark:border-slate-700/70 max-w-(--breakpoint-xl) mx-auto rounded-full">
        <div className="h-full flex items-center justify-between mx-auto px-4">
          <Logo />
          {/* Desktop Menu */}
          <NavMenu className="hidden md:block" />
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="hidden sm:inline-flex rounded-full"
            >
              Reservar Ahora
            </Button>
            {/* Mobile Menu */}
            <div className="md:hidden">
              <NavigationSheet />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
