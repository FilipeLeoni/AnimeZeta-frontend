import { Input } from "@/components/Input";
import Image from "next/image";
import React from "react";
import Lock from "@/assets/images/Lock.svg";
import { IoArrowBack } from "react-icons/io5";
import Link from "next/link";

export default function ResetPassword() {
  return (
    <div className="flex flex-col items-center gap-4 sm:gap-6 lg:max-w-4xl md:max-w-3xl max-w-lg sm:mx-0 w-full justify-center h-screen">
      <div className="w-full bg-white drop-shadow-2xl rounded-lg">
        <div className="w-full h-auto flex">
          <div className="h-auto w-[430px] rounded-md md:flex hidden forgot-bg bg-cover bg-center justify-center items-center drop-shadow-md relative" />
          <div className="h-full flex flex-col py-8 w-full max-w-[456px] items-center">
            <div className="h-[500px] px-10 w-full relative flex flex-col">
              <div className="flex flex-col items-center text-center mb-4 relative">
                <div className="-mt-4">
                  <Image src={Lock} width={164} alt="AnimeZeta" />
                </div>
                <h1 className="text-grayDark font-bold text-xl md:text-3xl mt-4">
                  Forgot Your Password?
                </h1>
                <p className="text-xs lg:text-sm text-gray-500 mt-2 text-center">
                  Enter the email address associated with your account and we’ll
                  send you a a link to reset your password.
                </p>
              </div>
              <label>
                <p className="text-grayDark">Email</p>
                <Input type="text" />
              </label>
              <div className="w-full mt-auto">
                <button className="btn bg-primary w-full">
                  Reset Password
                </button>

                <Link
                  href="/auth/login"
                  className="flex justify-center items-center gap-2 mt-4 text-sm hover:underline hover:text-blue-600 font-medium"
                >
                  <IoArrowBack />
                  Back to Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
