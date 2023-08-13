"use client";

import { AuthProvider } from "@/context/AuthContext";
import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

type ProviderProps = {
  children: ReactNode;
};

const queryClient = new QueryClient();

export default function Providers({ children }: ProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>;
    </QueryClientProvider>
  );
}
