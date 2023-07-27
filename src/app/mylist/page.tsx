import AnimeCard from "@/components/AnimeCard";
import { useApi } from "@/hooks/useApi";
import React from "react";
import { cookies } from "next/headers";
import { AnimeTypes } from "@/@types/anime";

export default async function MyList() {
  const api = useApi();

  const { anime } = await getAnimeList();
  async function getAnimeList() {
    const cookieStore = cookies();
    const accessToken: any = cookieStore.get("accessToken");
    const res: any = await api.getAnimeList(accessToken?.value);
    return res.animeList;
  }

  return (
    <div className="grid grid-cols-1 w-full sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12 gap-4 sm:gap-6 lg:max-w-5xl md:max-w-3xl mx-20 max-w-md sm:mx-0 pt-36 pb-20">
      <div className="col-span-12 flex justify-center items-center w-full flex-col">
        <h1 className="font-medium text-2xl text-gray-800 mb-12">MyList</h1>
        <div className="flex gap-8">
          {anime?.map((anime: AnimeTypes) => (
            <AnimeCard key={anime.mal_id} data={anime} />
          ))}
        </div>
      </div>
    </div>
  );
}
