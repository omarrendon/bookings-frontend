import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { CalendarCheck, Heart, Instagram, Facebook, Twitter } from "lucide-react";

const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Privacidad", href: "/privacidad" },
  { label: "Términos de uso", href: "/terminos" },
  { label: "Ayuda", href: "/ayuda" },
];

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com", icon: Instagram },
  { label: "Facebook", href: "https://facebook.com", icon: Facebook },
  { label: "Twitter / X", href: "https://twitter.com", icon: Twitter },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-border/60 bg-muted/30 mt-auto">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-10">
        {/* Fila principal */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Marca */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                <CalendarCheck className="size-4 text-primary" />
              </div>
              <span className="text-base font-semibold tracking-tight">
                Bookea
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              La plataforma para gestionar y reservar citas de forma fácil y rápida.
            </p>
          </div>

          {/* Navegación */}
          <div className="space-y-3">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Navegación
            </p>
            <ul className="space-y-2">
              {NAV_LINKS.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Redes sociales */}
          <div className="space-y-3">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Síguenos
            </p>
            <div className="flex items-center gap-2">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-lg border border-border/60 bg-background text-muted-foreground hover:text-foreground hover:border-border transition-colors"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-8 border-border/60" />

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Bookea. Todos los derechos reservados.
          </p>
          <p className="flex items-center gap-1">
            Hecho con{" "}
            <Heart className="size-3 text-primary fill-primary" />{" "}
            para negocios como el tuyo
          </p>
        </div>
      </div>
    </footer>
  );
}
