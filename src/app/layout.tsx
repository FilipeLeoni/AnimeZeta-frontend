import Header from "@/components/Header";
import "./globals.css";
import { poppins } from "./fonts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Providers from "@/providers/providers";
import { Footer } from "@/components/Layout/Footer";

declare global {
  interface Window {
    my_modal_1: HTMLDialogElement;
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <body className={poppins.className}>
        <Providers>
          <Header />
          <div className="flex w-full min-h-screen flex-col items-center bg-gradient-to-b from-background to-[#e3e8f4] px-20">
            {children}
          </div>
          <Footer />
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
