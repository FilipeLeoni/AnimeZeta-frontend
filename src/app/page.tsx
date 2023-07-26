// import { useQuery } from "react-query";
// import { Heart, Lightning, Planet, Smiley } from "@phosphor-icons/react";

import { useJikanAPI } from "@/hooks/useJikanApi";
import SuperCarousel from "@/components/SuperCarousel";
import GenreCarousel from "@/components/GenreCarousel";

// import Spinner from "@/components/SpinnerLoading";
// import { useAuth } from "@/context/AuthContext";

export default async function Home() {
  const api = useJikanAPI();
  const [topAnime, actionAnime, comedyAnime, romanceAnime] = await Promise.all([
    topAnimes(),
    actionAnimes(),
    comedyAnimes(),
    romanceAnimes(),
  ]);

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

  async function romanceAnimes() {
    const res = await api.getAnimesByGenre(22);
    return res.data;
  }

  // console.log(dataExample);

  // const actionData = await actionAnimes();

  // const getTopAnimes = async () => {
  //   const res = await api.getTopAnimes();
  //   return res.data;
  // };

  // const getAnimesByGenre = async () => {
  //   const res = await api.getAnimesByGenre(1);
  //   return res.data;
  // };
  // const [topAnime, actionAnime] = await Promise.all([
  //   getTopAnimes(),
  //   getAnimesByGenre(),
  // ]);
  // const {
  //   data: topAnimes,
  //   isLoading: isLoadingTopAnimes,
  //   error,
  // } = useQuery("topAnimes", async () => {
  //   const res = await api.getTopAnimes();
  //   return res.data;
  // });

  // const fetchAnimesByGenre = async (genre: number) => {
  //   const res = await api.getAnimesByGenre(genre);
  //   return res.data;
  // };

  // const { data: actionAnimes, isLoading: isLoadingActionAnimes } = useQuery(
  //   "actionAnimes",
  //   () => fetchAnimesByGenre(1)
  // );

  // const { data: comedyAnimes, isLoading: isLoadingComedyAnimes } = useQuery(
  //   "comedyAnimes",
  //   () => fetchAnimesByGenre(4)
  // );
  // const { data: romanceAnimes, isLoading: isLoadingRomanceAnimes } = useQuery(
  //   "romanceAnimes",
  //   () => fetchAnimesByGenre(22)
  // );
  // const { data: isekaiAnimes, isLoading: isLoadingIsekaiAnimes } = useQuery(
  //   "isekaiAnimes",
  //   () => fetchAnimesByGenre(62)
  // );

  return (
    <main>
      <title>AnimeZeta</title>
      <div className="grid grid-cols-1 w-full sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12 gap-4 sm:gap-6 lg:max-w-5xl md:max-w-3xl mx-20 max-w-md sm:mx-0 pt-36 pb-20">
        {/* {isLoadingTopAnimes ? (
          <div className="flex justify-center items-center w-full col-span-12 h-64">
            <Spinner />
          </div>
        ) : (
        )} */}
        <SuperCarousel data={topAnime} />

        <GenreCarousel
          AnimeData={actionAnime}
          Title="Get Ready for Thrilling Action Anime!"
          // Icon={Lightning}
        />

        {/* {isLoadingActionAnimes ? (
          <div className="flex justify-center items-center w-full col-span-12 h-64">
            <Spinner />
          </div>
        ) : ( */}
        <GenreCarousel
          AnimeData={actionAnime}
          Title="Get Ready for Thrilling Action Anime!"
          // Icon={Lightning}
        />
        {/* )} */}

        {/* {isLoadingComedyAnimes ? (
          <div className="flex justify-center items-center w-full col-span-12 h-64">
            <Spinner />
          </div>
        ) : ( */}
        <GenreCarousel
          AnimeData={comedyAnime}
          Title="Laugh Out Loud with Comedy Anime!"
          // Icon={Smiley}
        />
        {/* // )} */}

        {/* {isLoadingRomanceAnimes ? (
          <div className="flex justify-center items-center w-full col-span-12 h-64">
            <Spinner />
          </div>
        ) : ( */}
        <GenreCarousel
          AnimeData={romanceAnime}
          Title="Delve into Romance Anime!"
          // Icon={Heart}
        />
        {/* )} */}

        {/* {isLoadingIsekaiAnimes ? (
          <div className="flex justify-center items-center w-full col-span-12 h-64">
            <Spinner />
          </div>
        ) : ( */}
        {/* <GenreCarousel
            AnimeData={isekaiAnimes}
            Title="Dive into Otherworldly Adventures with Isekai Anime!"
            // Icon={Planet}
          /> */}
        {/* )} */}
      </div>
    </main>
  );
}
