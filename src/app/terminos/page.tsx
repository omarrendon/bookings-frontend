"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  AlertCircle,
  ArrowLeft,
  BookOpen,
  CalendarCheck,
  CheckCircle,
  CreditCard,
  FileText,
  Mail,
  RefreshCw,
  ThumbsUp,
  UserCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const sections = [
  { id: "aceptacion", title: "Aceptación de los términos", icon: CheckCircle },
  { id: "servicio", title: "Descripción del servicio", icon: BookOpen },
  { id: "cuenta", title: "Registro y cuenta", icon: UserCheck },
  { id: "uso", title: "Uso aceptable", icon: ThumbsUp },
  { id: "reservas", title: "Reservas y cancelaciones", icon: CalendarCheck },
  { id: "pagos", title: "Pagos y tarifas", icon: CreditCard },
  { id: "propiedad", title: "Propiedad intelectual", icon: FileText },
  { id: "responsabilidad", title: "Limitación de responsabilidad", icon: AlertCircle },
  { id: "modificaciones", title: "Modificaciones al servicio", icon: RefreshCw },
  { id: "contacto", title: "Contacto", icon: Mail },
];

export default function TerminosPage() {
  const [activeSection, setActiveSection] = useState<string>("aceptacion");

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
              Legal
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Términos de Uso
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              Al usar Bookea.me aceptas los presentes términos. Te pedimos que
              los leas con atención, ya que establecen las condiciones bajo las
              cuales puedes usar nuestra plataforma de gestión de reservas.
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
            <section id="aceptacion" className="scroll-mt-24">
              <SectionCard icon={CheckCircle} number="1" title="Aceptación de los términos">
                <p className="text-sm leading-relaxed text-foreground/80">
                  Al acceder o utilizar Bookea.me, confirmas que has leído,
                  comprendido y aceptado estos Términos de Uso. Si no estás de
                  acuerdo con alguna parte, te pedimos que no uses el servicio.
                  El uso continuado de la plataforma tras cualquier modificación
                  implica la aceptación de los nuevos términos.
                </p>
              </SectionCard>
            </section>

            <Separator className="border-border/60" />

            <section id="servicio" className="scroll-mt-24">
              <SectionCard icon={BookOpen} number="2" title="Descripción del servicio">
                <p className="text-sm leading-relaxed text-foreground/80">
                  Bookea.me es una plataforma digital que permite a negocios
                  gestionar sus reservas, horarios, productos y clientes.
                  Ofrecemos herramientas para la configuración del negocio,
                  notificaciones automáticas y una interfaz pública para que los
                  clientes finales realicen reservas en línea.
                </p>
              </SectionCard>
            </section>

            <Separator className="border-border/60" />

            <section id="cuenta" className="scroll-mt-24">
              <SectionCard icon={UserCheck} number="3" title="Registro y cuenta">
                <ul className="text-sm leading-relaxed text-foreground/80 space-y-2">
                  {[
                    "Debes proporcionar información veraz y actualizada al crear tu cuenta.",
                    "Eres responsable de mantener la confidencialidad de tus credenciales.",
                    "Notifícanos de inmediato si detectas acceso no autorizado a tu cuenta.",
                    "Nos reservamos el derecho de suspender cuentas que infrinjan estos términos.",
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

            <section id="uso" className="scroll-mt-24">
              <SectionCard icon={ThumbsUp} number="4" title="Uso aceptable">
                <p className="text-sm leading-relaxed text-foreground/80 mb-3">
                  Queda prohibido usar Bookea.me para:
                </p>
                <ul className="text-sm leading-relaxed text-foreground/80 space-y-2">
                  {[
                    "Actividades ilegales o fraudulentas.",
                    "Enviar spam o comunicaciones no solicitadas a través de la plataforma.",
                    "Intentar acceder a cuentas o sistemas sin autorización.",
                    "Interferir con el funcionamiento normal del servicio.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-destructive shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </SectionCard>
            </section>

            <Separator className="border-border/60" />

            <section id="reservas" className="scroll-mt-24">
              <SectionCard icon={CalendarCheck} number="5" title="Reservas y cancelaciones">
                <p className="text-sm leading-relaxed text-foreground/80">
                  Las reservas realizadas a través de Bookea.me están sujetas a
                  la política de cancelación de cada negocio. Bookea.me actúa
                  como intermediario tecnológico y no es responsable de las
                  condiciones específicas que cada negocio establezca para sus
                  reservas. Te recomendamos revisar las condiciones del negocio
                  antes de confirmar cualquier reserva.
                </p>
              </SectionCard>
            </section>

            <Separator className="border-border/60" />

            <section id="pagos" className="scroll-mt-24">
              <SectionCard icon={CreditCard} number="6" title="Pagos y tarifas">
                <p className="text-sm leading-relaxed text-foreground/80">
                  Bookea.me ofrece planes de suscripción para negocios. Los
                  precios y condiciones de cada plan están disponibles en la
                  página de precios. Los pagos se procesan de forma segura a
                  través de proveedores certificados. Nos reservamos el derecho
                  de modificar nuestras tarifas con previo aviso de 30 días.
                </p>
              </SectionCard>
            </section>

            <Separator className="border-border/60" />

            <section id="propiedad" className="scroll-mt-24">
              <SectionCard icon={FileText} number="7" title="Propiedad intelectual">
                <p className="text-sm leading-relaxed text-foreground/80">
                  Todo el contenido, diseño, código y marca de Bookea.me son
                  propiedad exclusiva de sus creadores y están protegidos por las
                  leyes de propiedad intelectual aplicables. Queda prohibida la
                  reproducción, distribución o modificación sin autorización
                  expresa por escrito.
                </p>
              </SectionCard>
            </section>

            <Separator className="border-border/60" />

            <section id="responsabilidad" className="scroll-mt-24">
              <SectionCard icon={AlertCircle} number="8" title="Limitación de responsabilidad">
                <p className="text-sm leading-relaxed text-foreground/80">
                  Bookea.me se proporciona "tal cual". No garantizamos la
                  disponibilidad ininterrumpida del servicio ni nos hacemos
                  responsables por daños indirectos, pérdida de datos o lucro
                  cesante derivados del uso o imposibilidad de uso de la
                  plataforma. Nuestra responsabilidad máxima se limita al monto
                  pagado por el plan de suscripción en los últimos 3 meses.
                </p>
              </SectionCard>
            </section>

            <Separator className="border-border/60" />

            <section id="modificaciones" className="scroll-mt-24">
              <SectionCard icon={RefreshCw} number="9" title="Modificaciones al servicio">
                <p className="text-sm leading-relaxed text-foreground/80">
                  Nos reservamos el derecho de modificar, suspender o discontinuar
                  cualquier parte del servicio en cualquier momento. Notificaremos
                  cambios relevantes mediante correo electrónico o mediante un
                  aviso destacado en la plataforma con al menos 15 días de
                  anticipación cuando sea posible.
                </p>
              </SectionCard>
            </section>

            <Separator className="border-border/60" />

            <section id="contacto" className="scroll-mt-24">
              <SectionCard icon={Mail} number="10" title="Contacto">
                <p className="text-sm leading-relaxed text-foreground/80">
                  Para cualquier consulta sobre estos Términos de Uso,
                  escríbenos a{" "}
                  <a
                    href="mailto:legal@bookea.me"
                    className="text-primary hover:underline underline-offset-4"
                  >
                    legal@bookea.me
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
              href="/privacidad"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Política de privacidad
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
