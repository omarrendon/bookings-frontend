"use client";

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
  Twitch,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { SocialLink } from "@/lib/api/types";

interface ContactBusinessProps {
  phone?: string;
  address: string;
  socialLinks?: SocialLink[] | Record<string, string>;
}

const socialIconMap: Record<string, LucideIcon> = {
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
  twitter: Twitter,
  x: Twitter,
  youtube: Youtube,
  twitch: Twitch,
  whatsapp: MessageCircle,
  web: Globe,
  website: Globe,
};

const getSocialIcon = (platform: string): LucideIcon =>
  socialIconMap[platform.trim().toLowerCase()] ?? Globe;

const getHref = (url: string): string =>
  /^https?:\/\//i.test(url) ? url : `https://${url}`;

export default function ContactBusiness({
  phone,
  address,
  socialLinks,
}: ContactBusinessProps) {
  const normalizedSocialLinks: SocialLink[] = Array.isArray(socialLinks)
    ? socialLinks
    : socialLinks
      ? Object.entries(socialLinks).map(([platform, url]) => ({
          platform,
          url,
        }))
      : [];

  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;

  const handleCall = () => phone && window.open(`tel:${phone}`, "_self");

  const handleWhatsApp = () => {
    if (!phone) return;
    const number = phone.replace(/[^\d]/g, "");
    const message = encodeURIComponent(
      "Hola, me gustaría más información sobre sus servicios.",
    );
    window.open(`https://wa.me/${number}?text=${message}`, "_blank");
  };

  return (
    <section id="contacto" className="py-14 px-6 sm:px-10 lg:px-16 bg-muted/40">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold tracking-tight mb-8">Contacto</h2>

        {/* Info row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {/* Teléfono */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              <Phone className="size-4" />
              Teléfono
            </div>
            <p className="text-base font-medium">{phone ?? "No disponible"}</p>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                disabled={!phone}
                onClick={handleCall}
                className="rounded-full gap-1.5 text-xs hover:cursor-pointer"
              >
                <Phone className="size-3" />
                Llamar
              </Button>
              <Button
                size="sm"
                variant="outline"
                disabled={!phone}
                onClick={handleWhatsApp}
                className="rounded-full gap-1.5 text-xs hover:cursor-pointer"
              >
                <MessageCircle className="size-3" />
                WhatsApp
              </Button>
            </div>
          </div>

          <Separator className="sm:hidden" />

          {/* Dirección */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              <MapPin className="size-4" />
              Dirección
            </div>
            <p className="text-base font-medium leading-snug">{address}</p>
            <Button
              size="sm"
              variant="outline"
              className="rounded-full gap-1.5 text-xs w-fit hover:cursor-pointer"
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

          <Separator className="sm:hidden" />

          {/* Redes sociales */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              <Globe className="size-4" />
              Redes sociales
            </div>
            {normalizedSocialLinks.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {normalizedSocialLinks.map(({ platform, url }) => {
                  const Icon = getSocialIcon(platform);
                  const href = getHref(url);
                  return (
                    <Button
                      key={`${platform}-${url}`}
                      size="sm"
                      variant="outline"
                      className="rounded-full gap-1.5 text-xs hover:cursor-pointer"
                      disabled={!href}
                      onClick={() =>
                        href &&
                        window.open(href, "_blank", "noopener,noreferrer")
                      }
                    >
                      <Icon className="size-3" />
                      {platform}
                    </Button>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Sin redes sociales registradas.
              </p>
            )}
          </div>
        </div>

        {/* Mapa */}
        <div className="w-full h-72 md:h-96 rounded-2xl overflow-hidden border">
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
    </section>
  );
}
