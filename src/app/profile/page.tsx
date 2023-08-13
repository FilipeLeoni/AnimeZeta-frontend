"use client";

import { AddToList } from "@/components/AddToList";
import AnimeCard from "@/components/AnimeCard";
import SuperCarousel from "@/components/SuperCarousel";
import { useJikanAPI } from "@/hooks/useJikanApi";
import Link from "next/link";
import React from "react";
import { useQuery } from "react-query";

export default function Profile() {
  const [selected, setSelected] = React.useState();
  const api = useJikanAPI();

  const { data: topAnime, isLoading: isLoadingTopAnimes } = useQuery({
    queryKey: ["topAnime"],
    queryFn: topAnimes,
  });

  async function topAnimes() {
    const res = await api.getTopAnimes();
    return res.data;
  }
  return (
    <div className="grid grid-cols-1 w-full sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12 gap-4 sm:gap-6 lg:max-w-5xl md:max-w-3xl mx-20 max-w-md sm:mx-0 pt-36 pb-20">
      <SuperCarousel data={topAnime} />

      {topAnime?.map((anime: any, index: number) => (
        <div key={index} onClick={() => setSelected(anime)}>
          {anime.title}
        </div>
      ))}

      {selected && <AddToList animeData={selected} />}

      {/* <div className="col-span-12 flex justify-center items-center w-full flex-col text-center">
        <h1 className="font-medium text-2xl text-gray-600 mb-12 m-5">
          Sorry, the profile page is still under construction. Please check back
          later or contact support for assistance. Thank you for your
          understanding
        </h1>
        <Link href={"/"} className="text-gray-600 text-xl">
          ⬅️ Back to HomePage
        </Link>
      </div> */}
    </div>
  );
}
