// Components
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function LayoutImages() {
  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-2xl md:text-2xl font-bold mb-4 ">
        Galería de imágenes
      </h2>
      <Carousel
        opts={{
          align: "start",
        }}
        className="max-w-full"
      >
        <CarouselContent>
          {Array.from({ length: 10 }).map((_, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center">
                  <Image
                    src={`https://hips.hearstapps.com/hmg-prod/images/le-maise-9-1672919228.jpg`}
                    alt={`Imagen ${index + 1}`}
                    width={800}
                    height={800}
                    className="rounded-md h-full w-full object-cover"
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
