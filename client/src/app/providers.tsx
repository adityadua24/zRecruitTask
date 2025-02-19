'use client';

import { AuthProvider } from "@/contextApi/auth";

export function Providers({ children }) {
  return (
      <AuthProvider>{children}</AuthProvider>
  );
}
