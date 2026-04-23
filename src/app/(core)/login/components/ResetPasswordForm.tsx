"use client";
// Dependencies
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
// Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// Schemas
import { resetPasswordFormSchema } from "@/lib/schemas/loginFormSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
// Hooks
import { useResetPassword } from "@/hooks/useAuth";
// Icons
import { KeyRound, ArrowRight } from "lucide-react";

type FormValues = z.infer<typeof resetPasswordFormSchema>;

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const resetPassword = useResetPassword();

  const form = useForm<FormValues>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: FormValues) => {
    await resetPassword.mutateAsync({ token, newPassword: values.newPassword });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
          <KeyRound className="size-6 text-primary" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Nueva contraseña</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Elige una contraseña segura para proteger tu cuenta.
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
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nueva contraseña</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmNewPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar nueva contraseña</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
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
              {isSubmitting ? "Guardando..." : "Guardar contraseña"}
              {!isSubmitting && <ArrowRight className="size-4" />}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
