"use client";

import { Test } from "@/components/test";
import { useAuth } from "@/context/AuthContext";

import React from "react";

export default function Profile() {
  const auth = useAuth();

  return (
    <div className="grid grid-cols-1 h-screen w-full sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12 gap-4 sm:gap-6 lg:max-w-5xl md:max-w-3xl mx-20 max-w-md sm:mx-0 pt-36 pb-20">
      <h1>{auth?.username}</h1>
      <div className="col-span-12"></div>
    </div>
  );
}
