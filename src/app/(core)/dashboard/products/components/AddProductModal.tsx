"use client";
// Dependencies
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// Components
import PrimaryButton from "@/components/ui/PrimaryButton";
import SecondaryButton from "@/components/ui/SecondaryButton";
import { MultiImageUpload } from "@/components/ui/MultipleImageUpload";
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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
// Schemas
import { productFormSchema } from "@/lib/schemas/productFormaSchema";
// Icons
import { Barcode } from "lucide-react";
import { Button } from "@/components/ui/button";

type FormValues = z.infer<typeof productFormSchema>;

interface AddProductModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function AddProductModal({
  isOpen,
  onClose,
}: AddProductModalProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "0",
      // gallery_images: undefined,
      // stock: 0,
      estimated_delivery_time: "0",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Submitting form with data:", data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} modal>
      <Form {...form}>
        <DialogContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
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
                  name="name"
                  render={({ field }) => (
                    <>
                      <FormLabel>Nombre del Producto</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ingresa el nombre del producto"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      {/* <InputGroup>
                        <InputGroupInput placeholder="Nombre del Producto" />
                        <InputGroupAddon>
                          <Barcode />
                        </InputGroupAddon>
                      </InputGroup> */}
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
                      <FormControl>
                        <Input
                          placeholder="Agrega la descripción del producto"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      {/* <InputGroup>
                        <InputGroupTextarea placeholder="Agrega la descripción del producto" />
                        <InputGroupAddon align="block-end">
                          <InputGroupText className="text-muted-foreground text-xs">
                            Máximo 150 caracteres
                          </InputGroupText>
                        </InputGroupAddon>
                      </InputGroup> */}
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
                            type="text"
                            placeholder="Ej. 2h 30m"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              {/* <div className="grid gap-3">
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
              </div> */}
            </div>

            <div className="flex justify-center mt-2">
              <SecondaryButton className="mr-2 flex-1" onClick={onClose}>
                Cancelar
              </SecondaryButton>
              <PrimaryButton className="flex-1" type="submit">
                Agregar
              </PrimaryButton>
            </div>
          </form>
        </DialogContent>
      </Form>
    </Dialog>
  );
}
