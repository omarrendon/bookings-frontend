"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";

export default function PublicOnlyRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const isAuthLoading = useAuthStore(state => state.isAuthLoading);

  useEffect(() => {
    if (!isAuthLoading && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthLoading, isAuthenticated, router]);

  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (isAuthenticated) return null;

  return <>{children}</>;
}
