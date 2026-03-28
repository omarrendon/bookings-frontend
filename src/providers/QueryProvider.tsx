"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // useState garantiza que cada usuario tenga su propia instancia de QueryClient
  // y que no se comparta entre requests en el servidor
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 min — datos frescos sin refetch
            retry: 1,                  // reintenta 1 vez si falla
            refetchOnWindowFocus: false,
          },
          mutations: {
            retry: 0, // las mutaciones no reintenten — evita doble submit
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
