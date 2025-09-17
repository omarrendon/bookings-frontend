"use client";
// Components
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Phone,
  MessageCircle,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Mail,
} from "lucide-react";

const businessData = {
  phone: "(+876) 765 665",
  whatsapp: "(+876) 765 665",
  email: "mail@influenca.id",
  address: "London Eye London",
  location:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
  socialMedia: {
    facebook: "https://facebook.com/business",
    instagram: "https://instagram.com/business",
    twitter: "https://twitter.com/business",
  },
};

export default function ContactBusiness() {
  const handleWhatsAppClick = () => {
    const phoneNumber = businessData.whatsapp.replace(/[^\d]/g, "");
    const message = encodeURIComponent(
      "Hola, me gustaría más información sobre sus servicios."
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  const handleCallClick = () => {
    window.open(`tel:${businessData.phone}`, "_self");
  };

  const handleEmailClick = () => {
    window.open(`mailto:${businessData.email}`, "_self");
  };

  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-2xl md:text-2xl font-bold mb-8">
        Información de Contacto
      </h2>

      {/* Primera fila: Teléfono/WhatsApp y Email */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6  w-full mb-10 px-10">
        {/* Card de Teléfono/WhatsApp */}
        <Card className="border hover:shadow-lg transition-shadow duration-300 bg-teal-100">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="flex items-center justify-center mb-4">
              <Phone className="w-8 h-8 text-teal-600 mr-2" />
              <span className="text-xl font-bold text-teal-800">
                {businessData.phone}
              </span>
            </div>
            <p className="text-gray-600 mb-4 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor
            </p>
            <div className="flex gap-2 w-full">
              <Button
                onClick={handleCallClick}
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white"
              >
                <Phone className="w-4 h-4 mr-2" />
                Llamar
              </Button>
              <Button
                onClick={handleWhatsAppClick}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
            </div>
          </CardContent>
        </Card>
        {/* Card de Redes Sociales */}
        <Card className="border hover:shadow-lg transition-shadow duration-300 bg-purple-50">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-purple-800 mb-4 text-center">
              Síguenos en Redes Sociales
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                onClick={() =>
                  window.open(businessData.socialMedia.facebook, "_blank")
                }
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white p-3"
              >
                <Facebook className="w-5 h-5" />
              </Button>
              <Button
                onClick={() =>
                  window.open(businessData.socialMedia.instagram, "_blank")
                }
                size="sm"
                className="bg-pink-600 hover:bg-pink-700 text-white p-3"
              >
                <Instagram className="w-5 h-5" />
              </Button>
              <Button
                onClick={() =>
                  window.open(businessData.socialMedia.twitter, "_blank")
                }
                size="sm"
                className="bg-sky-600 hover:bg-sky-700 text-white p-3"
              >
                <Twitter className="w-5 h-5" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Card de Dirección */}
        <Card className="border hover:shadow-lg transition-shadow duration-300 bg-gray-50">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="flex items-center justify-center mb-4">
              <MapPin className="w-8 h-8 text-gray-600 mr-2" />
              <span className="text-xl font-bold text-gray-800">
                {businessData.address}
              </span>
            </div>
            <p className="text-gray-600 mb-4 text-sm">
              {businessData.location}
            </p>
            <Button
              onClick={() =>
                window.open(
                  `https://maps.google.com/?q=${encodeURIComponent(
                    businessData.address
                  )}`,
                  "_blank"
                )
              }
              className="w-full bg-gray-600 hover:bg-gray-700 text-white"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Ver en Maps
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Mapa */}
      <div className="w-full">
        <div className="w-full h-64 md:h-80 bg-gray-200 relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.540769105379!2d-0.11960568422901434!3d51.503399879636206!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604b900d26973%3A0x4291f3172409ea92!2sLondon%20Eye!5e0!3m2!1sen!2suk!4v1635000000000!5m2!1sen!2suk"
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación del negocio"
          />
          <div className="absolute top-4 left-4 bg-white p-3 rounded-lg shadow-lg">
            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-red-600 mr-2" />
              <div>
                <p className="font-semibold text-sm">London Eye London</p>
                <p className="text-xs text-gray-600">
                  London SE1 7PB, Reino Unido
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
