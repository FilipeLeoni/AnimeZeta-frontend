import React from "react";
import { UserCircle } from "@phosphor-icons/react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { clsx } from "clsx";
import Link from "next/link";
import { motion } from "framer-motion";

export default function UserProfileIcon() {
  return (
    <div className="relative inline-block text-left">
      <PopoverPrimitive.Root>
        <PopoverPrimitive.Trigger asChild>
          <button className="flex justify-center items-center">
            <UserCircle size={36} weight="fill" className="text-primary" />
          </button>
        </PopoverPrimitive.Trigger>
        <PopoverPrimitive.Content
          align="center"
          sideOffset={4}
          className={clsx(
            "radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down",
            "z-50 w-48 rounded-lg p-4 shadow-md md:w-56",
            "bg-backgroundLight "
          )}
        >
          <PopoverPrimitive.Arrow className="fill-current dark:text-gray-800" />
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Link href={"/"}>
              <div className="text-sm font-medium text-gray-100 hover:bg-background p-4 rounded-lg hover:text-primary">
                <h3>Create an account</h3>
                <p className="text-gray-500">Join today for free</p>
              </div>
            </Link>
            <div className="mx-1 my-1 h-[2px] bg-gray-500 rounded-lg" />
            <Link href={"/login"}>
              <div className="text-sm font-medium text-gray-100 hover:bg-background p-4 rounded-lg hover:text-primary">
                <h3>Log In</h3>
                <p className="text-gray-500">Alredy joined us?</p>
              </div>
            </Link>
          </motion.div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Root>
    </div>
  );
}
