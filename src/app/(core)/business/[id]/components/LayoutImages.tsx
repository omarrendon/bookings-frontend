import Image from "next/image";
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
    <section id="fotos" className="py-14 bg-muted/40">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight">Galería</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {images.length} {images.length === 1 ? "foto" : "fotos"}
          </p>
        </div>
        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-3">
            {images.map((src, index) => (
              <CarouselItem
                key={index}
                className="pl-3 basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
                  <Image
                    src={src}
                    alt={`Imagen ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="shadow-md" />
          <CarouselNext className="shadow-md" />
        </Carousel>
      </div>
    </section>
  );
}
