import { z } from "zod";

export const productFormSchema = z.object({
  name: z
    .string({
      message: "El nombre debe ser un texto",
    })
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede exceder 100 caracteres"),
  description: z
    .string({
      message: "La descripción debe ser un texto",
    })
    .max(500, "La descripción no puede exceder 500 caracteres")
    .optional(),
  price: z
    .string({ message: "El precio es un campo obligatorio" })
    .regex(
      /^\d+(\.\d{1,2})?$/,
      "El precio debe ser un número positivo con hasta 2 decimales"
    ),
  // stock: z
  //   .number({
  //     message: "El stock debe ser un número",
  //   })
  //   .int("El stock debe ser un número entero")
  //   .min(0, "El stock no puede ser negativo")
  //   .optional(),
  // gallery_images: z
  //   .custom<FileList | null>()
  //   .refine(files => !!files && files.length > 0, {
  //     message: "Se requiere al menos una imagen",
  //   })
  //   .optional(),
  estimated_delivery_time: z
    .string({ message: "El tiempo estimado es un campo obligatorio" })
    .regex(
      /^\d+(\.\d{1,2})?$/,
      "El tiempo de entrega debe ser un número positivo con hasta 2 decimales"
    ),
});

// // Tipo TypeScript derivado del schema
// export type ProductFormData = z.infer<typeof productFormSchema>;

// // Schema para validación parcial (útil para updates)
// export const productFormPartialSchema = productFormSchema.partial();

// // Tipo para datos parciales
// export type ProductFormPartialData = z.infer<typeof productFormPartialSchema>;
