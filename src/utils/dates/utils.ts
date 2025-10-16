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

export const getPreviosDays = (date: Date, days: number): Date[] => {
  return Array.from({ length: days }, (_, i) => {
    return format(add(date, { days: -i - 1 }), "yyyy-MM-dd") as unknown as Date;
  });
};

export const getNextDays = (date: Date, days: number): Date[] => {
  return Array.from({ length: days }, (_, i) => {
    return format(add(date, { days: i + 1 }), "yyyy-MM-dd") as unknown as Date;
  });
};

export const getFullCalendarDays = (date: Date) => {
  const numberOfDay = getDay(date); // 0 (Domingo) - 6 (Sábado)
  let previousDays: Date[] = [];
  let nextDays: Date[] = [];

  console.log({ numberOfDay });

  previousDays = getPreviosDays(date, 7 + numberOfDay).splice(8 - numberOfDay);
  // console.log({ previousDays });
  nextDays = getNextDays(date, 7);
  console.log({ nextDays });

  return {
    previousDays,
    nextDays,
    currentDay: getDate(date),
  };
};

// se debe de motrar los siguinetes 7 dias de la fecha actual
// y los 7 dias anteriores
// si es inicio de mes, mostrar los dias del mes anterior
// si es fin de mes, mostrar los dias del mes siguiente
// si es inicio de año, mostrar los dias del año anterior
// si es fin de año, mostrar los dias del año siguiente
// siempre mostrar 15 dias en total
// si es inicio de semana, mostrar los dias anteriores del mes anterior
// si es fin de semana, mostrar los dias siguientes del mes siguiente
// siempre mostrar 15 dias en total

// Ejemplo: hoy es 1 de marzo, se deben de mostrar los dias 22, 23, 24, 25, 26, 27, 28 de febrero y 1, 2, 3, 4, 5, 6, 7 de marzo

// Ejemplo: hoy es 30 de marzo, se deben de mostrar los dias 24, 25, 26, 27, 28, 29, 30 de marzo y 31 de marzo y 1, 2, 3, 4, 5 de abril
// Ejemplo: hoy es 31 de diciembre, se deben de mostrar los dias 25, 26, 27, 28, 29, 30, 31 de diciembre y 1, 2, 3, 4, 5, 6 de enero
