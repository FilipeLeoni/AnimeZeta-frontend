"use client";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import Input from "@/components/Input";
import React from "react";
import Link from "next/link";
import { EnvelopeSimple, Eye } from "@phosphor-icons/react";

function page() {
  return (
    <>
      <header>
        <title>Login - AnimeZeta</title>
      </header>
      <div className="mb-20">
        <p>Welcome Back!</p>
        <h1 className="text-grayDark font-bold text-5xl">Login</h1>
      </div>
      <div className="flex flex-col gap-6 text-gray-500 text-sm font-medium">
        <div>
          <label className="pl-1">Email</label>
          <Input type="text" Icon={EnvelopeSimple} />
        </div>
        <div>
          <label className="pl-1">Password</label>
          <Input type="password" Icon={Eye} />
          <div className="form-control flex gap-2 mt-1">
            <label className="cursor-pointer label flex gap-2 justify-start">
              <input
                type="checkbox"
                className="checkbox checkbox-warning checkbox-xs bg-gray-200 border-gray-300 rounded"
              />
              <span className="label-text text-xs font-medium text-gray-500">
                Remember me
              </span>
            </label>
          </div>
        </div>
      </div>
      <div className="mt-16 w-full">
        <PrimaryButton>Login</PrimaryButton>
        <div className="text-gray-500 font-medium text-sm text-center mt-2">
          New here?{" "}
          <Link href="/auth/register">
            <span className="text-blue-600 hover:text-blue-800">
              Create an account
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}

export default page;
