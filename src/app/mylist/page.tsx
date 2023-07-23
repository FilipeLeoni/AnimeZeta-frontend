"use client";

import AnimeCard from "@/components/AnimeCard";
import { useApi } from "@/hooks/useApi";
import React from "react";
import { useQuery } from "react-query";

export default function MyList() {
  const api = useApi();

  const { data, error } = useQuery("mylist", async () => {
    const res = await api.getAnimeList();
    return res.data;
  });

  return (
    <div className="grid grid-cols-1 w-full sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12 gap-4 sm:gap-6 lg:max-w-5xl md:max-w-3xl mx-20 max-w-md sm:mx-0">
      <div className="col-span-12 flex justify-center items-center w-full flex-col">
        <h1 className="font-medium text-2xl text-gray-800 mb-12">MyList</h1>
        <div className="flex flex-wrap gap-8">
          {data?.animeList.anime.map((anime: any) => (
            <AnimeCard key={anime.id} data={anime} />
          ))}
        </div>
      </div>
    </div>
  );
}
