"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { SocialLink } from "@/lib/api/types";
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
  Building2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

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

interface BusinessContactCardProps {
  phone?: string;
  address: string;
  socialLinks?: SocialLink[];
}

export default function BusinessContactCard({
  phone,
  address,
  socialLinks = [],
}: BusinessContactCardProps) {
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;

  const handleCall = () => phone && window.open(`tel:${phone}`, "_self");

  const handleWhatsApp = () => {
    if (!phone) return;
    const number = phone.replace(/[^\d]/g, "");
    const message = encodeURIComponent(
      "Hola, me gustaría más información sobre mi reserva.",
    );
    window.open(`https://wa.me/${number}?text=${message}`, "_blank");
  };

  return (
    <div className="bg-card rounded-2xl border border-border/60 overflow-hidden shadow-sm">
      {/* Encabezado */}
      <div className="px-5 py-4 border-b border-border/60 bg-muted/20 flex items-center gap-2">
        <Building2 className="size-4 text-primary" />
        <h2 className="font-semibold tracking-tight">Contacto del negocio</h2>
      </div>

      <div className="divide-y divide-border/60">
        {/* Teléfono */}
        <div className="px-5 py-4 flex flex-col gap-3">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
            <Phone className="size-3" />
            Teléfono
          </p>
          <p className="text-sm font-medium">{phone ?? "No disponible"}</p>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              disabled={!phone}
              onClick={handleCall}
              className="rounded-full gap-1.5 text-xs border-border/60"
            >
              <Phone className="size-3" />
              Llamar
            </Button>
            <Button
              size="sm"
              variant="outline"
              disabled={!phone}
              onClick={handleWhatsApp}
              className="rounded-full gap-1.5 text-xs border-border/60"
            >
              <MessageCircle className="size-3" />
              WhatsApp
            </Button>
          </div>
        </div>

        {/* Dirección */}
        <div className="px-5 py-4 flex flex-col gap-3">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
            <MapPin className="size-3" />
            Dirección
          </p>
          <p className="text-sm font-medium leading-snug">{address}</p>
          <Button
            size="sm"
            variant="outline"
            className="rounded-full gap-1.5 text-xs w-fit border-border/60"
            onClick={() =>
              window.open(
                `https://maps.google.com/?q=${encodeURIComponent(address)}`,
                "_blank",
              )
            }
          >
            <MapPin className="size-3" />
            Ver en Maps
          </Button>
        </div>

        {/* Redes sociales */}
        {socialLinks.length > 0 && (
          <div className="px-5 py-4 flex flex-col gap-3">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
              <Globe className="size-3" />
              Redes sociales
            </p>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map(({ platform, url }) => {
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
          </div>
        )}
      </div>

      {/* Mapa */}
      <Separator className="border-border/60" />
      <div className="w-full h-52 overflow-hidden">
        <iframe
          src={mapSrc}
          className="w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ubicación del negocio"
        />
      </div>
    </div>
  );
}
