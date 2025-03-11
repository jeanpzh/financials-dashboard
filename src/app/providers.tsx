"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";
export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster
          closeButton
          position="top-right"
          richColors
          duration={5000}
          expand
        />
        {children}
      </QueryClientProvider>
    </SessionProvider>
  );
}
