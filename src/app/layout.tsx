"use client";

import Header from "@/components/Header";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { poppins } from "./fonts";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();
  const showHeader =
    pathname.includes("/auth/login") || pathname.includes("/auth/register")
      ? false
      : true;

  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <body className={poppins.className}>
          {showHeader && <Header />}
          <div className="flex w-full min-h-screen flex-col items-center pt-36 pb-20 bg-gradient-to-b from-background to-[#e3e8f4] px-20">
            {children}
          </div>
        </body>
      </QueryClientProvider>
    </html>
  );
}
