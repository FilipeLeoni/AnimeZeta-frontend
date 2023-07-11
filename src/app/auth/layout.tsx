"use client";
import { CaretLeft } from "@phosphor-icons/react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex flex-col items-center gap-4 sm:gap-6 lg:max-w-5xl md:max-w-3xl max-w-md sm:mx-0 w-full justify-center h-screen relative ">
        <Link
          href="/"
          className=" place-self-start absolute md:-left-40 top-10 left-5 flex text-lg items-center font-medium gap-2 text-gray-500 hover:text-gray-800 hover:drop-shadow-md transition-all"
        >
          <CaretLeft size={20} weight="bold" />
          Back
        </Link>
        <main>{children}</main>
      </div>
    </div>
  );
}
