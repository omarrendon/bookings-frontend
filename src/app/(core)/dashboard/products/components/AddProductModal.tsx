"use client";
// Dependencies
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// Components
import PrimaryButton from "@/components/ui/PrimaryButton";
import SecondaryButton from "@/components/ui/SecondaryButton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Barcode, SearchIcon, StretchHorizontal } from "lucide-react";
import { MultiImageUpload } from "@/components/ui/MultipleImageUpload";

interface AddProductModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

type FormValues = z.infer<typeof productFormSchema>;

export default function AddProductModal({
  isOpen,
  onClose,
}: AddProductModalProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(productFormSchema),

    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      estimated_delivery_time: 0,
      gallery_images: [],
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} modal>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <DialogContent>
            <DialogHeader className="flex flex-col items-start">
              <DialogTitle className="text-lg font-semibold -mt-3  text-gray-500">
                Agregar Producto
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-500 mb-4">
                Aquí puedes agregar un nuevo producto a tu inventario.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              {/* Product Name */}
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="product_name"
                  render={({ field }) => (
                    <>
                      <FormLabel>Nombre del Producto</FormLabel>
                      <InputGroup>
                        <InputGroupInput placeholder="Nombre del Producto" />
                        <InputGroupAddon>
                          <Barcode />
                        </InputGroupAddon>
                      </InputGroup>
                    </>
                  )}
                />
              </div>
              {/* Description */}
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <>
                      <FormLabel>Descripción</FormLabel>
                      <InputGroup>
                        <InputGroupTextarea placeholder="Agrega la descripción del producto" />
                        <InputGroupAddon align="block-end">
                          <InputGroupText className="text-muted-foreground text-xs">
                            Máximo 150 caracteres
                          </InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                    </>
                  )}
                />
              </div>
              {/* Price, Estimated Delivery Time */}
              <div className="grid gap-3">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Precio</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Ej. 250.00"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="estimated_delivery_time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tiempo Estimado</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Ej. 2h"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="gallery_images"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Imágenes del Producto</FormLabel>
                      <FormControl>
                        <MultiImageUpload />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-center ">
              <SecondaryButton className="mr-2" onClick={onClose}>
                Cancelar
              </SecondaryButton>
              <PrimaryButton type="submit">Agregar</PrimaryButton>
            </div>
          </DialogContent>
        </form>
      </Form>
    </Dialog>
  );
}
