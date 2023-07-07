"use client";

import Header from "@/components/Header";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { poppins } from "./fonts";

export const metadata = {
  title: "AnimeZeta",
  description: "An unofficial anime site",
};

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <body className={poppins.className}>
          <Header />
          {children}
        </body>
      </QueryClientProvider>
    </html>
  );
}
