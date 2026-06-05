"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useCartStore } from "@/store/cart.store";
import { useBookReservation } from "@/hooks/useReservations";
import { customerFormSchema } from "@/lib/schemas/customerFormSchema";
import { ArrowRight, Mail, Phone, Shield, User } from "lucide-react";

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
    <div className="bg-card rounded-2xl border border-border/60 overflow-hidden shadow-sm">
      {/* Encabezado */}
      <div className="px-6 py-5 border-b border-border/60 bg-muted/20">
        <div className="flex items-center gap-2 mb-0.5">
          <User className="size-5 text-primary" />
          <h2 className="text-lg font-semibold tracking-tight">Tus datos</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Esta información se usará para confirmar y gestionar tu cita
        </p>
      </div>

      {/* Formulario */}
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
                <FormLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                  <User className="size-3" />
                  Nombre completo
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ej. María López"
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
            name="customer_email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                  <Mail className="size-3" />
                  Correo electrónico
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Ej. maria@correo.com"
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
            name="customer_phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                  <Phone className="size-3" />
                  Número de teléfono
                </FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="Ej. 5512345678"
                    className="bg-background border-border/80 focus-visible:ring-ring"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Nota de privacidad */}
          <div className="flex items-start gap-2 p-3 rounded-xl bg-muted/40 border border-border/60">
            <Shield className="size-4 text-muted-foreground shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              Tus datos personales se usan exclusivamente para gestionar tu
              reserva y nunca se comparten con terceros.
            </p>
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={isPending}
            className="w-full rounded-full gap-2 font-medium"
          >
            {isPending ? "Procesando reserva..." : "Finalizar reserva"}
            <ArrowRight className="size-4" />
          </Button>
        </form>
      </Form>
    </div>
  );
}
