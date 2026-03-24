// Components
import ResetPasswordEmailForm from "../components/ResetPasswordEmailForm";
import ResetPasswordForm from "../components/ResetPasswordForm";

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
    <div className="w-full flex flex-col">
      <div className="flex min-h-svh w-full items-center justify-center">
        <div className="w-full max-w-lg px-4">
          {isValidToken ? <ResetPasswordForm /> : <ResetPasswordEmailForm />}
        </div>
      </div>
    </div>
  );
}
