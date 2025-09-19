"use client";
// Dependencies
import z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// Components
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ModalErrorForm from "./ModalErrorForm";
// Schemas
import { customerFormSchema } from "@/lib/schemas/customerFormSchema";
// Icons
import { XCircleIcon } from "lucide-react";

type FormValues = z.infer<typeof customerFormSchema>;

export default function CustomerForm() {
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      customer_email: "",
      customer_name: "",
      customer_phone: "",
      proof_of_payment: undefined,
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <div className="w-full flex flex-col my-10 px-4">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Reserva de cita</h2>
        <p className="mb-4">
          Por favor, completa el siguiente formulario para reservar tu cita.
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-lg mx-auto flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="customer_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre Completo</FormLabel>
                <FormControl>
                  <Input placeholder="Ingresa tu nombre completo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="customer_email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo Electrónico</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Ingresa tu correo electrónico"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="customer_phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número de Teléfono</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ingresa tu número de teléfono"
                    type="tel"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="proof_of_payment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subir imagen del comprobante de pago</FormLabel>
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
                        form.setValue("proof_of_payment", e.target.files);
                      } else {
                        setPreview(null);
                        form.setValue("proof_of_payment", null);
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {preview && (
            <div className="mt-4 relative w-fit">
              <p className="text-sm text-gray-500 mb-2">Vista previa:</p>
              <Image
                src={preview}
                alt="Preview"
                width={160}
                height={160}
                className="w-50 h-40 object-cover rounded-md border"
              />
              <Button
                type="button"
                className="absolute top-1 -right-5 bg-transparent rounded-full p-1  hover:bg-gray-100"
                onClick={() => {
                  setPreview(null);
                  form.setValue("proof_of_payment", null);
                }}
                aria-label="Eliminar imagen"
              >
                <XCircleIcon
                  className="w-6 h-6 text-gray-500 hover:text-red-500"
                  color="black"
                  size={32}
                />
              </Button>
            </div>
          )}
          <Button
            type="submit"
            className="mt-4 bg-pink-600 hover:bg-pink-700 text-white"
          >
            Enviar
          </Button>
        </form>
      </Form>
      <ModalErrorForm />
    </div>
  );
}
