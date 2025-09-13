import React from "react";
import { Card, CardContent } from "./card";
import Image from "next/image";
import { Button } from "./button";

interface ServiceCardProps {
  title: string;
  description: string;
  price: string;
  time: string;
  imageUrl?: string;
}

export default function ServiceCard({
  title,
  description,
  price,
  time,
  imageUrl,
}: ServiceCardProps) {
  return (
    <Card className="border hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col h-full">
      <Image
        src={
          imageUrl ||
          "https://hips.hearstapps.com/hmg-prod/images/le-maise-9-1672919228.jpg"
        }
        alt={`Imagen del servicio ${title}`}
        width={400}
        height={400}
        className="w-full h-60 object-cover -mt-6"
      />
      <CardContent className="px-4 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold ">{title}</h3>
        <p className="text-gray-600 mb-2 flex-grow">{description}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-pink-500 font-bold">{price}</span>
          <span className="text-sm text-gray-500">{time}</span>
        </div>
        <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer">
          Reservar
        </Button>
      </CardContent>
    </Card>
  );
}
