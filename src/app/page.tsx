"use client";
import { useQuery } from "react-query";
import { Heart, Lightning, Planet, Smiley } from "@phosphor-icons/react";

import { useJikanAPI } from "@/hooks/useJikanApi";
import GenreCarousel from "@/components/GenreCarousel";
import SuperCarousel from "@/components/SuperCarousel";

export default function Home() {
  const api = useJikanAPI();

  const {
    data: topAnimes,
    isLoading,
    error,
  } = useQuery("topAnimes", async () => {
    const res = await api.getTopAnimes();
    return res.data;
  });

  const fetchAnimesByGenre = async (genre: number) => {
    const res = await api.getAnimesByGenre(genre);
    return res.data;
  };

  const { data: actionAnimes } = useQuery("actionAnimes", () =>
    fetchAnimesByGenre(1)
  );

  const { data: comedyAnimes } = useQuery("comedyAnimes", () =>
    fetchAnimesByGenre(4)
  );
  const { data: romanceAnimes } = useQuery("romanceAnimes", () =>
    fetchAnimesByGenre(22)
  );
  const { data: isekaiAnimes } = useQuery("isekaiAnimes", () =>
    fetchAnimesByGenre(62)
  );

  return (
    <main className="flex w-full min-h-screen flex-col items-center pt-36 pb-20 bg-gradient-to-b from-background to-[#e3e8f4] px-20">
      <div className="grid grid-cols-1 w-full sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12 gap-4 sm:gap-6 lg:max-w-5xl md:max-w-3xl mx-20 max-w-md sm:mx-0">
        <SuperCarousel data={topAnimes} />

        <GenreCarousel
          AnimeData={actionAnimes}
          Title="Get Ready for Thrilling Action Anime!"
          Icon={Lightning}
        />

        <GenreCarousel
          AnimeData={comedyAnimes}
          Title="Laugh Out Loud with Comedy Anime!"
          Icon={Smiley}
        />

        <GenreCarousel
          AnimeData={romanceAnimes}
          Title="Delve into Romance Anime!"
          Icon={Heart}
        />

        <GenreCarousel
          AnimeData={isekaiAnimes}
          Title="Dive into Otherworldly Adventures with Isekai Anime!"
          Icon={Planet}
        />
      </div>
    </main>
  );
}
