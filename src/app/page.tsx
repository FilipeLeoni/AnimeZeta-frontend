import { useJikanAPI } from "@/hooks/useJikanApi";
import SuperCarousel from "@/components/SuperCarousel";
import GenreCarousel from "@/components/GenreCarousel";

export default async function Home() {
  const api = useJikanAPI();
  const [topAnime, actionAnime, comedyAnime, isekaiAnime] = await Promise.all([
    topAnimes(),
    actionAnimes(),
    comedyAnimes(),
    isekaiAnimes(),
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

  async function isekaiAnimes() {
    const res = await api.getAnimesByGenre(62);
    return res.data;
  }

  return (
    <main>
      <title>AnimeZeta</title>
      <div className="grid grid-cols-1 w-full sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12 gap-4 sm:gap-6 lg:max-w-5xl md:max-w-3xl mx-20 max-w-md sm:mx-0 pt-36 pb-20">
        <SuperCarousel data={topAnime} />

        <GenreCarousel
          AnimeData={actionAnime}
          Title="Get Ready for Thrilling Action Anime!"
        />

        <GenreCarousel
          AnimeData={comedyAnime}
          Title="Laugh Out Loud with Comedy Anime!"
        />

        <GenreCarousel
          AnimeData={isekaiAnime}
          Title="Dive into Otherworldly Adventures with Isekai Anime!"
        />
      </div>
    </main>
  );
}
