"use client";

import { useRef, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { reservationsApi } from "@/lib/api/reservations.api";
import { customerFormSchema } from "@/lib/schemas/customerFormSchema";
import {
  ArrowRight,
  FileImage,
  Mail,
  MessageSquare,
  Phone,
  Shield,
  Trash2,
  Upload,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

type FormValues = z.infer<typeof customerFormSchema>;

interface CustomerFormProps {
  businessId: string;
}

export default function CustomerForm({ businessId }: CustomerFormProps) {
  const router = useRouter();

  const {
    customerInfo,
    setCustomerInfo,
    selectedProducts,
    selectedDate,
    selectedTime,
  } = useCartStore();

  const { mutateAsync: bookReservation, isPending } = useBookReservation();

  const [proofFile, setProofFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      customer_name: customerInfo?.name ?? "",
      customer_email: customerInfo?.email ?? "",
      customer_phone: customerInfo?.phone ?? "",
      notes: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowed = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
    if (!allowed.includes(file.type)) {
      toast.error("Formato no permitido. Usa JPG, PNG, WEBP o PDF.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("El archivo no puede superar 5 MB.");
      return;
    }

    setProofFile(file);
  };

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

    try {
      // 1. Crear la reserva
      const result = await bookReservation({
        business_id: businessId,
        customer_name: values.customer_name,
        customer_email: values.customer_email,
        customer_phone: values.customer_phone,
        start_time: `${selectedDate}T${selectedTime}:00`,
        products: selectedProducts.map(product => ({
          product_id: product.id.toString(),
          quantity: 1,
        })),
        ...(values.notes ? { notes: values.notes } : {}),
      });

      // 2. Si hay comprobante, subirlo con el ID de la reserva recién creada
      if (proofFile) {
        setIsUploading(true);
        try {
          await reservationsApi.uploadProofOfPayment(
            result.data.reservation.id,
            proofFile,
          );
        } catch {
          toast.error("Reserva creada, pero no se pudo subir el comprobante.");
        } finally {
          setIsUploading(false);
        }
      }

      toast.success("¡Reserva confirmada!", {
        description: "Recibirás un correo con los detalles de tu cita.",
      });
      router.push(`/business/${businessId}/confirmation`);
    } catch {
      // Los errores de bookReservation ya son manejados por el hook (onError)
    }
  };

  const isLoading = isPending || isUploading;

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
          {/* Nombre */}
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

          {/* Correo */}
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

          {/* Teléfono */}
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

          {/* Comprobante de pago */}
          <div className="space-y-1.5">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
              <FileImage className="size-3" />
              Comprobante de pago
              <span className="normal-case font-normal text-muted-foreground/70 ml-1">
                (opcional)
              </span>
            </p>

            {proofFile ? (
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border/80 bg-muted/30">
                <FileImage className="size-4 text-primary shrink-0" />
                <span className="text-sm flex-1 truncate">{proofFile.name}</span>
                <button
                  type="button"
                  onClick={() => {
                    setProofFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                  aria-label="Eliminar comprobante"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                  "w-full flex flex-col items-center gap-2 py-6 rounded-xl border border-dashed border-border/80 bg-muted/20",
                  "hover:border-primary/50 hover:bg-primary/5 transition-colors text-muted-foreground hover:text-primary",
                )}
              >
                <Upload className="size-5" />
                <span className="text-sm">
                  Haz clic para subir tu comprobante
                </span>
                <span className="text-xs opacity-70">
                  JPG, PNG, WEBP o PDF · máx. 5 MB
                </span>
              </button>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,application/pdf"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {/* Notas */}
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                  <MessageSquare className="size-3" />
                  Notas adicionales
                  <span className="normal-case font-normal text-muted-foreground/70 ml-1">
                    (opcional)
                  </span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Ej. Tengo alergia al polvo, prefiero el turno de la mañana..."
                    className="bg-background border-border/80 focus-visible:ring-ring resize-none min-h-[90px]"
                    maxLength={1000}
                    {...field}
                  />
                </FormControl>
                <div className="flex justify-between items-center">
                  <FormMessage />
                  <span className="text-xs text-muted-foreground/60 ml-auto">
                    {(field.value ?? "").length}/1000
                  </span>
                </div>
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
            disabled={isLoading}
            className="w-full rounded-full gap-2 font-medium"
          >
            {isUploading
              ? "Subiendo comprobante..."
              : isPending
                ? "Procesando reserva..."
                : "Finalizar reserva"}
            <ArrowRight className="size-4" />
          </Button>
        </form>
      </Form>
    </div>
  );
}
