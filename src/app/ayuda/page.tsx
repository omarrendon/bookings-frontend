"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Building2,
  CalendarCheck,
  CalendarClock,
  ChevronDown,
  ChevronUp,
  ClipboardList,
  Dumbbell,
  HeartPulse,
  HelpCircle,
  Info,
  LayoutDashboard,
  Mail,
  Scissors,
  ShoppingBag,
  Sparkles,
  UserCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Footer from "@/components/ui/Footer";

// ── ToC sections ──────────────────────────────────────────────────────────────

const sections = [
  { id: "que-es", title: "¿Qué es Bookea?", icon: Info },
  { id: "negocios", title: "Negocios compatibles", icon: Building2 },
  { id: "cliente", title: "Cómo reservar (cliente)", icon: CalendarCheck },
  { id: "negocio", title: "Cómo funciona (negocio)", icon: LayoutDashboard },
  { id: "faq", title: "Preguntas frecuentes", icon: HelpCircle },
  { id: "contacto", title: "Contacto y soporte", icon: Mail },
];

// ── FAQ data ──────────────────────────────────────────────────────────────────

const faqs = [
  {
    q: "¿Bookea es gratis?",
    a: "Ofrecemos un plan gratuito para negocios con hasta 50 reservas al mes. Para volúmenes mayores o funciones avanzadas (notificaciones por WhatsApp, reportes, múltiples usuarios) disponemos de planes de pago mensuales.",
  },
  {
    q: "¿Necesito crear una cuenta para reservar como cliente?",
    a: "No. Los clientes finales pueden reservar sin registrarse; solo necesitan su nombre, correo y teléfono. El registro es opcional y permite consultar el historial de citas.",
  },
  {
    q: "¿Cómo cancelo o reprogramo una cita?",
    a: "El negocio puede cancelar o reprogramar desde su panel de control. En el futuro próximo habilitaremos autogestión para clientes mediante el enlace enviado por correo.",
  },
  {
    q: "¿Qué métodos de pago acepta Bookea?",
    a: "Bookea no procesa pagos directamente. El comprobante de pago (transferencia, depósito) se adjunta al momento de reservar y el negocio lo valida. La integración con pasarelas de pago está en el roadmap.",
  },
  {
    q: "¿Puedo personalizar la página pública de mi negocio?",
    a: "Sí. Puedes subir logo, fotografías, descripción, dirección, redes sociales y horario de atención. Tu página pública queda en bookea.me/business/[id].",
  },
  {
    q: "¿Mis datos están seguros?",
    a: "Sí. Usamos HTTPS, contraseñas con hash bcrypt y sesiones gestionadas con cookies httpOnly. Nunca vendemos datos a terceros. Consulta nuestra Política de Privacidad para más detalles.",
  },
];

// ── Target businesses ─────────────────────────────────────────────────────────

const targetBusinesses = [
  { icon: Scissors, label: "Peluquerías y barberías" },
  { icon: Sparkles, label: "Spas y estética" },
  { icon: HeartPulse, label: "Consultorios médicos" },
  { icon: Dumbbell, label: "Gimnasios y entrenadores" },
  { icon: ShoppingBag, label: "Tiendas con servicio" },
  { icon: ClipboardList, label: "Asesorías y consultorías" },
];

// ── Booking steps ─────────────────────────────────────────────────────────────

const clientSteps = [
  {
    step: "1",
    title: "Encuentra el negocio",
    description:
      "El negocio comparte su enlace público de Bookea. Al abrirlo verás el perfil completo con fotos, servicios y descripción.",
  },
  {
    step: "2",
    title: "Elige tus servicios",
    description:
      "Selecciona uno o varios servicios del catálogo. El resumen muestra precio total y tiempo estimado.",
  },
  {
    step: "3",
    title: "Selecciona fecha y hora",
    description:
      "El calendario muestra los días con disponibilidad. Elige el horario que mejor te convenga.",
  },
  {
    step: "4",
    title: "Ingresa tus datos",
    description:
      "Nombre, correo y teléfono. Opcionalmente adjunta tu comprobante de pago y agrega una nota.",
  },
  {
    step: "5",
    title: "Confirma tu reserva",
    description:
      "Revisa el resumen y confirma. Recibirás un correo con los detalles de tu cita.",
  },
];

