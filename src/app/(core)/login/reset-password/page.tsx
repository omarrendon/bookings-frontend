// Components
import Link from "next/link";
import { Suspense } from "react";
import ResetPasswordEmailForm from "../components/ResetPasswordEmailForm";
import ResetPasswordForm from "../components/ResetPasswordForm";
// Icons
import { GalleryVerticalEnd } from "lucide-react";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Valida formato UUID v4 — único formato que genera el backend con crypto.randomUUID()
const TOKEN_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

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
          {isValidToken ? (
            <Suspense>
              <ResetPasswordForm />
            </Suspense>
          ) : (
            <ResetPasswordEmailForm />
          )}
        </div>
      </div>

      {/* Copyright */}
      <p className="text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Bookea.me. Todos los derechos reservados.
      </p>
    </div>
  );
}
