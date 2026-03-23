// Components
import ResetPasswordEmailForm from "../components/ResetPasswordEmailForm";
import ResetPasswordForm from "../components/ResetPasswordForm";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ResetPasswordPage({ searchParams }: Props) {
  const params = await searchParams;
  const token = typeof params.token === "string" ? params.token : undefined;

  return (
    <div className="w-full flex flex-col">
      <div className="flex min-h-svh w-full items-center justify-center">
        <div className="w-full max-w-lg px-4">
          {token ? <ResetPasswordForm /> : <ResetPasswordEmailForm />}
        </div>
      </div>
    </div>
  );
}
