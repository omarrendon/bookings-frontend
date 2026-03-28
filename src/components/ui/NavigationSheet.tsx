// Components
import { NavMenu } from "./NavMenu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// Icons
import { Menu } from "lucide-react";

export const NavigationSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="px-6 py-3">
        <div className="[&_a]:text-foreground [&_a]:opacity-70 hover:[&_a]:opacity-100">
          <NavMenu orientation="vertical" className="mt-6 [&>div]:h-full" />
        </div>
      </SheetContent>
    </Sheet>
  );
};
