export default function PrivacidadPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight mb-2">Política de Privacidad</h1>
      <p className="text-sm text-muted-foreground mb-10">Última actualización: junio 2025</p>

      <div className="flex flex-col gap-8 text-sm leading-relaxed text-foreground/80">
        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">1. Información que recopilamos</h2>
          <p>
            Recopilamos la información que nos proporcionas al crear una cuenta: nombre, apellido,
            correo electrónico y datos del negocio. También recopilamos datos de uso del servicio
            de forma automática.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">2. Cómo usamos tu información</h2>
          <ul className="list-disc pl-5 flex flex-col gap-1">
            <li>Proveer y mejorar el servicio de Bookea.me.</li>
            <li>Enviarte notificaciones relacionadas con tu cuenta y reservas.</li>
            <li>Cumplir con obligaciones legales aplicables.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">3. Compartir información</h2>
          <p>
            No vendemos ni rentamos tu información personal a terceros. Podemos compartirla con
            proveedores de servicios que nos ayudan a operar la plataforma, bajo acuerdos de
            confidencialidad.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">4. Seguridad</h2>
          <p>
            Implementamos medidas técnicas y organizativas para proteger tu información. Las contraseñas
            se almacenan con hashing y los tokens de sesión se gestionan mediante cookies httpOnly.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">5. Tus derechos</h2>
          <p>
            Tienes derecho a acceder, rectificar o eliminar tus datos personales en cualquier momento.
            Puedes ejercer estos derechos desde la configuración de tu cuenta o contactándonos
            directamente.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">6. Cookies</h2>
          <p>
            Usamos cookies httpOnly para gestionar sesiones de forma segura. No usamos cookies de
            rastreo de terceros para publicidad.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">7. Contacto</h2>
          <p>
            Para cualquier consulta sobre privacidad, escríbenos a{" "}
            <a href="mailto:privacidad@bookea.me" className="text-primary hover:underline underline-offset-4">
              privacidad@bookea.me
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
