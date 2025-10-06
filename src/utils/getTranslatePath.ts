export function getTranslatePath(pathname: string): string[] {
  let segments = pathname
    .split("/")
    .filter(
      segment =>
        segment.length > 0 && segment !== "(core)" && segment !== "dashboard"
    );
  if (segments.length === 0) {
    segments = ["dashboard"];
  }
  return (segments = segments.map(segment => translateSegment(segment)));
}

function translateSegment(segment: string): string {
  const translations: { [key: string]: string } = {
    dashboard: "Dashboard",
    reservations: "Reservas",
    products: "Productos",
    schedules: "Horarios",
    business: "Mi Negocio",
    profile: "Mi Perfil",
    settings: "Configuraciones",
  };
  return translations[segment] || segment;
}
