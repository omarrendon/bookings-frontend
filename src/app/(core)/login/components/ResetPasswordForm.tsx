"use client";
// Dependencies
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// Schemas
import { resetPasswordFormSchema } from "@/lib/schemas/loginFormSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

type FormValues = z.infer<typeof resetPasswordFormSchema>;

export default function ResetPasswordForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form data:", data);
  };

  return (
    <>
      <div className="w-full mb-6 text-center">
        <h2 className="text-2xl font-bold ">Restablecer contraseña</h2>
        <span className="text-sm text-gray-600 ">
          Ingresa tu nueva contraseña para restablecerla.
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
              name="newPassword"
              render={({ field }) => (
                <FormItem className="grid gap-1">
                  <FormLabel htmlFor="newPassword">Nueva contraseña</FormLabel>
                  <FormControl>
                    <Input
                      id="newPassword"
                      type="password"
                      placeholder="********"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmNewPassword"
              render={({ field }) => (
                <FormItem className="grid gap-1">
                  <FormLabel htmlFor="confirmNewPassword">
                    Confirmar nueva contraseña
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="confirmNewPassword"
                      type="password"
                      placeholder="********"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full cursor-pointer ">
              Restablecer contraseña
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
