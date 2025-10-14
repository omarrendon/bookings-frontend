// Dependecies
import { z } from "zod";

export const productFormSchema = z.object({
  name: z
    .string({
      message: "Este campo es obligatorio",
    })
    .min(2, "Este campo es obligatorio")
    .max(100, "El nombre no puede exceder 100 caracteres"),
  description: z
    .string()
    .max(500, "La descripción no puede exceder 500 caracteres")
    .optional(),
  price: z
    .string({ message: "Este campo es obligatorio" })
    .regex(
      /^\d+(\.\d{1,2})?$/,
      "Este campo es obligatorio y debe ser un número positivo con hasta 2 decimales"
    ),
  // stock: z
  //   .number({
  //     message: "El stock debe ser un número",
  //   })
  //   .int("El stock debe ser un número entero")
  //   .min(0, "El stock no puede ser negativo")
  //   .optional(),
  gallery_images: z
    .custom<FileList | null>()
    .refine(files => !!files && files.length > 0, {
      message: "Se requiere al menos una imagen",
    })
    .optional(),
  estimated_delivery_hours: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Este campo es obligatorio"),
  estimated_delivery_minutes: z
    .string()
    .regex(/^([0-5]?[0-9])?$/, "Los minutos deben ser un número entre 0 y 59")
    .optional(),
});
