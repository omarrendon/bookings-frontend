"use client";
// Dependencies
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// Components
import Link from "next/link";
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
// Schemas
import { resetPasswordEmailFormSchema } from "@/lib/schemas/loginFormSchema";
// Hooks
import { useRequestPasswordReset } from "@/hooks/useAuth";
// Icons
import { ArrowLeft, Mail } from "lucide-react";

type FormValues = z.infer<typeof resetPasswordEmailFormSchema>;

export default function ResetPasswordEmailForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(resetPasswordEmailFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const { isSubmitting } = form.formState;
  const requestReset = useRequestPasswordReset();

  const onSubmit = async (values: FormValues) => {
    await requestReset.mutateAsync({ email: values.email });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
          <Mail className="size-6 text-primary" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Restablecer contraseña</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Ingresa tu correo y te enviaremos las instrucciones para recuperar tu cuenta.
        </p>
      </div>

      {/* Card */}
      <div className="bg-card rounded-2xl border overflow-hidden">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-6 flex flex-col gap-5"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo electrónico</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="miemail@ejemplo.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full rounded-full gap-2"
            >
              {isSubmitting ? "Enviando..." : "Enviar instrucciones"}
            </Button>
          </form>
        </Form>
      </div>

      {/* Volver */}
      <Link
        href="/login"
        className="inline-flex items-center justify-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="size-3.5" />
        Volver al inicio de sesión
      </Link>
    </div>
  );
}
