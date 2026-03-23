"use client";
// Dependencies
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// Components
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

type FormValues = z.infer<typeof resetPasswordEmailFormSchema>;

export default function ResetPasswordEmailForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(resetPasswordEmailFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async () => {
    // TODO: Call send reset email API
  };

  return (
    <>
      <div className="w-full mb-6 text-center">
        <h2 className="text-2xl font-bold ">Restablecer contraseña</h2>
        <span className="text-sm text-gray-600 ">
          Ingresa tu correo electrónico para recibir instrucciones de
          restablecimiento de contraseña.
        </span>
      </div>
      <div className="grid gap-6 rounded-xl border p-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-4"
          >
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
                      placeholder="miemail@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmitting} className="w-full cursor-pointer">
              {isSubmitting ? "Enviando..." : "Enviar instrucciones"}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
