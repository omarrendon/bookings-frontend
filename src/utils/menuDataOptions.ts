import {
  BookCheck,
  Building2,
  CalendarCheck,
  LayoutDashboard,
  Package,
  UserCircle,
} from "lucide-react";

export const menuDataOptions = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Reservas",
      url: "/dashboard/reservations",
      icon: CalendarCheck,
    },
    {
      title: "Horarios",
      url: "/dashboard/schedules",
      icon: BookCheck,
    },
    {
      title: "Servicios",
      url: "/dashboard/products",
      icon: Package,
    },
  ],
  navSecondary: [
    {
      title: "Mi Negocio",
      url: "/dashboard/business",
      icon: Building2,
    },
    {
      title: "Mi Perfil",
      url: "/dashboard/profile",
      icon: UserCircle,
    },
  ],
};
