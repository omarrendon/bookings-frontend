# Ejemplo de referencia — ProductCard

Componente completo que cumple todas las reglas del skill.
Úsalo como referencia de cómo debe verse un componente bien construido.

```tsx
// components/product-card.tsx
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Package, ShoppingCart } from "lucide-react";

interface ProductCardProps {
  name: string;
  price: number;
  stock: number;
  category: string;
  onAddToCart: (id: string) => void;
  isLoading?: boolean;
}

// Loading state
export function ProductCardSkeleton() {
  return (
    <Card className="border-border/60 bg-card shadow-sm">
      <CardHeader className="pb-3 space-y-2">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-4 w-1/3" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-1/2" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-9 w-full" />
      </CardFooter>
    </Card>
  );
}

// Componente principal
export function ProductCard({
  name,
  price,
  stock,
  category,
  onAddToCart,
  isLoading = false,
}: ProductCardProps) {
  if (isLoading) return <ProductCardSkeleton />;

  const inStock = stock > 0;

  return (
    <Card className="border-border/60 bg-card shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1">
            <p className="text-lg font-semibold leading-tight">{name}</p>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {category}
            </p>
          </div>
          <Badge
            variant="secondary"
            className={
              inStock
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-0 shrink-0"
                : "bg-destructive/10 text-destructive border-0 shrink-0"
            }
          >
            {inStock ? `${stock} en stock` : "Agotado"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <p className="text-2xl font-bold tracking-tight">
          ${price.toLocaleString("es-MX")}
          <span className="text-sm font-normal text-muted-foreground ml-1">
            MXN
          </span>
        </p>
      </CardContent>

      <CardFooter>
        <Button
          className="w-full gap-2 font-medium"
          disabled={!inStock}
          onClick={() => onAddToCart(name)}
          aria-label={`Agregar ${name} al carrito`}
        >
          <ShoppingCart className="h-4 w-4" />
          {inStock ? "Agregar al carrito" : "Sin disponibilidad"}
        </Button>
      </CardFooter>
    </Card>
  );
}

// Empty state para lista de productos
export function ProductListEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center space-y-3">
      <div className="rounded-full bg-muted p-4">
        <Package className="h-8 w-8 text-muted-foreground" />
      </div>
      <div className="space-y-1">
        <p className="font-medium">No hay productos</p>
        <p className="text-sm text-muted-foreground max-w-xs">
          Agrega tu primer producto para que aparezca aquí.
        </p>
      </div>
      <Button size="sm" className="mt-2 gap-2">
        <Package className="h-4 w-4" />
        Agregar producto
      </Button>
    </div>
  );
}
```
