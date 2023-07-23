import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="grid grid-cols-1 w-full sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12 gap-4 sm:gap-6 lg:max-w-5xl md:max-w-3xl mx-20 max-w-md sm:mx-0 ">
      <div className="col-span-12 flex justify-center items-center w-full flex-col text-center">
        <h1 className="font-medium text-2xl text-gray-600 mb-12 m-5">
          Sorry, the profile page is still under construction. Please check back
          later or contact support for assistance. Thank you for your
          understanding
        </h1>
        <Link href={"/"} className="text-gray-600 text-xl">
          ⬅️ Back to HomePage
        </Link>
      </div>
    </div>
  );
}
