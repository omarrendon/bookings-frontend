"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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

export default function ContactBusiness({
  phone,
  address,
  socialLinks,
}: ContactBusinessProps) {
  const handleCallClick = () => {
    if (phone) window.open(`tel:${phone}`, "_self");
  };

  console.log("ContactBusiness props:", socialLinks);

  const handleWhatsAppClick = () => {
    if (!phone) return;
    const number = phone.replace(/[^\d]/g, "");
    const message = encodeURIComponent(
      "Hola, me gustaría más información sobre sus servicios.",
    );
    window.open(`https://wa.me/${number}?text=${message}`, "_blank");
  };

  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;

  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-8">Información de Contacto</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-10 px-10">
        {/* Teléfono / WhatsApp */}
        <Card className="border hover:shadow-lg transition-shadow duration-300 bg-teal-100">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="flex items-center justify-center mb-4">
              <Phone className="w-8 h-8 text-teal-600 mr-2" />
              <span className="text-xl font-bold text-teal-800">
                {phone ?? "No disponible"}
              </span>
            </div>
            <div className="flex gap-2 w-full">
              <Button
                onClick={handleCallClick}
                disabled={!phone}
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white"
              >
                <Phone className="w-4 h-4 mr-2" />
                Llamar
              </Button>
              <Button
                onClick={handleWhatsAppClick}
                disabled={!phone}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Redes sociales */}
        <Card className="border hover:shadow-lg transition-shadow duration-300 bg-purple-50">
          <CardContent className="p-6 flex flex-col items-center">
            <h3 className="text-lg font-bold text-purple-800 mb-4 text-center">
              Síguenos en Redes Sociales
            </h3>
            {socialLinks ? (
              <div className="flex flex-wrap justify-center gap-2">
                {Object.entries(socialLinks).map(([platform, url]) => (
                  <Button
                    key={platform}
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(url, "_blank")}
                  >
                    <Globe className="w-4 h-4 mr-1" />
                    {platform}
                  </Button>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center">
                Sin redes sociales registradas.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Dirección */}
        <Card className="border hover:shadow-lg transition-shadow duration-300 bg-gray-50">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="flex items-center justify-center mb-4">
              <MapPin className="w-8 h-8 text-gray-600 mr-2" />
              <span className="text-xl font-bold text-gray-800">{address}</span>
            </div>
            <Button
              onClick={() =>
                window.open(
                  `https://maps.google.com/?q=${encodeURIComponent(address)}`,
              {normalizedSocialLinks.length > 0 ? (
                )
                  {normalizedSocialLinks.map(({ platform, url }) => {
                    const Icon = getSocialIcon(platform);
                    const href = getHref(url);

                    return (
                      <Button
                        key={`${platform}-${url}`}
                        size="sm"
                        variant="outline"
                        disabled={!href}
                        onClick={() => href && window.open(href, "_blank", "noopener,noreferrer")}
                      >
                        <Icon className="w-4 h-4 mr-1" />
                        {platform}
                      </Button>
                    );
                  })}
      <div className="w-full h-64 md:h-80 bg-gray-200">
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
