"use client";

import { useJikanAPI } from "@/hooks/useJikanApi";
import { m, LazyMotion, domAnimation } from "framer-motion";
import React, { Suspense, useState } from "react";
import { useQuery } from "react-query";
import { LoadingAnimeCard } from "../AnimeCard/AnimeCardLoading";
import Link from "next/link";
import AnimeCard from "../AnimeCard";
import Accordion from "../AccordionCustom";
import { ReviewTypes } from "@/@types/anime";
import StaffCard from "../StaffCard";
import AnimeOtherOptions from "@/utils/AnimeOptions/OthersOptions";

export default function ExtraInfo({ animeId }: any) {
  const [selectedItem, setSelectedItem] = useState("characters");
  const api = useJikanAPI();

  const { data: InfoData, isLoading } = useQuery(
    ["animeInfo", selectedItem, animeId],
    async () => {
      const res = await api.getAnimeInfoByType(
        animeId,
        selectedItem.toLowerCase()
      );
      return res.data;
    }
  );

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
  };
  return (
    <section className="w-full pt-20">
      <div className="divider h-0.5 bg-gray-300" />
      <div className="mt-2">
        <ul className="flex justify-around text-gray-500 font-medium">
          {AnimeOtherOptions.map((options) => (
            <li
              key={options.id}
              className="cursor-pointer hover:bg-slate-300 px-8 py-3 rounded relative transition-all"
              onClick={() => handleItemClick(options.endpoint)}
            >
              {options.name}

              {selectedItem === options.endpoint && (
                <LazyMotion features={domAnimation}>
                  <m.div
                    layoutId="underline"
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-yellow-400 rounded-full"
                  />
                </LazyMotion>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-wrap justify-center gap-6 mt-12">
        {selectedItem === "characters" &&
          InfoData &&
          InfoData.slice(0, 25).map((characterData: any, index: number) => (
            <Link
              key={characterData.character.mal_id}
              href={`/anime/character/${characterData.character.mal_id}`}
              prefetch={false}
            >
              <LazyMotion features={domAnimation}>
                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Suspense fallback={<LoadingAnimeCard />}>
                    <AnimeCard data={characterData.character} />
                  </Suspense>
                </m.div>
              </LazyMotion>
            </Link>
          ))}

        {selectedItem === "staff" &&
          InfoData &&
          InfoData.slice(0, 25).map((person: any, index: number) => (
            <LazyMotion features={domAnimation} key={person.person.mal_id}>
              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <StaffCard data={person} />
              </m.div>
            </LazyMotion>
          ))}

        {selectedItem === "reviews" && InfoData && (
          <div className="flex flex-col gap-10 items-center">
            {InfoData.slice(0, 7).map((review: ReviewTypes, index: number) => (
              <LazyMotion features={domAnimation} key={review.mal_id}>
                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Accordion data={review} />
                </m.div>
              </LazyMotion>
            ))}
          </div>
        )}

        {selectedItem === "recommendations" && InfoData && (
          <>
            {InfoData.slice(0, 15).map((anime: any, index: any) => (
              <LazyMotion features={domAnimation} key={anime.entry.mal_id}>
                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/anime/${anime.entry.mal_id}`}>
                    <Suspense fallback={<LoadingAnimeCard />}>
                      <AnimeCard key={anime.entry.mal_id} data={anime.entry} />
                    </Suspense>
                  </Link>
                </m.div>
              </LazyMotion>
            ))}
          </>
        )}
      </div>
    </section>
  );
}
