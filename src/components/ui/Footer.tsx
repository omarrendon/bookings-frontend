import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-800 text-white py-4 mt-10">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Tu Empresa. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
}
