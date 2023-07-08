"use client";

import React, { useState } from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { CaretDown, List, X } from "@phosphor-icons/react";
import clsx from "clsx";
import SearchBar from "../SearchBar";
import UserProfileIcon from "../UserProfileIcon";
import Logo from "@/assets/images/Logo.svg";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import HeaderOptions from "../HeaderOptions";
import CategoriesOptions from "@/utils/HeaderOptions/CategoriesOptions";
import MyListOptions from "@/utils/HeaderOptions/MyListOptions";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isMyListOpen, setMyListOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const handleListToggle = () => {
    setMyListOpen(!isMyListOpen);
  };

  return (
    <div>
      <header className="flex justify-center items-center bg-backgroundSecondary/90 z-40 fixed w-full h-20 drop-shadow-md backdrop-blur-xl">
        <div className="flex justify-between items-center max-w-5xl w-full mx-auto">
          <div className="cursor-pointer lg:ml-0 ml-5">
            <Link href={"/"}>
              <Image src={Logo} alt="" width={32} />
            </Link>
          </div>
          <NavigationMenu.Root className="relative sm:flex hidden text-gray-600">
            <NavigationMenu.List className="flex flex-row rounded-lg bg-transparent p-2 space-x-2 ">
              <NavigationMenu.Item asChild>
                <NavigationMenu.Link
                  href="/"
                  className={clsx(
                    "radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down z-50 ",
                    "px-3 py-2 rounded-md hover:bg-gray-200 ease-in-out transition-all duration-200",
                    "font-medium"
                  )}
                >
                  Home
                </NavigationMenu.Link>
              </NavigationMenu.Item>

              <NavigationMenu.Item>
                <NavigationMenu.Trigger
                  className={clsx(
                    "group",
                    "px-3 py-2 rounded-md hover:bg-gray-200 flex items-center gap-1 ease-in-out transition-all duration-200",
                    "font-medium",
                    "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
                  )}
                >
                  Categories{" "}
                  <CaretDown
                    size={14}
                    weight="bold"
                    className={clsx(
                      "ease-in-out transition-all",
                      "group-radix-state-open:rotate-180 group-radix-state-open:duration-300"
                    )}
                  />
                </NavigationMenu.Trigger>

                <NavigationMenu.Content
                  className={clsx(
                    "absolute w-auto top-0 left-0 rounded-lg ",
                    "group-radix-motion-from-start:animate-enter-from-left",
                    "group-radix-motion-from-end:animate-enter-from-right",
                    "group-radix-motion-to-start:animate-exit-to-left",
                    "group-radix-motion-to-end:animate-exit-to-right"
                  )}
                >
                  <motion.div
                    className="w-[21rem] lg:w-[24rem] p-3"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="grid grid-cols-3 gap-2 text-gray-200">
                      {CategoriesOptions.map((category) => (
                        <Link href={`/genre/${category.id}`} key={category.id}>
                          <HeaderOptions>{category.name}</HeaderOptions>
                        </Link>
                      ))}
                      <HeaderOptions>Others</HeaderOptions>
                    </div>
                  </motion.div>
                </NavigationMenu.Content>
              </NavigationMenu.Item>

              <NavigationMenu.Item>
                <NavigationMenu.Trigger
                  className={clsx(
                    "group",
                    "px-3 py-2 rounded-md hover:bg-gray-200 flex items-center gap-1",
                    "font-medium",
                    "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 ease-in-out transition-all duration-200"
                  )}
                >
                  My List
                  <CaretDown
                    size={14}
                    weight="bold"
                    className={clsx(
                      "ease-in-out transition-all",
                      "group-radix-state-open:rotate-180 group-radix-state-open:duration-300"
                    )}
                  />
                </NavigationMenu.Trigger>

                <NavigationMenu.Content
                  className={clsx(
                    "absolute w-auto top-0 left-0 rounded-lg",
                    "radix-motion-from-start:animate-enter-from-left",
                    "radix-motion-from-end:animate-enter-from-right",
                    "radix-motion-to-start:animate-exit-to-left",
                    "radix-motion-to-end:animate-exit-to-right"
                  )}
                >
                  <motion.div
                    className="w-[6rem] lg:w-[12rem] p-3 flex"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-full flex flex-col space-y-2 text-center">
                      {MyListOptions.map((option) => (
                        <HeaderOptions key={option.id} onClick="">
                          {option.name}
                        </HeaderOptions>
                      ))}
                    </div>
                  </motion.div>
                </NavigationMenu.Content>
              </NavigationMenu.Item>

              <NavigationMenu.Indicator
                className={clsx(
                  "z-10",
                  "top-[100%] flex items-end justify-center h-2 overflow-hidden",
                  "radix-state-visible:animate-fade-in",
                  "radix-state-hidden:animate-fade-out",
                  "transition-[width_transform] duration-[250ms] ease-[ease]"
                )}
              >
                <div className="top-1 relative bg-grayDark/80 border w-2 h-2 rotate-45" />
              </NavigationMenu.Indicator>
            </NavigationMenu.List>

            <div
              className={clsx(
                "absolute flex justify-center",
                "w-[140%] left-[-5%] top-[100%]"
              )}
              style={{
                perspective: "2000px",
              }}
            >
              <NavigationMenu.Viewport
                className={clsx(
                  "relative mt-2 drop-shadow-md rounded-md bg-grayDark/80 overflow-hidden",
                  "w-radix-navigation-menu-viewport",
                  "h-radix-navigation-menu-viewport",
                  "radix-state-open:animate-scale-in-content",
                  "radix-state-closed:animate-scale-out-content",
                  "origin-[top_center] transition-[width_height] duration-300 ease-in-out"
                )}
              />
            </div>
          </NavigationMenu.Root>
          <div className="sm:flex hidden">
            <SearchBar />
          </div>
          <div className="sm:flex hidden lg:mr-0 mr-5">
            <UserProfileIcon />
          </div>

          {isMenuOpen ? (
            <X
              size={32}
              weight="bold"
              className="text-primary mr-5 sm:hidden flex"
              onClick={toggleMenu}
            />
          ) : (
            <List
              size={36}
              weight="bold"
              className="text-primary mr-5 sm:hidden flex"
              onClick={toggleMenu}
            />
          )}
        </div>
      </header>

      {isMenuOpen && (
        <motion.div
          className="w-full h-auto bg-backgroundSecondary absolute flex justify-center top-[80px] sm:hidden z-30"
          initial={{ y: -300 }}
          animate={{ y: isMenuOpen ? 0 : -300 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <ul className="flex flex-col justify-center w-full">
            <p className="text-sm text-gray-300 px-8 pt-8">NAVIGATE</p>
            <li className="ml-4 pl-4 mt-2 py-4  gap-2 cursor-pointer hover:bg-background rounded-md">
              <Link href={"/"}>Home</Link>
            </li>
            <li
              className="px-4 py-2 w-full flex flex-col items-center gap-2 cursor-pointer  after:bg-background"
              onClick={handleDrawerToggle}
            >
              <span className="flex justify-between items-center w-full p-4 cursor-pointer hover:bg-background rounded-md">
                Categories{" "}
                <CaretDown
                  size={16}
                  weight="bold"
                  className={clsx(
                    isDrawerOpen ? "rotate-180" : "",
                    "transition-all duration-200 ease-in-out"
                  )}
                />
              </span>
              <AnimatePresence>
                {isDrawerOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-background shadow-md p-2 w-full rounded-lg"
                  >
                    {CategoriesOptions.map((category) => (
                      <Link
                        href=""
                        key={category.id}
                        className="block py-3 px-3 border-b text-gray-900"
                      >
                        {category.name}
                      </Link>
                    ))}

                    <Link href="" className="block py-1 px-3 text-gray-900">
                      Others
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
            <li
              className="px-4 py-2 w-full flex flex-col items-center gap-2 cursor-pointer"
              onClick={handleListToggle}
            >
              <span className="flex justify-between w-full p-4 cursor-pointer hover:bg-background rounded-md">
                My List <CaretDown size={16} weight="bold" />
              </span>
              <AnimatePresence>
                {isMyListOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-background shadow-md p-2 w-full rounded-lg"
                  >
                    {MyListOptions.map((option) => (
                      <Link
                        href="#"
                        key={option.id}
                        className="block py-3 px-3 border-b text-gray-900"
                      >
                        {option.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
            <div className="mx-5 my-1 h-[2px] bg-gray-500 rounded-lg" />
            <li className="ml-4 pl-4 mb-4 mt-2 py-4 gap-2 cursor-pointer hover:bg-background rounded-md">
              Login
            </li>
          </ul>
        </motion.div>
      )}
    </div>
  );
}
