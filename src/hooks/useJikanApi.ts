import jikanAPI from "@/services/JikanAPI";

export const useJikanAPI = () => ({
    getTopAnimes: async () => {
      const res = await jikanAPI.get('https://api.jikan.moe/v4/top/anime?filter=bypopularity');
      return res.data;
    },

    getAnimesByGenre: async (genreId: number) => {
      const res = await jikanAPI.get(`/anime?genres=${genreId}`);
      return res.data;
    },

    getCurrentSeasonAnimes: async () => {
      const res = await jikanAPI.get(`/seasons/now`);
      return res.data;
    }
});