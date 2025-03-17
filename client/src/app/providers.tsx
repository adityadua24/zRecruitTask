"use client";

import { AuthProvider } from "@/contextApi/auth";

export function Providers({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
