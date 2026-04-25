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
import { ImagePlus, Upload, X } from "lucide-react";

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

  // Poblar el form al abrir en modo edición
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
        // Actualizar datos del producto
        await updateProduct.mutateAsync({
          productId: product.id.toString(),
          data: {
            name: values.name,
            description: values.description,
            price: parseFloat(values.price),
            estimated_delivery_time: estimatedMinutes,
          },
        });

        // Eliminar imágenes marcadas para borrar
        if (removedImageIds.length > 0) {
          await Promise.all(removedImageIds.map(id => productsApi.deleteImage(id)));
        }

        // Subir imágenes nuevas si las hay
        if (selectedFiles.length > 0) {
          await productsApi.uploadGallery(product.id.toString(), selectedFiles);
        }

        // Refetch con la info más reciente una vez completadas todas las operaciones
        await queryClient.invalidateQueries({
          queryKey: productKeys.byBusiness(businessId),
        });
      } else {
        // Crear el producto
        const response = await createProduct.mutateAsync({
          name: values.name,
          description: values.description,
          price: parseFloat(values.price),
          estimated_delivery_time: estimatedMinutes,
          business_id: businessId,
        });

        // Subir imágenes al producto recién creado
        if (selectedFiles.length > 0) {
          await productsApi.uploadGallery(response.data.id.toString(), selectedFiles);
        }

        // Refetch con las imágenes ya subidas
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
      <DialogContent className="max-h-[90vh] flex flex-col gap-0 p-0 overflow-hidden">
        <DialogHeader className="px-6 py-5 border-b flex-shrink-0">
          <DialogTitle className="text-base font-semibold">
            {isEditing ? "Editar servicio" : "Agregar servicio"}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {isEditing
              ? "Modifica la información del servicio."
              : "Completa la información para agregar un nuevo servicio."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col flex-1 overflow-hidden"
          >
            <div className="flex flex-col gap-5 overflow-y-auto px-6 py-5">
              {/* Nombre */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Nombre del servicio{" "}
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Ej. Corte de cabello" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Descripción */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe brevemente el servicio..."
                        className="resize-none"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Precio */}
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Precio (MXN) <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="0.00"
                        type="number"
                        min="0"
                        step="0.01"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Duración estimada */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="estimated_delivery_hours"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Horas <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="0"
                          type="number"
                          min="0"
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
                      <FormLabel>Minutos</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="0"
                          type="number"
                          min="0"
                          max="59"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Imágenes */}
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium leading-none">
                  Imágenes del servicio{" "}
                  <span className="text-muted-foreground font-normal">
                    (máx. {MAX_IMAGES})
                  </span>
                </span>
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
                    className="w-full flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border hover:border-primary/50 hover:bg-muted/40 transition-colors py-8 cursor-pointer"
                  >
                    <Upload className="size-6 text-muted-foreground" />
                    <span className="text-sm font-medium text-muted-foreground">
                      Haz clic para seleccionar imágenes
                    </span>
                    <span className="text-xs text-muted-foreground/70">
                      PNG, JPG, WEBP — máx. recomendado 2 MB c/u
                    </span>
                  </button>
                ) : (
                  <div className="flex flex-col gap-2">
                    <div className="grid grid-cols-3 gap-2">
                      {/* Imágenes existentes (modo edición) */}
                      {existingImages.map(img => (
                        <div
                          key={img.id}
                          className="relative aspect-square rounded-xl overflow-hidden border"
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
                            className="absolute top-1.5 right-1.5 size-6 rounded-full bg-background/80 hover:bg-background flex items-center justify-center transition-colors shadow-sm"
                          >
                            <X className="size-3" />
                          </button>
                        </div>
                      ))}

                      {/* Nuevas imágenes seleccionadas */}
                      {previews.map((src, i) => (
                        <div
                          key={`new-${i}`}
                          className="relative aspect-square rounded-xl overflow-hidden border ring-1 ring-primary/40"
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
                            className="absolute top-1.5 right-1.5 size-6 rounded-full bg-background/80 hover:bg-background flex items-center justify-center transition-colors shadow-sm"
                          >
                            <X className="size-3" />
                          </button>
                        </div>
                      ))}

                      {/* Botón agregar más */}
                      {totalImages < MAX_IMAGES && (
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="aspect-square rounded-xl border-2 border-dashed border-border hover:border-primary/50 hover:bg-muted/40 transition-colors flex flex-col items-center justify-center gap-1 cursor-pointer"
                        >
                          <ImagePlus className="size-5 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            Agregar
                          </span>
                        </button>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {totalImages}/{MAX_IMAGES} imágenes
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex gap-3 px-6 py-4 border-t flex-shrink-0">
              <Button
                type="button"
                variant="outline"
                className="flex-1 rounded-full"
                onClick={handleClose}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="flex-1 rounded-full"
                disabled={isPending}
              >
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
