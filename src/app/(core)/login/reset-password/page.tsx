// Components
import Link from "next/link";
import ResetPasswordEmailForm from "../components/ResetPasswordEmailForm";
import ResetPasswordForm from "../components/ResetPasswordForm";
// Icons
import { GalleryVerticalEnd } from "lucide-react";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Acepta solo caracteres URL-safe y longitud mínima razonable para un token
const TOKEN_REGEX = /^[A-Za-z0-9._\-]{20,}$/;

export default async function ResetPasswordPage({ searchParams }: Props) {
  const params = await searchParams;
  const rawToken = typeof params.token === "string" ? params.token : undefined;
  const isValidToken = rawToken !== undefined && TOKEN_REGEX.test(rawToken);

  return (
    <div className="min-h-svh flex flex-col p-6 md:p-10">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 font-semibold w-fit">
        <div className="bg-primary text-primary-foreground flex size-7 items-center justify-center rounded-lg">
          <GalleryVerticalEnd className="size-4" />
        </div>
        Bookea.me
      </Link>

      {/* Form centrado */}
      <div className="flex flex-1 items-center justify-center py-10">
        <div className="w-full max-w-sm">
          {isValidToken ? <ResetPasswordForm /> : <ResetPasswordEmailForm />}
        </div>
      </div>

      {/* Copyright */}
      <p className="text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Bookea.me. Todos los derechos reservados.
      </p>
    </div>
  );
}
