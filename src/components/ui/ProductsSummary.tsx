"use client";
// Dependencies
import { useState } from "react";
// Components
import { Button } from "./button";
import { Alert, AlertDescription, AlertTitle } from "./alert";

export default function ProductsSummary() {
  const [isAlertVisible, setIsAlertVisible] = useState(true);
  // const showAlert = () => {
  //   setIsAlertVisible(true);
  // };
  // const hideAlert = () => {
  //   setIsAlertVisible(false);
  // };

  return (
    <div className="w-full fixed bottom-10  bg-transparent  dark:border-slate-900  mx-auto rounded-full z-50 flex flex-col items-center px-10">
      {isAlertVisible && (
        <Alert className="flex justify-between items-center pr-2 [&>svg+div]:translate-y-0 bg-pink-200">
          <div className="flex items-start gap-3 w-full">
            <div className="flex-col justify-center flex-1">
              <AlertTitle className="font-semibold">Tus productos</AlertTitle>
              <ul className="text-sm w-full">
                <li className="flex justify-between w-full">
                  <span>Producto 1</span>
                  <span>$10.00</span>
                </li>
                <li className="flex justify-between w-full">
                  <span>Producto 2</span>
                  <span>$15.00</span>
                </li>
                <li className="flex justify-between w-full font-bold border-t pt-2">
                  <span>Total</span>
                  <span>$25.00</span>
                </li>
              </ul>
              <AlertDescription className="w-full flex justify-end mt-2">
                <Button
                  variant={"default"}
                  className="w-full sm:w-auto bg-pink-600 hover:bg-pink-700 text-white"
                >
                  Reservar ahora
                </Button>
              </AlertDescription>
            </div>
          </div>
        </Alert>
      )}
    </div>
  );
}
