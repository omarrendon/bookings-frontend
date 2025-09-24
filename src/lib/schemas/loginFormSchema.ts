import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.email({ message: "El correo electrónico no es válido" }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
    .max(100, { message: "La contraseña es demasiado larga" }),
});
