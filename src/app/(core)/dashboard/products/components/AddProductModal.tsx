"use client";
// Dependencies
import { useEffect, useRef, useState } from "react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
// Schemas
import { productFormSchema } from "@/lib/schemas/productFormaSchema";
// Hooks & store
import { useCreateProduct, useUpdateProduct, productKeys } from "@/hooks/useProducts";
import { useBusinessStore } from "@/store/business.store";
import { useQueryClient } from "@tanstack/react-query";
// API
import { productsApi } from "@/lib/api/products.api";
// Types
import type { Product, ProductImage } from "@/lib/api/types";
// Icons
import {
  Clock,
  ImagePlus,
  Loader2,
  Package,
  Tag,
  Upload,
  X,
} from "lucide-react";

type FormValues = z.infer<typeof productFormSchema>;

interface AddProductModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  product?: Product | null;
  onSuccess?: () => void;
}

export default function AddProductModal({
  isOpen,
  onClose,
  product,
  onSuccess,
}: AddProductModalProps) {
  const isEditing = !!product;

  const business = useBusinessStore(state => state.business);
  const businessId = business?.id?.toString() ?? "";
  const createProduct = useCreateProduct(businessId);
  const updateProduct = useUpdateProduct(businessId);
  const queryClient = useQueryClient();

  const MAX_IMAGES = 5;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [existingImages, setExistingImages] = useState<ProductImage[]>([]);
  const [removedImageIds, setRemovedImageIds] = useState<number[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const totalImages = existingImages.length + selectedFiles.length;

  const form = useForm<FormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      estimated_delivery_hours: "",
      estimated_delivery_minutes: "",
    },
  });

  const { reset } = form;

  useEffect(() => {
    if (!isOpen) return;

    if (product) {
      const totalMins = parseFloat(product.estimated_delivery_time);
      const h = Math.floor(totalMins / 60);
      const m = Math.round(totalMins % 60);

      reset({
        name: product.name,
        description: product.description ?? "",
        price: parseFloat(product.price).toFixed(2),
        estimated_delivery_hours: h.toString(),
        estimated_delivery_minutes: m > 0 ? m.toString() : "",
      });

      const sorted = [...product.images].sort((a, b) => a.order - b.order);
      setExistingImages(sorted);
    } else {
      reset({
        name: "",
        description: "",
        price: "",
        estimated_delivery_hours: "",
        estimated_delivery_minutes: "",
      });
      setExistingImages([]);
    }
  }, [isOpen, product, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files ?? []);
    if (!newFiles.length) return;

    const remaining = MAX_IMAGES - totalImages;
    const filesToAdd = newFiles.slice(0, remaining);

    setSelectedFiles(prev => [...prev, ...filesToAdd]);
    setPreviews(prev => [...prev, ...filesToAdd.map(f => URL.createObjectURL(f))]);

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemoveExistingImage = (id: number) => {
    setExistingImages(prev => prev.filter(img => img.id !== id));
    setRemovedImageIds(prev => [...prev, id]);
  };

  const handleRemoveNewImage = (index: number) => {
    URL.revokeObjectURL(previews[index]);
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleClose = () => {
    form.reset();
    previews.forEach(p => URL.revokeObjectURL(p));
    setPreviews([]);
    setSelectedFiles([]);
    setExistingImages([]);
    setRemovedImageIds([]);
    onClose?.();
  };

  const onSubmit = async (values: FormValues) => {
    try {
      const estimatedMinutes =
        (parseInt(values.estimated_delivery_hours) || 0) * 60 +
        (parseInt(values.estimated_delivery_minutes ?? "0") || 0);

      if (isEditing) {
        await updateProduct.mutateAsync({
          productId: product.id.toString(),
          data: {
            name: values.name,
            description: values.description,
            price: parseFloat(values.price),
            estimated_delivery_time: estimatedMinutes,
          },
        });

        if (removedImageIds.length > 0) {
          await Promise.all(removedImageIds.map(id => productsApi.deleteImage(id)));
        }

        if (selectedFiles.length > 0) {
          await productsApi.uploadGallery(product.id.toString(), selectedFiles);
        }

        await queryClient.invalidateQueries({
          queryKey: productKeys.byBusiness(businessId),
        });
      } else {
        const response = await createProduct.mutateAsync({
          name: values.name,
          description: values.description,
          price: parseFloat(values.price),
          estimated_delivery_time: estimatedMinutes,
          business_id: businessId,
        });

        if (selectedFiles.length > 0) {
          await productsApi.uploadGallery(response.data.id.toString(), selectedFiles);
        }

        await queryClient.invalidateQueries({
          queryKey: productKeys.byBusiness(businessId),
        });
      }

      onSuccess?.();
      handleClose();
    } catch {
      // El hook ya muestra el toast de error — el modal permanece abierto para reintentar
    }
  };

  const isPending =
    form.formState.isSubmitting ||
    createProduct.isPending ||
    updateProduct.isPending;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] flex flex-col gap-0 p-0 overflow-hidden sm:max-w-lg">
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-5 border-b flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Package className="size-5 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold leading-tight">
                {isEditing ? "Editar servicio" : "Nuevo servicio"}
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground mt-0.5">
                {isEditing
                  ? "Modifica la información del servicio."
                  : "Completa los datos para agregar un nuevo servicio."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col flex-1 overflow-hidden"
          >
            <div className="flex flex-col gap-6 overflow-y-auto px-6 py-5">

              {/* Sección: Información básica */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Tag className="size-3.5 text-primary" />
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Información básica
                  </span>
                </div>

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Nombre <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ej. Corte de cabello"
                          className="bg-background border-border/80 focus-visible:ring-ring"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Descripción
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe brevemente el servicio..."
                          className="resize-none bg-background border-border/80 focus-visible:ring-ring"
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator />

              {/* Sección: Precio y duración */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Clock className="size-3.5 text-primary" />
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Precio y duración
                  </span>
                </div>

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Precio (MXN) <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground select-none">
                            $
                          </span>
                          <Input
                            placeholder="0.00"
                            type="number"
                            min="0"
                            step="0.01"
                            className="pl-7 bg-background border-border/80 focus-visible:ring-ring"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-3">
                  <FormField
                    control={form.control}
                    name="estimated_delivery_hours"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          Horas <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="0"
                            type="number"
                            min="0"
                            className="bg-background border-border/80 focus-visible:ring-ring"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="estimated_delivery_minutes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          Minutos
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="0"
                            type="number"
                            min="0"
                            max="59"
                            className="bg-background border-border/80 focus-visible:ring-ring"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />

              {/* Sección: Imágenes */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ImagePlus className="size-3.5 text-primary" />
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Imágenes del servicio
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {totalImages}/{MAX_IMAGES}
                  </span>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageChange}
                />

                {totalImages === 0 ? (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border hover:border-primary/50 hover:bg-primary/5 transition-colors py-8 cursor-pointer group"
                    aria-label="Seleccionar imágenes"
                  >
                    <div className="flex size-10 items-center justify-center rounded-full bg-muted group-hover:bg-primary/10 transition-colors">
                      <Upload className="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div className="space-y-0.5 text-center">
                      <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                        Haz clic para seleccionar imágenes
                      </p>
                      <p className="text-xs text-muted-foreground/70">
                        PNG, JPG, WEBP — máx. recomendado 2 MB c/u
                      </p>
                    </div>
                  </button>
                ) : (
                  <div className="grid grid-cols-3 gap-2">
                    {existingImages.map(img => (
                      <div
                        key={img.id}
                        className="relative aspect-square rounded-xl overflow-hidden border border-border/60"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={img.url}
                          alt={`Imagen ${img.order + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveExistingImage(img.id)}
                          className="absolute top-1.5 right-1.5 size-6 rounded-full bg-background/80 hover:bg-destructive/10 hover:text-destructive flex items-center justify-center transition-colors shadow-sm"
                          aria-label="Eliminar imagen"
                        >
                          <X className="size-3" />
                        </button>
                      </div>
                    ))}

                    {previews.map((src, i) => (
                      <div
                        key={`new-${i}`}
                        className="relative aspect-square rounded-xl overflow-hidden border border-primary/40 ring-1 ring-primary/20"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={src}
                          alt={`Nueva imagen ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveNewImage(i)}
                          className="absolute top-1.5 right-1.5 size-6 rounded-full bg-background/80 hover:bg-destructive/10 hover:text-destructive flex items-center justify-center transition-colors shadow-sm"
                          aria-label="Eliminar imagen nueva"
                        >
                          <X className="size-3" />
                        </button>
                      </div>
                    ))}

                    {totalImages < MAX_IMAGES && (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="aspect-square rounded-xl border-2 border-dashed border-border hover:border-primary/50 hover:bg-primary/5 transition-colors flex flex-col items-center justify-center gap-1 cursor-pointer group"
                        aria-label="Agregar más imágenes"
                      >
                        <ImagePlus className="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">
                          Agregar
                        </span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex gap-3 px-6 py-4 border-t bg-muted/30 flex-shrink-0">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={handleClose}
                disabled={isPending}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="flex-1 gap-2"
                disabled={isPending}
              >
                {isPending && <Loader2 className="size-4 animate-spin" />}
                {isPending
                  ? "Guardando..."
                  : isEditing
                    ? "Guardar cambios"
                    : "Agregar servicio"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
