"use client";
// Dependencies
import { useState } from "react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// Components
import Image from "next/image";
import { Button } from "@/components/ui/button";
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
import { Barcode, XCircleIcon } from "lucide-react";

type FormValues = z.infer<typeof productFormSchema>;

interface AddProductModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function AddProductModal({
  isOpen,
  onClose,
}: AddProductModalProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const inputErrorClass = "border rounded-md border-red-500";
  const inputTextErrorClass = "text-red-500";
  const form = useForm<FormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      estimated_delivery_hours: "",
      estimated_delivery_minutes: "",
      gallery_images: undefined,
      // stock: 0,
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Submitting form with data:", data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} modal>
      <Form {...form}>
        <DialogContent className="max-h-[90vh] flex flex-col">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col h-full"
          >
            <DialogHeader className="flex flex-col items-start flex-shrink-0">
              <DialogTitle className="text-lg font-semibold -mt-3  text-gray-500">
                Agregar Producto
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-500 mb-4">
                Aquí puedes agregar un nuevo producto a tu inventario.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 flex-1 overflow-y-auto pr-2 max-h-[60vh] sm:max-h-none">
              {/* Product Name */}
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <>
                      <FormLabel>Nombre del Producto</FormLabel>
                      <InputGroup
                        className={`${
                          form.formState.errors.name ? inputErrorClass : ""
                        }`}
                      >
                        <InputGroupInput
                          placeholder="Nombre del Producto"
                          {...field}
                        />
                        <InputGroupAddon>
                          <Barcode
                            className={`${
                              form.formState.errors.name
                                ? inputTextErrorClass
                                : ""
                            }`}
                          />
                        </InputGroupAddon>
                      </InputGroup>
                      <FormMessage />
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
                      <InputGroup
                        className={`${
                          form.formState.errors.description
                            ? inputErrorClass
                            : ""
                        }`}
                      >
                        <InputGroupTextarea
                          placeholder="Agrega la descripción del producto"
                          {...field}
                        />
                        <InputGroupAddon align="block-end">
                          <InputGroupText className="text-muted-foreground text-xs">
                            Máximo 150 caracteres
                          </InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                      <FormMessage />
                    </>
                  )}
                />
              </div>
              {/* Price */}
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <>
                      <FormLabel>Precio del Producto</FormLabel>
                      <InputGroup
                        className={`${
                          form.formState.errors.price ? inputErrorClass : ""
                        }`}
                      >
                        <InputGroupAddon>
                          <InputGroupText
                            className={`${
                              form.formState.errors.price
                                ? inputTextErrorClass
                                : ""
                            }`}
                          >
                            $
                          </InputGroupText>
                        </InputGroupAddon>
                        <InputGroupInput placeholder="0.00" {...field} />
                        <InputGroupAddon align="inline-end">
                          <InputGroupText
                            className={`${
                              form.formState.errors.price
                                ? inputTextErrorClass
                                : ""
                            }`}
                          >
                            MXN
                          </InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                      <FormMessage />
                    </>
                  )}
                />
              </div>
              {/* Estimated Delivery Time */}
              <div className="grid gap-3">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="estimated_delivery_hours"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Horas Estimadas</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Ej. 2 horas"
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
                        <FormLabel>Minutos Estimados</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Ej. 30 minutos"
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
                      <FormLabel>
                        Subir imagen del comprobante de pago
                      </FormLabel>
                      <FormControl>
                        <Input
                          key={preview || "empty"}
                          type="file"
                          accept="image/*"
                          onChange={e => {
                            field.onChange(e.target.files);
                            const file = e.target.files?.[0];
                            if (file) {
                              setPreview(URL.createObjectURL(file));
                              form.setValue("gallery_images", e.target.files);
                            } else {
                              setPreview(null);
                              form.setValue("gallery_images", null);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {preview && (
                  <div className="relative w-fit">
                    <p className="text-sm text-gray-500 mb-2">Vista previa:</p>
                    <Image
                      src={preview}
                      alt="Preview"
                      width={10}
                      height={10}
                      className="w-32 h-24 sm:w-50 sm:h-40 object-cover rounded-md border"
                    />
                    <Button
                      type="button"
                      className="absolute -top-2 -right-2 bg-transparent rounded-full p-1 hover:bg-gray-100"
                      onClick={() => {
                        setPreview(null);
                        form.setValue("gallery_images", null);
                      }}
                      aria-label="Eliminar imagen"
                    >
                      <XCircleIcon
                        className="w-5 h-5 text-gray-500 hover:text-red-500"
                        color="black"
                        size={20}
                      />
                    </Button>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-center mt-6 mb-4 w-full flex-shrink-0 border-t pt-4">
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
