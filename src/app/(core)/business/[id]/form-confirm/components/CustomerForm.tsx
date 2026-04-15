"use client";
// Dependencies
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// Components
// import Image from "next/image";
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
import { toast } from "sonner";
// Store
import { useCartStore } from "@/store/cart.store";
// Hooks
import { useBookReservation } from "@/hooks/useReservations";
// Schemas
import { customerFormSchema } from "@/lib/schemas/customerFormSchema";
// Icons
import { ArrowRight } from "lucide-react";

type FormValues = z.infer<typeof customerFormSchema>;

interface CustomerFormProps {
  businessId: string;
}

export default function CustomerForm({ businessId }: CustomerFormProps) {
  const {
    customerInfo,
    setCustomerInfo,
    selectedProducts,
    selectedDate,
    selectedTime,
  } = useCartStore();

  const { mutate: bookReservation, isPending } = useBookReservation(businessId);

  const form = useForm<FormValues>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      customer_name: customerInfo?.name ?? "",
      customer_email: customerInfo?.email ?? "",
      customer_phone: customerInfo?.phone ?? "",
      // proof_of_payment: undefined,
    },
  });

  const onSubmit = async (values: FormValues) => {
    if (!selectedDate || !selectedTime) {
      toast.warning("Selecciona fecha y hora antes de continuar.");
      return;
    }
    if (selectedProducts.length === 0) {
      toast.warning("No tienes servicios seleccionados.");
      return;
    }

    setCustomerInfo({
      name: values.customer_name,
      email: values.customer_email,
      phone: values.customer_phone,
    });

    bookReservation({
      business_id: businessId,
      customer_name: values.customer_name,
      customer_email: values.customer_email,
      customer_phone: values.customer_phone,
      start_time: `${selectedDate}T${selectedTime}:00`,
      products: selectedProducts.map(product => ({
        product_id: product.id.toString(),
        quantity: 1,
      })),
    });
  };

  return (
    <div className="bg-card rounded-2xl border overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b">
        <h2 className="text-lg font-semibold tracking-tight">Tus datos</h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          Esta información se usará para confirmar y gestionar tu cita
        </p>
      </div>

      {/* Form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="p-6 flex flex-col gap-5"
        >
          <FormField
            control={form.control}
            name="customer_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre completo</FormLabel>
                <FormControl>
                  <Input placeholder="Ej. María López" {...field} />
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
                <FormLabel>Correo electrónico</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Ej. maria@correo.com"
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
                <FormLabel>Número de teléfono</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="Ej. 5512345678" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* File upload */}
          {/* <FormField
            control={form.control}
            name="proof_of_payment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comprobante de pago</FormLabel>
                <FormControl>
                  <Fragment>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={e => {
                        const file = e.target.files?.[0];
                        if (file) {
                          field.onChange(e.target.files);
                          setPreview(URL.createObjectURL(file));
                        } else {
                          field.onChange(undefined);
                          setPreview(null);
                        }
                      }}
                    />
                    {!preview ? (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border hover:border-primary/50 hover:bg-muted/40 transition-colors py-8 cursor-pointer"
                      >
                        <Upload className="size-6 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Haz clic para subir tu comprobante
                        </span>
                        <span className="text-xs text-muted-foreground/70">
                          PNG, JPG, WEBP — máx. 5 MB
                        </span>
                      </button>
                    ) : (
                      <div className="relative w-fit">
                        <Image
                          src={preview}
                          alt="Comprobante de pago"
                          width={160}
                          height={160}
                          className="h-40 w-auto object-cover rounded-xl border"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setPreview(null);
                            form.resetField("proof_of_payment");
                            if (fileInputRef.current)
                              fileInputRef.current.value = "";
                          }}
                          className="absolute -top-2 -right-2 size-6 rounded-full bg-destructive flex items-center justify-center shadow-sm"
                          aria-label="Eliminar imagen"
                        >
                          <X className="size-3 text-destructive-foreground" />
                        </button>
                      </div>
                    )}
                  </Fragment>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          <Button
            type="submit"
            size="lg"
            disabled={isPending}
            className="mt-2 w-full rounded-full gap-2"
          >
            {isPending ? "Enviando..." : "Confirmar reserva"}
            {<ArrowRight className="size-4" />}
          </Button>
        </form>
      </Form>
    </div>
  );
}
