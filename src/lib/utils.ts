import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDropDownValues<T>(data: T[], selector: string) {
  const uniqueArray = [...new Set(data.map(item => item[selector as keyof T]))];
  const noEmptyValues = uniqueArray.filter(element => element !== "").sort();
  return noEmptyValues.map(value => ({
    value: String(value),
    label: String(value),
  }));
  // const optionsArray = noEmptyValues.map(listItem => {
  //   return {
  //     value: listItem,
  //     label: listItem,
  //   };
  // });

  // return optionsArray;
}

export function moveColumnsDown(columnObj: { id: string }[], columnId: string) {
  const array = columnObj.map(item => item.id);
  const index = array.indexOf(columnId);
  if (index < 0 || index === array.length - 2) {
    //not found or next to actions whic can't be moved
    return array;
  }

  const temp = array[index];
  array[index] = array[index + 1];
  array[index + 1] = temp;
  console.log(array);
  return array;
}

interface Column {
  id: string;
}

export function moveColumnsUp(columnObj: Column[], columnId: string): string[] {
  const array = columnObj.map(item => item.id);
  const index = array.indexOf(columnId);
  if (index < 2) {
    //not found or next to checkbox column which can't be moved
    return array;
  }

  const temp = array[index];
  array[index] = array[index - 1];
  array[index - 1] = temp;
  return array;
}
