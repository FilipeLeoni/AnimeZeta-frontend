import Image from "next/image";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Badges from "../Badges";
import AddToList from "../Buttons/AddToList";
import { Star } from "@phosphor-icons/react";
import clsx from "clsx";
import Link from "next/link";

export default function AnimeCard({ data }: any) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <motion.div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="flex w-48 hover:w-80 text-black"
    >
      <Link href={"/"}>
        <div className="w-48 h-full rounded-lg relative cursor-pointer flex flex-col items-center text-center gap-2">
          <div
            className=" w-48 h-64 bg-cover bg-center rounded-lg"
            style={{
              backgroundImage: `url(${data.images.webp.large_image_url})`,
            }}
          />
          <div>{data.title}</div>
        </div>
      </Link>
      {/* <AnimatePresence>
        {isHovered && (
          <motion.div
            className="w-0 h-64 bg-backgroundSecondary rounded-r-lg text-slate-100 flex flex-col p-4 gap-[6px] overflow-hidden whitespace-nowrap"
            initial={{ width: 0, padding: "0px" }}
            animate={{ width: "256px", padding: "4px" }}
            exit={{
              width: 0,
              padding: 0,
              transition: { ease: "easeInOut", duration: 1 },
            }}
          >
            <div className="flex items-center justify-between mb-[-8px]">
              <p>{data.status}</p>
              <div className="flex items-center">
                <p>{data.score}</p>
                <Star size={20} weight="fill" className="text-primary" />
              </div>
            </div>
            <p>{data.year}</p>
            <p className="text-red-500 font-semibold">{data.studios[0].name}</p>

            {data.type === "Movie" ? (
              <p>
                {data.type} • {data.duration}
              </p>
            ) : (
              <p>
                {data.type} • {data.episodes} Episodes
              </p>
            )}

            <AddToList />

            <div
              className={clsx(
                "flex w-64 gap-3 mt-2 flex-wrap whitespace-nowrap"
              )}
            >
              {data.genres.map((gen: any) => (
                <Badges key={gen.mal_id}>{gen.name}</Badges>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence> */}
    </motion.div>
  );
}
