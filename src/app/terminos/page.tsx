export default function TerminosPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight mb-2">Términos y Condiciones</h1>
      <p className="text-sm text-muted-foreground mb-10">Última actualización: junio 2025</p>

      <div className="flex flex-col gap-8 text-sm leading-relaxed text-foreground/80">
        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">1. Aceptación de los términos</h2>
          <p>
            Al crear una cuenta en Bookea.me, aceptas quedar vinculado por estos Términos y Condiciones.
            Si no estás de acuerdo con alguna parte, no debes usar el servicio.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">2. Descripción del servicio</h2>
          <p>
            Bookea.me es una plataforma SaaS que permite a negocios gestionar reservas y a clientes
            agendar citas. Nos reservamos el derecho de modificar o discontinuar el servicio en cualquier
            momento con previo aviso.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">3. Cuentas de usuario</h2>
          <p>
            Eres responsable de mantener la confidencialidad de tu contraseña y de todas las actividades
            realizadas bajo tu cuenta. Notifícanos de inmediato ante cualquier uso no autorizado.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">4. Uso aceptable</h2>
          <p>
            No puedes usar el servicio para fines ilegales, fraudulentos o que infrinjan derechos de
            terceros. Nos reservamos el derecho de suspender cuentas que violen estas condiciones.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">5. Limitación de responsabilidad</h2>
          <p>
            Bookea.me no será responsable por daños indirectos, incidentales o consecuentes derivados
            del uso o la imposibilidad de usar el servicio.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">6. Cambios a estos términos</h2>
          <p>
            Podemos actualizar estos términos en cualquier momento. Te notificaremos por correo
            electrónico ante cambios materiales. El uso continuo del servicio implica la aceptación
            de los términos actualizados.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">7. Contacto</h2>
          <p>
            Si tienes preguntas sobre estos términos, contáctanos en{" "}
            <a href="mailto:legal@bookea.me" className="text-primary hover:underline underline-offset-4">
              legal@bookea.me
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
