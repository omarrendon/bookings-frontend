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
import Image from "next/image";

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
            <div className="size-20 rounded-full bg-card ring-4 ring-border/60 shadow-sm overflow-hidden shrink-0">
              {user?.avatar_url ? (
                <Image
                  src={user.avatar_url}
                  alt={`${user.name} ${user.last_name}`}
                  width={80}
                  height={80}
                  className="size-full object-cover"
                />
              ) : (
                <div className="size-full rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-semibold text-primary select-none">
                    {initials}
                  </span>
                </div>
              )}
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
                {user?.auth_provider === "google" && (
                  <Badge
                    variant="secondary"
                    className="bg-muted text-muted-foreground border-0 gap-1"
                  >
                    <svg className="size-3" viewBox="0 0 24 24" aria-hidden="true">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Cuenta Google
                  </Badge>
                )}
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
                        disabled={user?.auth_provider === "google"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <p className="text-xs text-muted-foreground mt-1">
                      {user?.auth_provider === "google"
                        ? "El correo de una cuenta Google no puede modificarse desde aquí."
                        : "Este correo es tu identificador de acceso a la cuenta."}
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
