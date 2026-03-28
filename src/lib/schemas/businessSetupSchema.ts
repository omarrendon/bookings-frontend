import { z } from "zod";

// Helpers para campos opcionales que React Hook Form envía como ""
const optionalText = (min?: number, minMsg?: string) =>
  z.union([
    min
      ? z.string().min(min, { message: minMsg })
      : z.string(),
    z.literal(""),
  ]).optional();

const isValidUrl = (val: string) => {
  try { new URL(val); return true; } catch { return false; }
};

const optionalUrl = z.union([
  z.string().refine(isValidUrl, { message: "Ingresa una URL válida (ej: https://...)" }),
  z.literal(""),
]).optional();

export const businessSetupSchema = z.object({
  // Información básica
  name: z
    .string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
  description: optionalText(10, "La descripción debe tener al menos 10 caracteres"),
  phone_number: optionalText(10, "El teléfono debe tener al menos 10 dígitos"),
  website: optionalUrl,

  // Dirección
  street: z
    .string()
    .min(5, { message: "La calle debe tener al menos 5 caracteres" })
    .max(100, { message: "La calle es demasiado larga" }),
  external_number: z
    .string()
    .min(1, { message: "El número exterior es obligatorio" })
    .max(10, { message: "El número exterior es demasiado largo" }),
  internal_number: optionalText(),
  neighborhood: optionalText(),
  city: z
    .string()
    .min(2, { message: "La ciudad es obligatoria" })
    .max(50, { message: "La ciudad es demasiado larga" }),
  state: z
    .string()
    .min(2, { message: "El estado es obligatorio" })
    .max(50, { message: "El estado es demasiado largo" }),
  zip_code: z
    .string()
    .min(5, { message: "El código postal debe tener mínimo 5 caracteres" })
    .max(10, { message: "El código postal es demasiado largo" }),
  country: z.string().min(2).max(50),

  // Redes sociales
  social_links: z
    .array(
      z.object({
        platform: z.string().min(1, { message: "Selecciona una plataforma" }),
        url: z.string().refine(isValidUrl, { message: "Ingresa una URL válida" }),
      })
    )
    .optional(),

  // Imagen principal
  main_image_url: optionalUrl,

  // Galería de imágenes (máx. 5 URLs devueltas por la API)
  gallery_images: z.array(z.string()).max(5).optional(),
});

export type BusinessSetupValues = z.infer<typeof businessSetupSchema>;
