"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart.store";
import { ArrowLeft, CalendarDays } from "lucide-react";
import Link from "next/link";

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
    <div className="flex flex-col sm:flex-row items-center gap-3">
      <Button
        variant="outline"
        className="rounded-full gap-2 border-border/60"
        onClick={handleClick}
      >
        <ArrowLeft className="size-4" />
        Volver al negocio
      </Button>
      <Button
        asChild
        className="rounded-full gap-2 font-medium"
      >
        <Link href={`/business/${businessId}/products`} onClick={() => clearCart()}>
          <CalendarDays className="size-4" />
          Nueva reserva
        </Link>
      </Button>
    </div>
  );
}
