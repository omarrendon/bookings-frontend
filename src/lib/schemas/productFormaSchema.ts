import { z } from "zod";

export const productFormSchema = z.object({
  name: z
    .string({
      message: "El nombre debe ser un texto",
    })
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede exceder 100 caracteres")
    .trim(),
  description: z
    .string({
      message: "La descripción debe ser un texto",
    })
    .max(500, "La descripción no puede exceder 500 caracteres")
    .optional(),
  price: z
    .number({
      message: "El precio debe ser un número",
    })
    .positive("El precio debe ser mayor a 0"),

  stock: z
    .number({
      message: "El stock debe ser un número",
    })
    .int("El stock debe ser un número entero")
    .min(0, "El stock no puede ser negativo")
    .optional(),

  gallery_images: z
    .array(
      z.object({
        url: z.string(),
        alt: z.string().optional(),
        id: z.string().optional(),
      })
    )
    .optional()
    .default([]),

  estimated_delivery_time: z
    .number({
      message: "El tiempo de entrega debe ser un número",
    })
    .positive("El tiempo de entrega debe ser mayor a 0")
    .multipleOf(0.01, "El tiempo de entrega debe tener máximo 2 decimales")
    .optional(),
});

// // Tipo TypeScript derivado del schema
// export type ProductFormData = z.infer<typeof productFormSchema>;

// // Schema para validación parcial (útil para updates)
// export const productFormPartialSchema = productFormSchema.partial();

// // Tipo para datos parciales
// export type ProductFormPartialData = z.infer<typeof productFormPartialSchema>;
