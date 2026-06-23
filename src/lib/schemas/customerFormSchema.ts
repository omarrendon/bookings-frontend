import { z } from "zod";

export const customerFormSchema = z.object({
  customer_name: z
    .string()
    .min(2, { message: "El nombre es obligatorio" })
    .max(255, { message: "El nombre es demasiado largo" }),
  customer_email: z.email({ message: "El correo electrónico no es válido" }),
  customer_phone: z
    .string()
    .min(10, { message: "El teléfono es obligatorio" })
    .max(20, { message: "El teléfono es demasiado largo" }),
  notes: z
    .string()
    .max(1000, { message: "Las notas no pueden superar 1000 caracteres" })
    .optional(),
});
