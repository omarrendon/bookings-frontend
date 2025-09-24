// Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ResetPasswordEmailForm from "../components/ResetPasswordEmailForm";
import ResetPasswordForm from "../components/ResetPasswordForm";

// Definir la interfaz para los parámetros
interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function ResetPasswordPage({ searchParams }: Props) {
  // Obtener parámetros específicos
  const token = searchParams.token as string;
  // const email = searchParams.email as string;

  console.log("Token:", token); // Aquí puedes ver el token en la consola
  // console.log("Email:", email); // Aquí puedes ver el email en la consola
  return (
    <div className="w-full flex flex-col ">
      <div className="flex min-h-svh w-full items-center justify-center ">
        <div className="w-full max-w-lg px-4">
          {token ? <ResetPasswordForm /> : <ResetPasswordEmailForm />}
        </div>
      </div>
    </div>
  );
}
