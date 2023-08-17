"use client";
import React, { useEffect, useState } from "react";
import Fuse from "fuse.js";
import { useApi } from "@/hooks/useApi";
import { AnimeTypes } from "@/@types/anime";
import { useQuery } from "react-query";
import { MagnifyingGlass, X } from "@phosphor-icons/react";
import { useRouter, useSearchParams } from "next/navigation";
import EditAnimeCard from "@/components/AnimeCard/EditAnimeCard";
import { UpdateAnime } from "@/components/Modal/UpdateAnime";
import MyListOptions from "@/utils/HeaderOptions/MyListOptions";
import { ListAnime } from "@/@types/AnimeList";

export default function MyList() {
  const [selectedAnime, setSelectedAnime] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filteredAnimeList, setFilteredAnimeList] = useState<ListAnime[] | []>(
    []
  );

  const searchParams: any = useSearchParams();
  const status = searchParams.get("status");
  const api = useApi();
  const router = useRouter();

  useEffect(() => {
    if (status) {
      setFilterStatus(status);
    }
  }, [status]);

  const { data: animeList } = useQuery("animeList", getAnimeList);

  async function getAnimeList() {
    const res: any = await api.getAnimeList();
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
    if (filterStatus !== "All") {
      filteredList = animeList?.anime.filter(
        (anime: any) => anime.status === filterStatus
      );
    }

    if (searchTerm) {
      const searchResults = fuse.search(searchTerm);
      filteredList = searchResults.map((result) => result.item);
    }

    setFilteredAnimeList(filteredList);
  }

  useEffect(() => {
    filterAnimeList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animeList, filterStatus, searchTerm]);

  const handleOpenModal = (animeData: ListAnime) => {
    setSelectedAnime(animeData);
    window.my_modal_2.showModal();
  };

  const handleSelectOption = (option: string) => {
    const pathname = `/mylist?status=${option}`;
    router.push(pathname);
    setFilterStatus(option);
  };

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
          {MyListOptions.map((option) => (
            <button
              key={option.id}
              className={`px-4 py-2 rounded-lg drop-shadow-lg ${
                filterStatus === option.name
                  ? "bg-yellow-500 text-white font-medium"
                  : "bg-white text-gray-800"
              }`}
              onClick={() => handleSelectOption(option.name)}
            >
              {option.name}
            </button>
          ))}
        </div>
        <div className="flex gap-8 mt-3 flex-wrap justify-center">
          {filteredAnimeList?.map((anime: ListAnime) => (
            <div key={anime.jikanId}>
              <EditAnimeCard
                data={anime}
                onClick={() => handleOpenModal(anime)}
              />
            </div>
          ))}
          {filteredAnimeList?.length == 0 && filterStatus === "All" && (
            <div className="text-center text-gray-600 mt-2">
              <h2 className="font-medium text-lg">Your list is empty.</h2>
              <p className="text-gray-500">
                Start adding anime series you want to watch by clicking
                &quot;Add to List.&quot; Let the anime marathon begin!
              </p>
            </div>
          )}

          {filteredAnimeList?.length == 0 && filterStatus !== "All" && (
            <div className="text-center text-gray-600 mt-2">
              <h2 className="font-medium text-lg">
                Your {filterStatus} list is empty.
              </h2>
              <p className="text-gray-500">
                Start adding anime series you want to watch by clicking
                &quot;Add to List.&quot; Let the anime marathon begin!
              </p>
            </div>
          )}

          <UpdateAnime animeData={selectedAnime} />
        </div>
      </div>
    </div>
  );
}
