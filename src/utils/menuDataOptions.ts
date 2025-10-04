// Icons
import {
  AlignVerticalDistributeCenter,
  BookCheck,
  CalendarCheck,
  LayoutDashboard,
  Building2,
  Settings,
  Users,
} from "lucide-react";

export const menuDataOptions = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
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
      title: "Mis Productos",
      url: "/dashboard/products",
      icon: AlignVerticalDistributeCenter,
    },
    {
      title: "Mis Horarios",
      url: "/dashboard/schedules",
      icon: BookCheck,
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
      icon: Users,
    },
    {
      title: "Ajustes",
      url: "/dashboard/settings",
      icon: Settings,
    },
  ],
};
