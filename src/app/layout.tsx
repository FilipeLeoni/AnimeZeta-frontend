"use client";

import Header from "@/components/Header";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { poppins } from "./fonts";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import clsx from "clsx";
import { AuthProvider } from "@/context/AuthContext";
import { checkIsPrivateRoute } from "@/utils/checkIsPrivateRoute";
import PrivateRoute from "@/utils/PrivateRoute";

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

  const isPrivatePage = checkIsPrivateRoute(pathname);

  return (
    <html lang="en">
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <body className={poppins.className}>
            {showHeader && <Header />}
            <div
              className={clsx(
                "flex w-full min-h-screen flex-col items-center bg-gradient-to-b from-background to-[#e3e8f4]",
                showHeader ? "pt-36 pb-20 px-20" : "pt-0 pb-0 px-0"
              )}
            >
              {isPrivatePage && <PrivateRoute>{children}</PrivateRoute>}
              {!isPrivatePage && children}
            </div>
            <ToastContainer />
          </body>
        </QueryClientProvider>
      </AuthProvider>
    </html>
  );
}
