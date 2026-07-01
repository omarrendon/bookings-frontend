"use client";

import { GoogleLogin } from "@react-oauth/google";
import { useGoogleAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export default function GoogleLoginButton() {
  const { mutate: googleAuth, isPending } = useGoogleAuth();

  return (
    <div className={isPending ? "opacity-60 pointer-events-none" : ""}>
      <GoogleLogin
        onSuccess={credentialResponse => {
          if (!credentialResponse.credential) {
            toast.error("No se recibió el token de Google. Inténtalo de nuevo.");
            return;
          }
          googleAuth(credentialResponse.credential);
        }}
        onError={() => {
          toast.error("Error al iniciar sesión con Google. Inténtalo de nuevo.");
        }}
        theme="outline"
        size="large"
        type="standard"
      />
    </div>
  );
}
