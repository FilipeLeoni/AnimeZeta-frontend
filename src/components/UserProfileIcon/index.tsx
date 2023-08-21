"use client";

import React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { clsx } from "clsx";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { FaCircleUser } from "react-icons/fa6";
import userIcon from "@/assets/images/UserIcon.svg";
import Image from "next/image";
import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { signOut, useSession } from "next-auth/react";
import Cookies from "js-cookie";

export default function UserProfileIcon() {
  const { isAuthenticated, logout, avatarUrl } = useAuth();
  const { data: session, status } = useSession();

  // const session = await getServerSession(authOptions);

  const url = `${process.env.API_URL}/${session?.user?.avatarUrl}`;

  function handleLogout() {
    signOut();
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
  }

  return (
    <div className="relative inline-block text-left">
      <PopoverPrimitive.Root>
        <PopoverPrimitive.Trigger asChild>
          <button className="flex justify-center items-center">
            <div className="avatar">
              <div className="w-10 rounded-full ring-2 ring-primary ring-offset-base-100 ring-offset-2">
                <Image
                  src={url || userIcon}
                  alt="User"
                  width={100}
                  height={100}
                  className="scale-125"
                />
              </div>
            </div>
          </button>
        </PopoverPrimitive.Trigger>
        <PopoverPrimitive.Content
          align="center"
          sideOffset={4}
          className={clsx(
            "radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down",
            "z-50 w-48 rounded-lg p-4 shadow-md md:w-56",
            "bg-grayDark/90"
          )}
        >
          <PopoverPrimitive.Arrow className="fill-current text-grayDark/90" />
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {status === "authenticated" ? (
              <Link href={"/profile"}>
                <div className="text-md font-medium text-gray-200 hover:bg-neutral-800/90 hover:text-primary p-4 rounded-lg ">
                  <h3>Profile</h3>
                  <p className="text-gray-400 text-sm">
                    See or edit your profile
                  </p>
                </div>
              </Link>
            ) : (
              <Link href={"/auth/register"}>
                <div className="text-md font-medium text-gray-200 hover:bg-neutral-800/90 hover:text-primary p-4 rounded-lg ">
                  <h3>Create an account</h3>
                  <p className="text-gray-400 text-sm">Join today for free</p>
                </div>
              </Link>
            )}

            <div className="mx-1 my-1 h-[2px] bg-gray-500 rounded-lg" />

            {status === "authenticated" ? (
              <div
                className="text-md font-medium text-gray-200 hover:bg-neutral-800/90 hover:text-primary p-4 rounded-lg cursor-pointer"
                onClick={handleLogout}
              >
                <h3>Logout</h3>
                <p className="text-gray-400 text-sm">End your session</p>
              </div>
            ) : (
              <Link href={"/auth/login"}>
                <div className="text-md font-medium text-gray-200 hover:bg-neutral-800/90 hover:text-primary p-4 rounded-lg">
                  <h3>Log In</h3>
                  <p className="text-gray-400 text-sm">Alredy joined us?</p>
                </div>
              </Link>
            )}
          </motion.div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Root>
    </div>
  );
}
