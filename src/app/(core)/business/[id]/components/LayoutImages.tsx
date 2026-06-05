import Image from "next/image";
import { Images } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface LayoutImagesProps {
  images: string[];
}

export default function LayoutImages({ images }: LayoutImagesProps) {
  return (
    <section id="fotos" className="py-16 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Encabezado de sección */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-medium mb-3">
              <Images className="size-3" />
              Galería
            </div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Nuestras instalaciones
            </h2>
          </div>
          <span className="text-sm text-muted-foreground pb-1">
            {images.length} {images.length === 1 ? "foto" : "fotos"}
          </span>
        </div>

        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-3">
            {images.map((src, index) => (
              <CarouselItem
                key={index}
                className="pl-3 basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group shadow-sm hover:shadow-md transition-shadow duration-200">
                  <Image
                    src={src}
                    alt={`Foto ${index + 1} del negocio`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Overlay sutil en hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="shadow-md border-border/60 hover:border-primary/40" />
          <CarouselNext className="shadow-md border-border/60 hover:border-primary/40" />
        </Carousel>
      </div>
    </section>
  );
}
