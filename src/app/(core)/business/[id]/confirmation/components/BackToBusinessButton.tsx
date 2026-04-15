"use client";
// Dependencies
import { useRouter } from "next/navigation";
// Components
import { Button } from "@/components/ui/button";
// Store
import { useCartStore } from "@/store/cart.store";
// Icons
import { Home } from "lucide-react";

interface BackToBusinessButtonProps {
  businessId: string;
}

export default function BackToBusinessButton({
  businessId,
}: BackToBusinessButtonProps) {
  const router = useRouter();
  const { clearCart } = useCartStore();

  const handleClick = () => {
    clearCart();
    router.push(`/business/${businessId}`);
  };

  return (
    <Button
      variant="outline"
      className="rounded-full gap-2"
      onClick={handleClick}
    >
      <Home className="size-4" />
      Volver al negocio
    </Button>
  );
}
