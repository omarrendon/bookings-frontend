"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Phone,
  MessageCircle,
  MapPin,
  Globe,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { SocialLink } from "@/lib/api/types";

const socialIconMap: Record<string, LucideIcon> = {
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
  twitter: Twitter,
  x: Twitter,
  youtube: Youtube,
  whatsapp: MessageCircle,
  web: Globe,
  website: Globe,
};

const getSocialIcon = (platform: string): LucideIcon =>
  socialIconMap[platform.trim().toLowerCase()] ?? Globe;

const getHref = (url: string): string =>
  /^https?:\/\//i.test(url) ? url : `https://${url}`;

interface ContactBusinessProps {
  phone?: string;
  address: string;
  socialLinks?: SocialLink[] | Record<string, string>;
}

export default function ContactBusiness({
  phone,
  address,
  socialLinks,
}: ContactBusinessProps) {
  const normalizedLinks: Array<{ platform: string; url: string }> =
    Array.isArray(socialLinks)
      ? socialLinks
      : socialLinks
        ? Object.entries(socialLinks).map(([platform, url]) => ({
            platform,
            url,
          }))
        : [];

  const handleCall = () => phone && window.open(`tel:${phone}`, "_self");

  const handleWhatsApp = () => {
    if (!phone) return;
    const number = phone.replace(/[^\d]/g, "");
    const message = encodeURIComponent(
      "Hola, me gustaría más información sobre sus servicios.",
    );
    window.open(`https://wa.me/${number}?text=${message}`, "_blank");
  };

  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;

  return (
    <section id="contacto" className="py-16 px-4 sm:px-10 lg:px-16 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        {/* Encabezado de sección */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-medium mb-3">
            <MapPin className="size-3" />
            Encuéntranos
          </div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Información de Contacto
          </h2>
          <p className="text-muted-foreground text-sm mt-1.5 max-w-md mx-auto">
            Estamos para ayudarte. Contáctanos por el medio que prefieras.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Columna izquierda: teléfono + dirección + redes */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Teléfono */}
            <Card className="border-border/60 bg-card shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="size-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="size-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Teléfono
                    </p>
                    <p className="text-sm font-semibold">
                      {phone ?? "No disponible"}
                    </p>
                  </div>
                </div>
                <Separator className="mb-4" />
                <div className="flex gap-2">
                  <Button
                    onClick={handleCall}
                    disabled={!phone}
                    size="sm"
                    className="flex-1 gap-1.5 rounded-full"
                  >
                    <Phone className="size-3.5" />
                    Llamar
                  </Button>
                  <Button
                    onClick={handleWhatsApp}
                    disabled={!phone}
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-1.5 rounded-full border-border/60"
                  >
                    <MessageCircle className="size-3.5" />
                    WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Dirección */}
            <Card className="border-border/60 bg-card shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-5">
                <div className="flex items-start gap-3 mb-4">
                  <div className="size-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="size-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                      Dirección
                    </p>
                    <p className="text-sm font-medium leading-relaxed">
                      {address}
                    </p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full rounded-full gap-1.5 border-border/60 text-xs"
                  onClick={() =>
                    window.open(
                      `https://maps.google.com/?q=${encodeURIComponent(address)}`,
                      "_blank",
                    )
                  }
                >
                  <MapPin className="size-3" />
                  Ver en Google Maps
                </Button>
              </CardContent>
            </Card>

            {/* Redes sociales */}
            {normalizedLinks.length > 0 && (
              <Card className="border-border/60 bg-card shadow-sm hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="size-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Globe className="size-4 text-primary" />
                    </div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Redes sociales
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {normalizedLinks.map(({ platform, url }) => {
                      const Icon = getSocialIcon(platform);
                      const href = getHref(url);
                      return (
                        <Button
                          key={`${platform}-${url}`}
                          size="sm"
                          variant="outline"
                          className="rounded-full gap-1.5 text-xs capitalize border-border/60 hover:border-primary/40"
                          onClick={() =>
                            window.open(href, "_blank", "noopener,noreferrer")
                          }
                        >
                          <Icon className="size-3" />
                          {platform}
                        </Button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Mapa */}
          <div className="lg:col-span-3">
            <Card className="border-border/60 shadow-sm overflow-hidden h-full min-h-[340px]">
              <iframe
                src={mapSrc}
                className="w-full h-full min-h-[340px] border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación del negocio"
              />
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
