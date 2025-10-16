import { add, format, parseISO } from "date-fns";
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

export const getPreviosDays = (date: Date, days: number): Date[] => {
  return Array.from({ length: days }, (_, i) => {
    return format(add(date, { days: -i - 1 }), "yyyy-MM-dd") as unknown as Date;
  });
};

export const getNextDays = (date: Date, days: number): Date[] => {
  return Array.from({ length: days }, (_, i) => {
    return add(date, { days: i + 1 });
  });
};
