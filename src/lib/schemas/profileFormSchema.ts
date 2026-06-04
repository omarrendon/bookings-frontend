import { z } from "zod";

export const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres" })
    .max(50, { message: "El nombre es demasiado largo" }),
  last_name: z
    .string()
    .min(2, { message: "El apellido debe tener al menos 2 caracteres" })
    .max(50, { message: "El apellido es demasiado largo" }),
  email: z.email({ message: "El correo electrónico no es válido" }),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
