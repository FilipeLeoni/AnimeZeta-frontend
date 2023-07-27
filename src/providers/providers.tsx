"use client";

import { AuthProvider } from "@/context/AuthContext";
import React, { ReactNode } from "react";

type ProviderProps = {
  children: ReactNode;
};

export default function Providers({ children }: ProviderProps) {
  return <AuthProvider>{children}</AuthProvider>;
}
