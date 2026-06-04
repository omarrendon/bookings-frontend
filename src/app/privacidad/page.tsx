"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  BookOpen,
  Cookie,
  Eye,
  Lock,
  Mail,
  Share2,
  Shield,
  User,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const sections = [
  { id: "info", title: "Información que recopilamos", icon: Eye },
  { id: "uso", title: "Cómo usamos tu información", icon: User },
  { id: "compartir", title: "Compartir información", icon: Share2 },
  { id: "seguridad", title: "Seguridad", icon: Lock },
  { id: "derechos", title: "Tus derechos", icon: Shield },
  { id: "cookies", title: "Cookies", icon: Cookie },
  { id: "contacto", title: "Contacto", icon: Mail },
];

export default function PrivacidadPage() {
  const [activeSection, setActiveSection] = useState<string>("info");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold text-foreground hover:text-primary transition-colors"
          >
            <BookOpen className="h-5 w-5 text-primary" />
            Bookea.me
          </Link>
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Volver al inicio
            </Link>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-border/60 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
          <div className="max-w-2xl space-y-4">
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary border-0"
            >
              Privacidad
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Política de Privacidad
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              En Bookea.me nos comprometemos a proteger tu información personal.
              Esta política explica qué datos recopilamos, cómo los usamos y los
              derechos que tienes sobre ellos.
            </p>
            <p className="text-xs text-muted-foreground">
              Última actualización: junio 2025
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-14">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Sticky TOC — desktop only */}
          <aside className="hidden lg:block w-52 shrink-0">
            <div className="sticky top-24 space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
                Contenido
              </p>
              {sections.map(({ id, title, icon: Icon }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className={cn(
                    "flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors duration-150",
                    activeSection === id
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{title}</span>
                </a>
              ))}
            </div>
          </aside>

          {/* Sections */}
          <main className="flex-1 min-w-0 space-y-8">
            <section id="info" className="scroll-mt-24">
              <SectionCard icon={Eye} number="1" title="Información que recopilamos">
                <p className="text-sm leading-relaxed text-foreground/80">
                  Recopilamos la información que nos proporcionas al crear una
                  cuenta: nombre, apellido, correo electrónico y datos del
                  negocio. También recopilamos datos de uso del servicio de forma
                  automática.
                </p>
              </SectionCard>
            </section>

            <Separator className="border-border/60" />

            <section id="uso" className="scroll-mt-24">
              <SectionCard icon={User} number="2" title="Cómo usamos tu información">
                <ul className="text-sm leading-relaxed text-foreground/80 space-y-2">
                  {[
                    "Proveer y mejorar el servicio de Bookea.me.",
                    "Enviarte notificaciones relacionadas con tu cuenta y reservas.",
                    "Cumplir con obligaciones legales aplicables.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </SectionCard>
            </section>

            <Separator className="border-border/60" />

            <section id="compartir" className="scroll-mt-24">
              <SectionCard icon={Share2} number="3" title="Compartir información">
                <p className="text-sm leading-relaxed text-foreground/80">
                  No vendemos ni rentamos tu información personal a terceros.
                  Podemos compartirla con proveedores de servicios que nos ayudan
                  a operar la plataforma, bajo acuerdos de confidencialidad.
                </p>
              </SectionCard>
            </section>

            <Separator className="border-border/60" />

            <section id="seguridad" className="scroll-mt-24">
              <SectionCard icon={Lock} number="4" title="Seguridad">
                <p className="text-sm leading-relaxed text-foreground/80">
                  Implementamos medidas técnicas y organizativas para proteger tu
                  información. Las contraseñas se almacenan con hashing y los
                  tokens de sesión se gestionan mediante cookies httpOnly.
                </p>
              </SectionCard>
            </section>

            <Separator className="border-border/60" />

            <section id="derechos" className="scroll-mt-24">
              <SectionCard icon={Shield} number="5" title="Tus derechos">
                <p className="text-sm leading-relaxed text-foreground/80">
                  Tienes derecho a acceder, rectificar o eliminar tus datos
                  personales en cualquier momento. Puedes ejercer estos derechos
                  desde la configuración de tu cuenta o contactándonos
                  directamente.
                </p>
              </SectionCard>
            </section>

            <Separator className="border-border/60" />

            <section id="cookies" className="scroll-mt-24">
              <SectionCard icon={Cookie} number="6" title="Cookies">
                <p className="text-sm leading-relaxed text-foreground/80">
                  Usamos cookies httpOnly para gestionar sesiones de forma
                  segura. No usamos cookies de rastreo de terceros para
                  publicidad.
                </p>
              </SectionCard>
            </section>

            <Separator className="border-border/60" />

            <section id="contacto" className="scroll-mt-24">
              <SectionCard icon={Mail} number="7" title="Contacto">
                <p className="text-sm leading-relaxed text-foreground/80">
                  Para cualquier consulta sobre privacidad, escríbenos a{" "}
                  <a
                    href="mailto:privacidad@bookea.me"
                    className="text-primary hover:underline underline-offset-4"
                  >
                    privacidad@bookea.me
                  </a>
                  .
                </p>
              </SectionCard>
            </section>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/60 bg-muted/30 mt-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <BookOpen className="h-4 w-4" />
            <span>
              © {new Date().getFullYear()} Bookea.me — Todos los derechos
              reservados.
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <Link
              href="/terminos"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Términos de uso
            </Link>
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Inicio
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SectionCard({
  icon: Icon,
  number,
  title,
  children,
}: {
  icon: LucideIcon;
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <div className="shrink-0">
        <div className="rounded-lg bg-primary/10 p-2.5">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </div>
      <div className="space-y-3 pt-1 flex-1">
        <h2 className="text-base font-semibold text-foreground">
          <span className="text-muted-foreground mr-1.5">{number}.</span>
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}
