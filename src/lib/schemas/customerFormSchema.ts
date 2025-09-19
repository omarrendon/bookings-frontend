import { z } from "zod";

export const customerFormSchema = z.object({
  customer_name: z
    .string()
    .min(2, { message: "El nombre es obligatorio" })
    .max(100, { message: "El nombre es demasiado largo" }),
  customer_email: z.email({ message: "El correo electrónico no es válido" }),
  customer_phone: z
    .string()
    .min(10, { message: "El teléfono es obligatorio" })
    .max(15, { message: "El teléfono es demasiado largo" }),
  proof_of_payment: z
    .custom<FileList | null>()
    .refine(files => !!files && files.length > 0, {
      message: "Se requiere un comprobante de pago",
    }),
});
