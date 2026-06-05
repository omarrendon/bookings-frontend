"use client";
// Components
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
import { Building2, EllipsisVertical, LogOut, UserCircle } from "lucide-react";
// Hooks & store
import { useLogout } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/auth.store";
// Navigation
import Link from "next/link";

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
  const roleLabel = user?.role === "owner" ? "Propietario" : (user?.role ?? "");

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:cursor-pointer hover:bg-sidebar-accent"
            >
              <Avatar className="h-8 w-8 rounded-lg shrink-0">
                <AvatarFallback className="rounded-lg bg-primary/10 text-primary text-xs font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight min-w-0">
                <span className="truncate font-medium">{fullName}</span>
                <span className="text-muted-foreground truncate text-xs">{email}</span>
              </div>
              <EllipsisVertical className="size-4 shrink-0 text-muted-foreground" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-xl p-1.5"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={6}
          >
            {/* User info header */}
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-3 px-2 py-2">
                <Avatar className="h-9 w-9 rounded-lg shrink-0">
                  <AvatarFallback className="rounded-lg bg-primary/10 text-primary text-sm font-semibold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left leading-tight min-w-0">
                  <span className="truncate font-medium text-sm">{fullName}</span>
                  <span className="text-muted-foreground truncate text-xs">{email}</span>
                </div>
                {roleLabel && (
                  <Badge
                    variant="secondary"
                    className="bg-primary/10 text-primary border-0 text-xs shrink-0"
                  >
                    {roleLabel}
                  </Badge>
                )}
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator className="my-1" />

            {/* Navigation items */}
            <DropdownMenuItem asChild className="gap-2.5 cursor-pointer rounded-lg">
              <Link href="/dashboard/profile">
                <UserCircle className="size-4 text-muted-foreground" />
                <span>Mi Perfil</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="gap-2.5 cursor-pointer rounded-lg">
              <Link href="/dashboard/business">
                <Building2 className="size-4 text-muted-foreground" />
                <span>Mi Negocio</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="my-1" />

            {/* Logout */}
            <DropdownMenuItem
              onClick={logout}
              className="gap-2.5 cursor-pointer rounded-lg text-destructive focus:text-destructive focus:bg-destructive/10 hover:bg-destructive/10"
            >
              <LogOut className="size-4" />
              <span className="font-medium">Cerrar sesión</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
