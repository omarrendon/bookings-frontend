import { add, format, getDate, getDay, parseISO } from "date-fns";
import { fromZonedTime, formatInTimeZone } from "date-fns-tz";
import { es } from "date-fns/locale";

/**
   * Convierte una fecha en zona local → UTC (para guardar en BD)
   *  date fecha como string o Date
  //   tz zona horaria (ej: "America/Mexico_City")
   */

export const convertDateToUTC = (
  date: string | Date,
  tz: string = "America/Mexico_City"
): Date => {
  const zonedDate = fromZonedTime(date, tz);
  return zonedDate;
};

export const convertUTCDateToLocal = (
  date: string | Date,
  tz: string = "America/Mexico_City"
) => {
  return formatInTimeZone(date, tz, "yyyy-MM-dd'T'HH:mm:ss");
};

export const addMinutesToDate = (date: Date, minutes: number): Date => {
  return add(date, { minutes });
};

export const getFormattedLocalDate = (date: string): string => {
  return format(parseISO(date), "dd 'de' MMMM',' yyyy", { locale: es });
};

export const getFormattedHour = (hour: string): string => {
  return format(parseISO(hour), "HH:mm a");
};

export const getFormattedDateWithTime = (date: string): string => {
  return format(parseISO(date), "dd 'de' MMMM 'a las' HH:mm", { locale: es });
};

export const getDayOfWeek = (date: string): string => {
  return format(parseISO(date), "EEEE", { locale: es });
};

export const getArrayOfDaysOfMonth = (date: Date): Date[] => {
  const year = date.getFullYear();
  const month = date.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysArray: Date[] = [];

  for (let day = 1; day <= daysInMonth; day++) {
    daysArray.push(
      format(new Date(year, month, day), "yyyy-MM-dd") as unknown as Date
    );
  }

  return daysArray;
};

export const getListOfDateAndDayOfWeek = (date: Date) => {
  const daysArray = getArrayOfDaysOfMonth(date);
  return daysArray.map(day => ({
    date: day,
    dayOfWeek: getDayOfWeek(day as unknown as string),
  }));
};

export const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 0; hour < 24; hour++) {
    for (const minute of [0, 30]) {
      const timeString = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;
      slots.push(timeString);
    }
  }
  return slots;
};

export const timeToMinutes = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

export const DAYS = [
  { id: "monday", name: "Monday", spanish: "Lunes" },
  { id: "tuesday", name: "Tuesday", spanish: "Martes" },
  { id: "wednesday", name: "Wednesday", spanish: "Miércoles" },
  { id: "thursday", name: "Thursday", spanish: "Jueves" },
  { id: "friday", name: "Friday", spanish: "Viernes" },
  { id: "saturday", name: "Saturday", spanish: "Sábado" },
  { id: "sunday", name: "Sunday", spanish: "Domingo" },
];
