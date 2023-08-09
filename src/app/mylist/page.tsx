"use client";
import AnimeCard from "@/components/AnimeCard";
import { useApi } from "@/hooks/useApi";
import React, { useEffect, useState } from "react";
import Fuse from "fuse.js";
import { cookies } from "next/headers";
import { AnimeTypes } from "@/@types/anime";
import Cookies from "js-cookie";
import { useQuery } from "react-query";
import { MagnifyingGlass, X } from "@phosphor-icons/react";
import { useSearchParams } from "next/navigation";

export default function MyList() {
  // const [animeList, setAnimeList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filteredAnimeList, setFilteredAnimeList] = useState<any>([]);

  const searchParams: any = useSearchParams();
  const status = searchParams ? searchParams.get("status") : null;
  const api = useApi();

  const { data: animeList, isLoading } = useQuery("animeList", getAnimeList);

  async function getAnimeList() {
    const accessToken: any = Cookies.get("accessToken");
    const res: any = await api.getAnimeList(accessToken);
    return res.animeList;
  }

  function filterAnimeList() {
    const fuse = new Fuse(animeList?.anime, {
      keys: ["title"],
      threshold: 0.3,
      minMatchCharLength: 1,
      useExtendedSearch: true,
    });

    let filteredList = animeList?.anime;
    if (filterStatus !== "all") {
      filteredList = animeList.anime.filter(
        (anime: any) => anime.status === filterStatus
      );
    }

    if (searchTerm) {
      const searchResults = fuse.search(searchTerm);
      filteredList = searchResults.map((result) => result.item);
    }

    setFilteredAnimeList(filteredList);
  }

  // Atualiza a lista de animes filtrada com base no estado do filtro e da busca
  useEffect(() => {
    // setFilterStatus(status || "all");
    filterAnimeList();
  }, [animeList, filterStatus, searchTerm]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(filteredAnimeList);

  return (
    <div className="grid grid-cols-1 w-full sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12 gap-4 sm:gap-6 lg:max-w-5xl md:max-w-3xl mx-20 max-w-md sm:mx-0 h-auto">
      <div className="col-span-12 flex justify-center items-center w-full flex-col ">
        <h1 className="font-medium text-2xl text-gray-800 mb-12">MyList</h1>
        <div className="relative text-gray-600 mb-3 drop-shadow-lg">
          <div>
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <MagnifyingGlass size={20} />
            </span>
            <input
              type="text"
              className="w-64 bg-white h-auto focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent rounded-xl p-1 pl-10 pr-10 py-2"
              placeholder="Search anime..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm !== "" ? (
              <div
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-900 transition-all"
                onClick={() => setSearchTerm("")}
              >
                <X size={16} weight="bold" />
              </div>
            ) : null}
          </div>
        </div>
        <div className="flex gap-4 mb-4">
          <button
            className={`px-4 py-2 rounded drop-shadow-lg ${
              filterStatus === "all"
                ? "bg-yellow-500 text-white"
                : "bg-white text-gray-800"
            }`}
            onClick={() => setFilterStatus("all")}
          >
            All
          </button>
          <button
            className={`px-4 py-2 rounded drop-shadow-lg ${
              filterStatus === "planToWatch"
                ? "bg-yellow-500 text-white"
                : "bg-white text-gray-800"
            }`}
            onClick={() => setFilterStatus("planToWatch")}
          >
            To Watch
          </button>
          <button
            className={`px-4 py-2 rounded drop-shadow-lg ${
              filterStatus === "watching"
                ? "bg-yellow-500 text-white"
                : "bg-white text-gray-800"
            }`}
            onClick={() => setFilterStatus("watching")}
          >
            Watching
          </button>
          <button
            className={`px-4 py-2 rounded drop-shadow-lg ${
              filterStatus === "Completed"
                ? "bg-yellow-500 text-white"
                : "bg-white text-gray-800"
            }`}
            onClick={() => setFilterStatus("Completed")}
          >
            Completed
          </button>
        </div>
        <div className="flex gap-8 mt-3 flex-wrap justify-center">
          {filteredAnimeList?.map((anime: AnimeTypes) => (
            <div key={anime.mal_id}>
              <AnimeCard data={anime} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
