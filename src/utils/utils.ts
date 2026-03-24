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
  "Instagram",
  "Facebook",
  "Twitter / X",
  "TikTok",
  "LinkedIn",
  "YouTube",
  "WhatsApp",
  "Otro",
];
