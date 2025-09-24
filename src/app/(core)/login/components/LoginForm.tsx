"use client";
// Dependencies
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// Components
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// Schemas
import { loginFormSchema } from "@/lib/schemas/loginFormSchema";

type FormValues = z.infer<typeof loginFormSchema>;

export default function LoginForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };
  return (
    <div className="w-full flex flex-col my-10 px-4">
      <div className="w-full mb-6 text-center">
        <h2 className="text-2xl font-bold ">Inicia sesión con tu cuenta</h2>
        <span className="text-sm text-gray-600 ">
          Ingresa tu correo electrónico y contraseña para continuar.
        </span>
      </div>
      <div className="grid gap-6 rounded-xl border p-4">
        <div className="grid gap-3">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input
            id="email"
            type="email"
            placeholder="miemail@example.com"
            required
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Contraseña</Label>
            <Link
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="********"
            required
          />
        </div>
        <Button type="submit" className="w-full cursor-pointer ">
          Iniciar sesión
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t" />
        <div className="text-center text-sm">
          ¿No tienes una cuenta?{" "}
          <Link href="#" className="underline underline-offset-4">
            Regístrate
          </Link>
        </div>
      </div>
    </div>
  );
}
