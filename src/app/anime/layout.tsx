"use client";

import Header from "@/components/Header";
import "../globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex flex-col items-center gap-4 sm:gap-6 lg:max-w-5xl md:max-w-3xl mx-20 max-w-md sm:mx-0">
        <main>{children}</main>
      </div>
    </div>
  );
}
