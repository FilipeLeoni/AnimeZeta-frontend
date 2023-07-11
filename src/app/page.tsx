"use client";
import { useQuery } from "react-query";
import { Heart, Lightning, Planet, Smiley } from "@phosphor-icons/react";

import { useJikanAPI } from "@/hooks/useJikanApi";
import GenreCarousel from "@/components/GenreCarousel";
import SuperCarousel from "@/components/SuperCarousel";
import Head from "next/head";
import Link from "next/link";
import Spinner from "@/components/SpinnerLoading";

export default function Home() {
  const api = useJikanAPI();

  const {
    data: topAnimes,
    isLoading: isLoadingTopAnimes,
    isFetching: isFetchingTopAnimes,
    error,
  } = useQuery("topAnimes", async () => {
    const res = await api.getTopAnimes();
    return res.data;
  });

  const fetchAnimesByGenre = async (genre: number) => {
    const res = await api.getAnimesByGenre(genre);
    return res.data;
  };

  const {
    data: actionAnimes,
    isLoading: isLoadingActionAnimes,
    isFetching: isFetchingAction,
  } = useQuery("actionAnimes", () => fetchAnimesByGenre(1));

  const {
    data: comedyAnimes,
    isLoading: isLoadingComedyAnimes,
    isFetching: isFetchingComedy,
  } = useQuery("comedyAnimes", () => fetchAnimesByGenre(4));
  const {
    data: romanceAnimes,
    isLoading: isLoadingRomanceAnimes,
    isFetching: isFetchingRomance,
  } = useQuery("romanceAnimes", () => fetchAnimesByGenre(22));
  const {
    data: isekaiAnimes,
    isLoading: isLoadingIsekaiAnimes,
    isFetching: isFetchingIsekai,
  } = useQuery("isekaiAnimes", () => fetchAnimesByGenre(62));

  return (
    <main>
      <title>AnimeZeta</title>
      <div className="grid grid-cols-1 w-full sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12 gap-4 sm:gap-6 lg:max-w-5xl md:max-w-3xl mx-20 max-w-md sm:mx-0">
        {isLoadingTopAnimes || isFetchingTopAnimes ? (
          <div className="flex justify-center items-center w-full col-span-12 h-64">
            <Spinner />
          </div>
        ) : (
          <SuperCarousel data={topAnimes} />
        )}

        {isLoadingActionAnimes || isFetchingAction ? (
          <div className="flex justify-center items-center w-full col-span-12 h-64">
            <Spinner />
          </div>
        ) : (
          <GenreCarousel
            AnimeData={actionAnimes}
            Title="Get Ready for Thrilling Action Anime!"
            Icon={Lightning}
          />
        )}
        {isLoadingComedyAnimes || isFetchingComedy ? (
          <div className="flex justify-center items-center w-full col-span-12 h-64">
            <Spinner />
          </div>
        ) : (
          <GenreCarousel
            AnimeData={comedyAnimes}
            Title="Laugh Out Loud with Comedy Anime!"
            Icon={Smiley}
          />
        )}

        {isLoadingRomanceAnimes || isFetchingRomance ? (
          <div className="flex justify-center items-center w-full col-span-12 h-64">
            <Spinner />
          </div>
        ) : (
          <GenreCarousel
            AnimeData={romanceAnimes}
            Title="Delve into Romance Anime!"
            Icon={Heart}
          />
        )}

        {isLoadingIsekaiAnimes || isFetchingIsekai ? (
          <div className="flex justify-center items-center w-full col-span-12 h-64">
            <Spinner />
          </div>
        ) : (
          <GenreCarousel
            AnimeData={isekaiAnimes}
            Title="Dive into Otherworldly Adventures with Isekai Anime!"
            Icon={Planet}
          />
        )}
      </div>
    </main>
  );
}
