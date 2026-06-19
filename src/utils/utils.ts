export const strengthLabels = ["", "Débil", "Regular", "Buena", "Fuerte"];
export const strengthColors = [
  "",
  "bg-red-400",
  "bg-orange-400",
  "bg-yellow-400",
  "bg-green-500",
];

export const getPasswordStrength = (password: string): number => {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
};

export const SOCIAL_PLATFORMS = [
  { name: "Instagram", baseUrl: "https://instagram.com/",  placeholder: "tunegocio" },
  { name: "Facebook",  baseUrl: "https://facebook.com/",   placeholder: "tunegocio" },
  { name: "TikTok",    baseUrl: "https://tiktok.com/@",    placeholder: "tunegocio" },
  { name: "WhatsApp",  baseUrl: "https://wa.me/+52",       placeholder: "5512345678" },
  { name: "Otro",      baseUrl: "",                         placeholder: "https://ejemplo.com/tunegocio" },
];

export const MEXICAN_STATES = [
  "Aguascalientes",
  "Baja California",
  "Baja California Sur",
  "Campeche",
  "Chiapas",
  "Chihuahua",
  "Ciudad de México",
  "Coahuila",
  "Colima",
  "Durango",
  "Estado de México",
  "Guanajuato",
  "Guerrero",
  "Hidalgo",
  "Jalisco",
  "Michoacán",
  "Morelos",
  "Nayarit",
  "Nuevo León",
  "Oaxaca",
  "Puebla",
  "Querétaro",
  "Quintana Roo",
  "San Luis Potosí",
  "Sinaloa",
  "Sonora",
  "Tabasco",
  "Tamaulipas",
  "Tlaxcala",
  "Veracruz",
  "Yucatán",
  "Zacatecas",
];

export const formatAdress = (business: {
  street: string;
  external_number: string;
  internal_number?: string;
  neighborhood?: string;
  city: string;
  state: string;
  zip_code: string;
}): string => {
  return [
    `${business.street} ${business.external_number}`,
    business.internal_number,
    business.neighborhood,
    business.city,
    business.state,
    business.zip_code,
  ]
    .filter(Boolean)
    .join(", ");
};

export const formatDuration = (minutes: string | number): string => {
  const m = Number(minutes);
  const hrs = Math.floor(m / 60);
  const mins = m % 60;
  if (hrs === 0) return `${mins} min`;
  if (mins === 0) return `${hrs} hr${hrs > 1 ? "s" : ""}`;
  return `${hrs} hr${hrs > 1 ? "s" : ""} ${mins} min`;
};

export const formatPrice = (price: string | number): string => {
  const formatter = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    // minimumFractionDigits: 0,
    // maximumFractionDigits: 0,
  });
  return formatter.format(Number(price));
};

// const formatTime = (hours: number, minutes?: number): string => {
//   const parts: string[] = [];
//   if (hours > 0) parts.push(`${hours} hr${hours !== 1 ? "s" : ""}`);
//   if (minutes && minutes > 0) parts.push(`${minutes} min`);
//   return parts.length > 0 ? parts.join(" ") : "—";
// };
