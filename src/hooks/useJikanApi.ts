import jikanAPI from "@/services/JikanAPI";

export const useJikanAPI = () => ({
    getTopAnimes: async () => {
      const res = await jikanAPI.get('https://api.jikan.moe/v4/top/anime?filter=bypopularity');
      return res.data;
    },

    getAnimesByGenre: async (genreId: number | string, page: number = 1) => {
      const res = await jikanAPI.get(`/anime?genres=${genreId}&page=${page}`);
      return res.data;
    },

    getAnimeById: async (id: number) => {
      const res = await jikanAPI.get(`/anime/${id}/full`);
      return res.data;
    },

    getCharacterById: async (characterId: number) => {
      const res = await jikanAPI.get(`/characters/${characterId}/full`);
      return res.data;
    },

    getAnimeInfoByType: async (animeId: number, type:  string) => {
      const res = await jikanAPI.get(`/anime/${animeId}/${type}`);
      return res.data;
    },

});