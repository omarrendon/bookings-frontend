// Components
import Image from "next/image";
import Title from "./Title";
import PrimaryButton from "./PrimaryButton";
import { Card, CardContent } from "./card";
// Icons
import { BadgeX, SquarePen } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  price: string;
  time: string;
  imageUrl?: string;
  isEditable?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function ServiceCard({
  title,
  description,
  price,
  time,
  imageUrl,
  isEditable = false,
  onEdit,
  onDelete,
}: ServiceCardProps) {
  const handleEditProduct = () => {
    onEdit?.();
    // Logic to edit the product
  };

  const handleDeleteProduct = () => {
    onDelete?.();
    // Logic to delete the product
  };

  return (
    <Card className="border hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col h-full relative">
      {isEditable && (
        <BadgeX
          className="absolute top-1 right-1 bg-white/80 backdrop-blur-sm rounded-full p-1 hover:bg-white shadow-md z-10 hover:cursor-pointer"
          size={30}
          onClick={handleDeleteProduct}
        />
      )}
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
        <Title text={title} />
        <p className="text-gray-600 mb-2 flex-grow">{description}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-primary font-bold">{price}</span>
          <span className="text-sm text-gray-500">{time}</span>
        </div>
        <PrimaryButton className="w-full" size="icon">
          <SquarePen />
          {isEditable ? "Editar" : "Reservar"}
        </PrimaryButton>
      </CardContent>
    </Card>
  );
}
