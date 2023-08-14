"use client";

import { useJikanAPI } from "@/hooks/useJikanApi";
import SuperCarousel from "@/components/SuperCarousel";
import GenreCarousel from "@/components/GenreCarousel";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useQueryClient,
} from "react-query";
import { Suspense } from "react";
import SubTitle from "@/components/Text/SubTitles";
import { LoadingSuperCarousel } from "@/components/SuperCarousel/Loading";

export default function Home() {
  const queryClient = useQueryClient();

  const api = useJikanAPI();

  const { data: topAnime, isLoading: isLoadingTopAnimes } = useQuery({
    queryKey: ["topAnime"],
    queryFn: topAnimes,
  });

  const { data: actionAnime } = useQuery({
    queryKey: ["actionAnime"],
    queryFn: actionAnimes,
  });
  const { data: comedyAnime } = useQuery({
    queryKey: ["comedyAnimes"],
    queryFn: comedyAnimes,
  });
  const { data: isekaiAnime } = useQuery({
    queryKey: ["isekaiAnimes"],
    queryFn: isekaiAnimes,
  });

  async function topAnimes() {
    const res = await api.getTopAnimes();
    return res.data;
  }

  async function actionAnimes() {
    const res = await api.getAnimesByGenre(1);
    return res.data;
  }

  async function comedyAnimes() {
    const res = await api.getAnimesByGenre(4);
    return res.data;
  }

  async function isekaiAnimes() {
    const res = await api.getAnimesByGenre(62);
    return res.data;
  }

  return (
    <main className="w-full flex justify-center">
      <title>AnimeZeta</title>
      <div className="grid grid-cols-1 w-full sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12 gap-4 sm:gap-6 lg:max-w-5xl md:max-w-3xl mx-20 max-w-md sm:mx-0 pt-36 pb-20">
        <div className="col-span-12 w-full">
          <Suspense fallback={<LoadingSuperCarousel />}>
            <SuperCarousel data={topAnime} />
          </Suspense>

          <div className="w-full">
            <SubTitle>Get Ready for Thrilling Action Anime!</SubTitle>

            <GenreCarousel AnimeData={actionAnime} />
          </div>

          <div>
            <SubTitle>Laugh Out Loud with Comedy Anime!</SubTitle>

            <GenreCarousel AnimeData={comedyAnime} />
          </div>
          <div>
            <SubTitle>
              Dive into Otherworldly Adventures with Isekai Anime!
            </SubTitle>
            <GenreCarousel AnimeData={isekaiAnime} />
          </div>

          <div>
            <SubTitle>
              Dive into Otherworldly Adventures with Isekai Anime!
            </SubTitle>
            <GenreCarousel AnimeData={topAnime} />
          </div>
        </div>
      </div>
    </main>
  );
}
