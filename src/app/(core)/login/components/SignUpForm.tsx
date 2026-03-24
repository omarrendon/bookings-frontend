"use client";
// Dependencies
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// Components
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
// Schemas
import { signUpFormSchema } from "@/lib/schemas/loginFormSchema";
// Utils
import {
  getPasswordStrength,
  strengthColors,
  strengthLabels,
} from "@/utils/utils";

type FormValues = z.infer<typeof signUpFormSchema>;

export default function SignUpForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      lastName: "",
      password: "",
      name: "",
      acceptTerms: false,
    },
  });

  const { isSubmitting } = form.formState;
  const passwordValue = form.watch("password");
  const strength = getPasswordStrength(passwordValue ?? "");

  const onSubmit = async () => {
    try {
      // TODO: Call registration API
      toast.success("Cuenta creada correctamente. ¡Bienvenido!");
    } catch {
      toast.error("No se pudo crear la cuenta. Inténtalo de nuevo.");
    }
  };
  return (
    <div className="w-full flex flex-col max-w-lg ">
      <div className="text-center">
        <h2 className="text-xl md:text-2xl font-bold ">
          Crear cuenta para tu negocio
        </h2>
        <span className="text-sm text-gray-600 ">
          Completa el formulario para crear una cuenta para tu negocio.
        </span>
      </div>
      <div className="grid gap-6 rounded-xl border p-4 my-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grid gap-1">
                  <FormLabel htmlFor="name">Nombre completo</FormLabel>
                  <FormControl>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Nombre completo"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="grid gap-1">
                  <FormLabel htmlFor="lastName">Apellido</FormLabel>
                  <FormControl>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Apellido"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="grid gap-1">
                  <FormLabel htmlFor="email">Correo electrónico</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Correo electrónico"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="grid gap-1">
                  <FormLabel htmlFor="password">Contraseña</FormLabel>
                  <FormControl>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Contraseña"
                      {...field}
                    />
                  </FormControl>
                  {passwordValue && (
                    <div className="grid gap-1 my-1">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4].map(level => (
                          <div
                            key={level}
                            className={`h-1 flex-1 rounded-full transition-colors ${
                              level <= strength
                                ? strengthColors[strength]
                                : "bg-muted"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Fortaleza: {strengthLabels[strength]}
                      </span>
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="acceptTerms"
              render={({ field }) => (
                <FormItem className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <FormControl>
                      <Checkbox
                        id="acceptTerms"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel
                      htmlFor="acceptTerms"
                      className="text-sm text-muted-foreground flex items-center gap-1"
                    >
                      <div>
                        Acepto los{" "}
                        <Link
                          href={"#"}
                          className="underline underline-offset-4 hover:text-primary"
                        >
                          términos y condiciones
                        </Link>{" "}
                        y las{" "}
                        <Link
                          href={"#"}
                          className="underline underline-offset-4 hover:text-primary"
                        >
                          política de privacidad.
                        </Link>
                      </div>
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full cursor-pointer"
            >
              {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
            </Button>
            <div className="text-sm text-center">
              ¿Ya tienes una cuenta?{" "}
              <Link href="/login" className="text-blue-600 hover:underline">
                Iniciar sesión
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
