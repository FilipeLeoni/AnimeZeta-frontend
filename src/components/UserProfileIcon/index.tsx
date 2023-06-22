import React from "react";
import { UserCircle } from "@phosphor-icons/react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { clsx } from "clsx";

export default function UserProfileIcon() {
  return (
    <div className="relative inline-block text-left">
      <DropdownMenuPrimitive.Root>
        <DropdownMenuPrimitive.Trigger asChild>
          <button className="flex justify-center items-center">
            <UserCircle size={36} weight="fill" className="text-primary" />
          </button>
        </DropdownMenuPrimitive.Trigger>

        <DropdownMenuPrimitive.Portal>
          <DropdownMenuPrimitive.Content
            align="end"
            sideOffset={2}
            className={clsx(
              "radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down z-50",
              "w-48 rounded-lg px-1.5 py-1 shadow-md md:w-56",
              "bg-backgroundLight"
            )}
          >
            <div className="hover:bg-background rounded-xl cursor-pointer px-3 hover:text-primary transition-all ease-in-out duration-100">
              <DropdownMenuPrimitive.Label className="select-none pt-4 text-lg ">
                Create an account
              </DropdownMenuPrimitive.Label>
              <DropdownMenuPrimitive.Item
                className={clsx(
                  "flex select-none items-center rounded-md pb-4 text-xs outline-none text-gray-500"
                )}
              >
                Join today for free
              </DropdownMenuPrimitive.Item>
            </div>
            <DropdownMenuPrimitive.Separator className="mx-1 my-1 h-[2px] bg-gray-500 rounded-lg" />

            <div className="hover:bg-background rounded-xl cursor-pointer px-3 hover:text-primary transition-all ease-in-out duration-100">
              <DropdownMenuPrimitive.Label className="select-none pt-2 text-lg ">
                Log In
              </DropdownMenuPrimitive.Label>

              <DropdownMenuPrimitive.Item
                className={clsx(
                  "flex select-none items-center rounded-md pb-6 text-xs outline-none text-gray-500 "
                )}
              >
                Alredy joined us? Welcome back.
              </DropdownMenuPrimitive.Item>
            </div>
          </DropdownMenuPrimitive.Content>
        </DropdownMenuPrimitive.Portal>
      </DropdownMenuPrimitive.Root>
    </div>
  );
}