const businessSteps = [
  {
    icon: UserCircle,
    title: "Crea tu cuenta",
    description: "Regístrate como propietario de negocio en minutos.",
  },
  {
    icon: Building2,
    title: "Configura tu negocio",
    description:
      "Añade servicios, fotos, dirección y redes sociales. Define tu horario de atención.",
  },
  {
    icon: CalendarClock,
    title: "Gestiona horarios",
    description:
      "Configura los slots de disponibilidad. Bookea genera automáticamente los turnos.",
  },
  {
    icon: CalendarCheck,
    title: "Recibe reservas",
    description:
      "Visualiza, confirma, reprograma o cancela reservas desde tu panel de control.",
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AyudaPage() {
  const [activeSection, setActiveSection] = useState("que-es");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
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
            <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
              Centro de ayuda
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              ¿Cómo podemos ayudarte?
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              Encuentra todo lo que necesitas saber sobre Bookea: cómo funciona
              la plataforma, cómo gestionar tu negocio y cómo realizar una
              reserva como cliente.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-10 md:py-14">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Sticky ToC */}
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
                      : "text-muted-foreground hover:text-foreground hover:bg-muted",
                  )}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{title}</span>
                </a>
              ))}
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0 space-y-10">

            {/* ── ¿Qué es Bookea? ────────────────────────────────────────── */}
            <section id="que-es" className="scroll-mt-24 space-y-4">
              <SectionHeader icon={Info} title="¿Qué es Bookea?" />
              <p className="text-sm leading-relaxed text-foreground/80">
                <strong className="font-medium text-foreground">Bookea</strong> es
                una plataforma SaaS que permite a cualquier negocio de servicios
                gestionar sus reservas y citas en línea de manera simple, rápida y
                profesional.
              </p>
              <p className="text-sm leading-relaxed text-foreground/80">
                Cada negocio registrado obtiene una <strong className="font-medium text-foreground">página pública personalizada</strong>{" "}
                donde sus clientes pueden ver el catálogo de servicios, consultar
                disponibilidad en tiempo real y reservar su cita en pocos pasos —
                sin necesidad de llamar ni enviar mensajes.
              </p>
              <p className="text-sm leading-relaxed text-foreground/80">
                Desde el <strong className="font-medium text-foreground">panel de administración</strong>,
                el propietario del negocio puede configurar horarios, gestionar
                reservas, actualizar su catálogo de servicios y monitorear el
                estado de cada cita.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {[
                  { label: "Reservas en línea 24/7", icon: CalendarCheck },
                  { label: "Panel de control completo", icon: LayoutDashboard },
                  { label: "Página pública del negocio", icon: Building2 },
                ].map(({ label, icon: Icon }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 rounded-xl border border-border/60 bg-card px-4 py-3 text-sm font-medium shadow-sm"
                  >
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="size-4 text-primary" />
                    </div>
                    {label}
                  </div>
                ))}
              </div>
            </section>

            <Separator className="border-border/60" />

            {/* ── Negocios compatibles ───────────────────────────────────── */}
            <section id="negocios" className="scroll-mt-24 space-y-4">
              <SectionHeader icon={Building2} title="Negocios compatibles" />
              <p className="text-sm leading-relaxed text-foreground/80">
                Bookea está diseñado para cualquier negocio que trabaje con citas
                o turnos. Aunque no se limita a los siguientes rubros, estos son
                los más comunes entre nuestros usuarios:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {targetBusinesses.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 rounded-xl border border-border/60 bg-muted/30 px-4 py-3 text-sm"
                  >
                    <Icon className="size-4 text-primary shrink-0" />
                    {label}
                  </div>
                ))}
              </div>
              <p className="text-sm leading-relaxed text-foreground/80">
                Si tu negocio trabaja con turnos o citas y no está en la lista,{" "}
                <a
                  href="mailto:hola@bookea.me"
                  className="text-primary hover:underline underline-offset-4"
                >
                  contáctanos
                </a>{" "}
                — Bookea puede adaptarse a prácticamente cualquier flujo de reservas.
              </p>
            </section>

            <Separator className="border-border/60" />

            {/* ── Cómo reservar (cliente) ───────────────────────────────── */}
            <section id="cliente" className="scroll-mt-24 space-y-5">
              <SectionHeader icon={CalendarCheck} title="Cómo reservar como cliente" />
              <p className="text-sm leading-relaxed text-foreground/80">
                Reservar una cita en Bookea es completamente gratuito y no requiere
                crear una cuenta. Sigue estos pasos:
              </p>
              <div className="space-y-4">
                {clientSteps.map(({ step, title, description }) => (
                  <div key={step} className="flex gap-4">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                      {step}
                    </div>
                    <div className="pt-1 space-y-1">
                      <p className="text-sm font-medium text-foreground">{title}</p>
                      <p className="text-sm leading-relaxed text-foreground/70">
                        {description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <Separator className="border-border/60" />

            {/* ── Cómo funciona para el negocio ─────────────────────────── */}
            <section id="negocio" className="scroll-mt-24 space-y-5">
              <SectionHeader icon={LayoutDashboard} title="Cómo funciona para el negocio" />
              <p className="text-sm leading-relaxed text-foreground/80">
                Configura tu negocio en minutos y empieza a recibir reservas el mismo día.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {businessSteps.map(({ icon: Icon, title, description }) => (
                  <div
                    key={title}
                    className="rounded-xl border border-border/60 bg-card p-5 shadow-sm space-y-2"
                  >
                    <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="size-4 text-primary" />
                    </div>
                    <p className="text-sm font-medium text-foreground">{title}</p>
                    <p className="text-sm leading-relaxed text-foreground/70">
                      {description}
                    </p>
                  </div>
                ))}
              </div>
              <div className="rounded-xl border border-primary/20 bg-primary/5 px-5 py-4 flex items-start gap-3">
                <Sparkles className="size-4 text-primary shrink-0 mt-0.5" />
                <p className="text-sm leading-relaxed text-foreground/80">
                  ¿Listo para empezar?{" "}
                  <Link
                    href="/register"
                    className="text-primary font-medium hover:underline underline-offset-4 inline-flex items-center gap-1"
                  >
                    Crea tu cuenta gratis
                    <ArrowRight className="size-3" />
                  </Link>
                </p>
              </div>
            </section>

            <Separator className="border-border/60" />

            {/* ── FAQ ───────────────────────────────────────────────────── */}
            <section id="faq" className="scroll-mt-24 space-y-4">
              <SectionHeader icon={HelpCircle} title="Preguntas frecuentes" />
              <div className="divide-y divide-border/60 rounded-xl border border-border/60 bg-card overflow-hidden shadow-sm">
                {faqs.map(({ q, a }, i) => (
                  <div key={i}>
                    <button
                      type="button"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-muted/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                      aria-expanded={openFaq === i}
                    >
                      <span className="text-sm font-medium text-foreground">
                        {q}
                      </span>
                      {openFaq === i ? (
                        <ChevronUp className="size-4 text-muted-foreground shrink-0" />
                      ) : (
                        <ChevronDown className="size-4 text-muted-foreground shrink-0" />
                      )}
                    </button>
                    {openFaq === i && (
                      <div className="px-5 pb-4">
                        <p className="text-sm leading-relaxed text-foreground/70">
                          {a}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <Separator className="border-border/60" />

            {/* ── Contacto ──────────────────────────────────────────────── */}
            <section id="contacto" className="scroll-mt-24 space-y-4">
              <SectionHeader icon={Mail} title="Contacto y soporte" />
              <p className="text-sm leading-relaxed text-foreground/80">
                ¿No encontraste la respuesta que buscabas? Nuestro equipo de
                soporte está disponible de lunes a viernes de 9:00 a 18:00 (CST).
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    label: "Soporte general",
                    value: "hola@bookea.me",
                    href: "mailto:hola@bookea.me",
                  },
                  {
                    label: "Legal y privacidad",
                    value: "legal@bookea.me",
                    href: "mailto:legal@bookea.me",
                  },
                ].map(({ label, value, href }) => (
                  <div
                    key={label}
                    className="rounded-xl border border-border/60 bg-card px-5 py-4 shadow-sm space-y-1"
                  >
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      {label}
                    </p>
                    <a
                      href={href}
                      className="text-sm text-primary hover:underline underline-offset-4 font-medium"
                    >
                      {value}
                    </a>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function SectionHeader({
  icon: Icon,
  title,
}: {
  icon: LucideIcon;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
        <Icon className="size-4 text-primary" />
      </div>
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
    </div>
  );
}
