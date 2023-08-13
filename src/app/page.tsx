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

  // const { data, isLoading } = useQuery(
  //   {["animeInfo"], async () => {
  //   const res = await api.getAnimesByGenre(1);
  //   return res.data;
  // });

  // const [topAnime, actionAnime, comedyAnime, isekaiAnime] = await Promise.all([
  //   topAnimes(),
  //   actionAnimes(),
  //   comedyAnimes(),
  //   isekaiAnimes(),
  // ]);

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
    <QueryClientProvider client={queryClient}>
      <main>
        <title>AnimeZeta</title>
        <div className="grid grid-cols-1 w-full sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12 gap-4 sm:gap-6 lg:max-w-5xl md:max-w-3xl mx-20 max-w-md sm:mx-0 pt-36 pb-20">
          <SuperCarousel data={topAnime} />
          <div className="col-span-12">
            <SubTitle>Get Ready for Thrilling Action Anime!</SubTitle>

            <GenreCarousel AnimeData={actionAnime} />
            <SubTitle>Laugh Out Loud with Comedy Anime!</SubTitle>

            <GenreCarousel AnimeData={comedyAnime} />
            <SubTitle>
              Dive into Otherworldly Adventures with Isekai Anime!
            </SubTitle>

            <GenreCarousel AnimeData={isekaiAnime} />

            <div>
              <SubTitle>
                Dive into Otherworldly Adventures with Isekai Anime!
              </SubTitle>
              <GenreCarousel AnimeData={topAnime} />
            </div>
          </div>
        </div>
      </main>
    </QueryClientProvider>
  );
}
