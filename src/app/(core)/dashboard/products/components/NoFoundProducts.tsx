"use client";
// Icons
import { PackageOpen, Plus } from "lucide-react";
// Components
import { Button } from "@/components/ui/button";

interface NoFoundProductsProps {
  onAdd: () => void;
}

export default function NoFoundProducts({ onAdd }: NoFoundProductsProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center gap-3 rounded-2xl border-2 border-dashed border-border">
      <PackageOpen className="size-10 text-muted-foreground/40" />
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium">Sin productos registrados</p>
        <p className="text-sm text-muted-foreground max-w-xs">
          Agrega tu primer producto para que tus clientes puedan verlo y
          reservarlo.
        </p>
      </div>
      <Button
        variant="outline"
        size="sm"
        className="rounded-full gap-1.5 mt-1"
        onClick={onAdd}
      >
        <Plus className="size-3.5" />
        Agregar producto
      </Button>
    </div>
  );
}
