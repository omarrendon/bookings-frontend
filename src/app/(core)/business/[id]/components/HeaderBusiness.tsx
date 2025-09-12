import { Button } from "@/components/ui/button";

interface HeaderBusinessProps {
  businessName?: string;
  description?: string;
  imageUrl?: string;
}

export default function HeaderBusiness({
  businessName = "Glitter and Shine",
  description = "Salón de belleza especializado en manicura y pedicura con los mejores tratamientos",
  imageUrl = "https://hips.hearstapps.com/hmg-prod/images/le-maise-9-1672919228.jpg",
}: HeaderBusinessProps) {
  return (
    <div className="relative w-full h-[70vh] min-h-[400px] overflow-hidden">
      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      >
        {/* Overlay para mejorar la legibilidad del texto */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      {/* Contenido superpuesto */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full px-4 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
          {businessName}
        </h1>

        <p className="text-lg md:text-xl mb-8 max-w-2xl drop-shadow-md leading-relaxed">
          {description}
        </p>
        <Button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-5 px-8  transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer">
          Reservar Ahora
        </Button>
      </div>
    </div>
  );
}
