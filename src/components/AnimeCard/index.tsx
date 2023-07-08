import Image from "next/image";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Badges from "../Badges";
import AddToList from "../Buttons/AddToList";
import { Star } from "@phosphor-icons/react";
import clsx from "clsx";
import Link from "next/link";
import Popover from "../Popover";

export default function AnimeCard({ data }: any) {
  const image =
    data.images?.webp?.large_image_url || data.images?.webp?.image_url;
  const title = data.title || data.name;

  return (
    <div className="w-44 h-full flex text-grayDark hover:scale-110 transition-all">
      <div className="w-44 h-full rounded-lg relative cursor-pointer flex flex-col items-center text-center gap-2 ">
        <div
          className="w-44 h-64 bg-cover bg-center rounded-lg drop-shadow-md"
          style={{
            backgroundImage: `url(${image})`,
          }}
        />
        <div className="font-medium text-sm">{title}</div>
      </div>
    </div>
  );
}
