"use client";

import Header from "@/components/Header";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { poppins } from "./fonts";
import { usePathname } from "next/navigation";
import clsx from "clsx";

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
          <div
            className={clsx(
              "flex w-full min-h-screen flex-col items-center pt-36 pb-20 bg-gradient-to-b from-background to-[#e3e8f4]",
              showHeader ? "pt-36 pb-20 px-20" : "pt-0 pb-0 px-0"
            )}
          >
            {children}
          </div>
        </body>
      </QueryClientProvider>
    </html>
  );
}
