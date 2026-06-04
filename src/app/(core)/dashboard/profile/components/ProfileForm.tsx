"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
// Schema
import {
  profileFormSchema,
  type ProfileFormValues,
} from "@/lib/schemas/profileFormSchema";
// Hooks & store
import { useUpdateProfile } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/auth.store";
// Icons
import { Loader2, Mail, ShieldCheck, User } from "lucide-react";

const fieldLabel = "text-xs font-medium text-muted-foreground uppercase tracking-wide";
const inputClass = "bg-background border-border/80 focus-visible:ring-ring";

export default function ProfileForm() {
  const user = useAuthStore(state => state.user);
  const updateProfile = useUpdateProfile();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: user
      ? { name: user.name, last_name: user.last_name, email: user.email }
      : { name: "", last_name: "", email: "" },
  });

  const { isSubmitting } = form.formState;
  const isPending = isSubmitting || updateProfile.isPending;

  useEffect(() => {
    if (!user) return;
    form.reset({ name: user.name, last_name: user.last_name, email: user.email });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const onSubmit = async (values: ProfileFormValues) => {
    await updateProfile.mutateAsync(values);
  };

  const initials = user
    ? `${user.name[0]}${user.last_name[0]}`.toUpperCase()
    : "??";

  const roleLabel = user?.role === "owner" ? "Propietario" : (user?.role ?? "");

  return (
    <div className="flex flex-col gap-5">

      {/* ── Tarjeta de identidad ── */}
      <Card className="border-border/60 shadow-sm overflow-hidden">
        {/* Franja decorativa superior */}
        <div className="h-16 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent" />

        <CardContent className="px-6 pb-6 -mt-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4">
            {/* Avatar */}
            <div className="size-20 rounded-full bg-card ring-4 ring-border/60 shadow-sm flex items-center justify-center shrink-0">
              <div className="size-full rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-semibold text-primary select-none">
                  {initials}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col items-center sm:items-start gap-2 pb-1 text-center sm:text-left min-w-0">
              <div className="min-w-0">
                <p className="text-lg font-semibold leading-tight truncate">
                  {user?.name} {user?.last_name}
                </p>
                <p className="text-sm text-muted-foreground mt-0.5 truncate">
                  {user?.email}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
                <Badge
                  variant="secondary"
                  className="bg-primary/10 text-primary border-0 gap-1"
                >
                  <ShieldCheck className="size-3" />
                  {roleLabel}
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-0"
                >
                  Cuenta activa
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Formulario de edición ── */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">

          <div className="bg-card rounded-2xl border border-border/60 shadow-sm overflow-hidden">
            {/* Header de sección */}
            <div className="px-6 py-4 border-b flex items-center gap-2.5">
              <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10">
                <User className="size-3.5 text-primary" />
              </div>
              <h3 className="text-base font-semibold tracking-tight">
                Información personal
              </h3>
            </div>

            <div className="p-6 flex flex-col gap-5">
              {/* Nombre y apellido */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={fieldLabel}>
                        Nombre <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ana"
                          className={inputClass}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={fieldLabel}>
                        Apellido <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="López"
                          className={inputClass}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator />

              {/* Correo electrónico */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={fieldLabel}>
                      <span className="flex items-center gap-1.5">
                        <Mail className="size-3" />
                        Correo electrónico{" "}
                        <span className="text-destructive">*</span>
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="miemail@ejemplo.com"
                        className={inputClass}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <p className="text-xs text-muted-foreground mt-1">
                      Este correo es tu identificador de acceso a la cuenta.
                    </p>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={isPending}
            className="w-full gap-2 font-medium"
          >
            {isPending && <Loader2 className="size-4 animate-spin" />}
            {isPending ? "Guardando..." : "Guardar cambios"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
