import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.email({ message: "El correo electrónico no es válido" }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
    .max(100, { message: "La contraseña es demasiado larga" }),
  rememberMe: z.boolean().optional(),
});

export const resetPasswordEmailFormSchema = z.object({
  email: z.email({ message: "El correo electrónico no es válido" }),
});

export const resetPasswordFormSchema = z
  .object({
    newPassword: z
      .string({ error: "La nueva contraseña es obligatoria" })
      .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
      .max(100, { message: "La contraseña es demasiado larga" })
      .regex(/[A-Z]/, { message: "Debe contener al menos una letra mayúscula" })
      .regex(/[0-9]/, { message: "Debe contener al menos un número" })
      .regex(/[^A-Za-z0-9]/, { message: "Debe contener al menos un carácter especial" }),
    confirmNewPassword: z.string({
      error: "La confirmación de la nueva contraseña es obligatoria",
    }),
  })
  .refine(data => data.newPassword === data.confirmNewPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmNewPassword"],
  });

export const signUpFormSchema = z.object({
  name: z
    .string({
      error: "El nombre es obligatorio",
    })
    .min(2, { message: "El nombre es un campo obligatorio" })
    .max(50, { message: "El nombre es demasiado largo" }),
  lastName: z
    .string({
      error: "El apellido es obligatorio",
    })
    .min(2, { message: "El apellido es un campo obligatorio" })
    .max(50, { message: "El apellido es demasiado largo" }),
  email: z.email({ message: "El correo electrónico no es válido" }),
  password: z
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
    .max(100, { message: "La contraseña es demasiado larga" })
    .regex(/[A-Z]/, { message: "Debe contener al menos una letra mayúscula" })
    .regex(/[0-9]/, { message: "Debe contener al menos un número" })
    .regex(/[^A-Za-z0-9]/, { message: "Debe contener al menos un carácter especial" }),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: "Debes aceptar los términos y condiciones",
  }),
});
