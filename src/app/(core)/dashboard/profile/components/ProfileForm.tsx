"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "lucide-react";
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
import {
  profileFormSchema,
  type ProfileFormValues,
} from "@/lib/schemas/profileFormSchema";
import { useUpdateProfile } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/auth.store";

export default function ProfileForm() {
  const user = useAuthStore(state => state.user);
  const updateProfile = useUpdateProfile();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user?.name ?? "",
      last_name: user?.last_name ?? "",
      email: user?.email ?? "",
    },
  });

  const { isSubmitting } = form.formState;
  const isPending = isSubmitting || updateProfile.isPending;

  useEffect(() => {
    if (!user) return;
    form.reset({
      name: user.name,
      last_name: user.last_name,
      email: user.email,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  console.log("Renderizando ProfileForm, user:", user);

  const onSubmit = async (values: ProfileFormValues) => {
    await updateProfile.mutateAsync(values);
  };

  const initials = user
    ? `${user?.name[0]}${user?.last_name[0]}`.toUpperCase()
    : "??";

  const roleLabel = user?.role === "owner" ? "Propietario" : (user?.role ?? "");

  return (
    <div className="flex flex-col gap-5">
      {/* Tarjeta de identidad */}
      <div className="bg-card rounded-2xl border overflow-hidden">
        <div className="p-6 flex items-center gap-4">
          <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <span className="text-xl font-bold text-primary">{initials}</span>
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-base truncate">
              {user?.name} {user?.last_name}
            </p>
            <p className="text-sm text-muted-foreground truncate">
              {user?.email}
            </p>
            <span className="inline-flex items-center mt-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
              {roleLabel}
            </span>
          </div>
        </div>
      </div>

      {/* Sección de edición */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <div className="bg-card rounded-2xl border overflow-hidden">
            <div className="px-6 py-5 border-b flex items-center gap-2">
              <User className="size-4 text-primary" />
              <h3 className="font-semibold tracking-tight">
                Información personal
              </h3>
            </div>
            <div className="p-6 flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Nombre <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Ana" {...field} />
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
                      <FormLabel>
                        Apellido <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="López" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Correo electrónico{" "}
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="miemail@ejemplo.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={isPending}
            className="w-full rounded-full"
          >
            {isPending ? "Guardando..." : "Guardar cambios"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
