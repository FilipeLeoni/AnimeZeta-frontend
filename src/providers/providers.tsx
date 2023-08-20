"use client";

import { AuthProvider } from "@/context/AuthContext";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

type ProviderProps = {
  children: ReactNode;
};

const queryClient = new QueryClient();

export default function Providers({ children }: ProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <AuthProvider>{children}</AuthProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
