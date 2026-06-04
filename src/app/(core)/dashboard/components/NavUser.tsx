"use client";
// Components
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
// Icons
import { CircleX, EllipsisVertical } from "lucide-react";
// Hooks & store
import { useLogout } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/auth.store";

function getInitials(name?: string | null, lastName?: string | null): string {
  const first = name?.trim()[0] ?? "";
  const last = lastName?.trim()[0] ?? "";
  return (first + last).toUpperCase() || "-";
}

export function NavUser() {
  const { isMobile } = useSidebar();
  const { logout } = useLogout();
  const user = useAuthStore(state => state.user);

  const fullName = [user?.name, user?.last_name].filter(Boolean).join(" ") || "-";
  const email = user?.email ?? "-";
  const initials = getInitials(user?.name, user?.last_name);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:cursor-pointer hover:bg-primary/10"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarFallback className="rounded-lg bg-primary/10 text-primary text-xs font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{fullName}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {email}
                </span>
              </div>
              <EllipsisVertical />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg p-2"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded">
                  <AvatarFallback className="rounded-lg bg-primary/10 text-primary text-xs font-semibold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{fullName}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={logout}
              className="text-primary hover:bg-primary/10 focus:bg-primary/10 !hover:cursor-pointer hover:text-primary focus:text-primary"
            >
              <CircleX className="mr-2 text-primary" />
              <span className="font-semibold">Cerrar sesión</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
