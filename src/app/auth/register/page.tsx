"use client";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import Input from "@/components/Input";
import { EnvelopeSimple, Eye } from "@phosphor-icons/react";
import Link from "next/link";
import React from "react";

function page() {
  return (
    <>
      <div className="mb-10">
        <p>Welcome to AnimeZeta!</p>
        <h1 className="text-grayDark font-bold text-5xl">Sign Up</h1>
      </div>
      <div className="flex flex-col gap-6 text-gray-500 text-sm font-medium">
        <div>
          <label className="pl-1">Username</label>
          <Input />
        </div>
        <div>
          <label className="pl-1">Email</label>
          <Input type="text" Icon={EnvelopeSimple} />
        </div>
        <div>
          <label className="pl-1">Password</label>
          <Input type="password" Icon={Eye} />
        </div>
        <div>
          <label className="pl-1">Confirm Password</label>
          <Input type="password" Icon={Eye} />
        </div>
      </div>
      <div className="mt-10 w-full text-center">
        <PrimaryButton>Sing Up</PrimaryButton>
        <div className="text-gray-500 font-medium text-sm mt-2">
          Alredy have an account?{" "}
          <Link href="/auth/login">
            <span className="text-blue-600 hover:text-blue-800">Log in</span>
          </Link>
        </div>
      </div>
    </>
  );
}

export default page;
