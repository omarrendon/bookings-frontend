// Components
import Link from "next/link";
import Image from "next/image";
import SignUpForm from "../components/SignUpForm";
// Icons
import { GalleryVerticalEnd } from "lucide-react";

export default function SignUpPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">

      {/* ── Panel izquierdo: formulario ── */}
      <div className="flex flex-col p-6 md:p-10">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-semibold w-fit">
          <div className="bg-primary text-primary-foreground flex size-7 items-center justify-center rounded-lg">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Bookea.me
        </Link>

        {/* Form centrado verticalmente */}
        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-sm">
            <SignUpForm />
          </div>
        </div>

        {/* Copyright */}
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Bookea.me. Todos los derechos reservados.
        </p>
      </div>

      {/* ── Panel derecho: imagen ── */}
      <div className="relative hidden lg:block bg-gradient-to-b from-[#f5f0ff] via-[#e8d5f5] to-[#2d1a4a]">
        <Image
          src="https://res.cloudinary.com/dv34psubp/image/upload/v1776917555/Bookeame/bookeame_p0vklp.png"
          fill
          alt="Bookea.me"
          className="object-contain"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
        <div className="absolute bottom-10 left-10 right-10 text-white">
          <p className="text-3xl font-bold leading-tight">
            Empieza a recibir reservas hoy
          </p>
          <p className="text-sm text-white/70 mt-2 leading-relaxed max-w-sm">
            Crea tu cuenta gratuita y configura tu negocio en minutos.
          </p>
        </div>
      </div>

    </div>
  );
}
