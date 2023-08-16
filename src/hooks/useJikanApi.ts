import jikanAPI from "@/services/JikanAPI";
import { fetchWrapper } from "@/services/fetch";

export const useJikanAPI = () => ({
  getTopAnimes: async () => {
    return fetchWrapper("top/anime?filter=favorite", {
      method: "GET",
    });
  },

  getAnimesByGenre: async (genreId: number, page: number = 1) => {
    const res = await jikanAPI.get(
      `anime?genres=${genreId}&page=${page}&order_by=popularity`
    );
    return res.data;
    // return fetchWrapper(
    //   `anime?genres=${genreId}&page=${page}&order_by=popularity`,
    //   {
    //     method: "GET",
    //   }
    // );
  },

  getCharacterById: async (characterId: number) => {
    return fetchWrapper(`characters/${characterId}/full`, {
      method: "GET",
    });
  },

  getAnimeInfoByType: async (animeId: number, type: string) => {
    return fetchWrapper(`anime/${animeId}/${type}`, {
      method: "GET",
    });
  },

  getAnimeById: async (id: number) => {
    const res = await jikanAPI.get(`/anime/${id}/full`);
    return res.data;
    // return fetchWrapper(`anime/${id}/full`, {
    //   method: "GET",
    // });
  },

  searchAnime: async (search: string, genres: any = "", type: any = null) => {
    const genreParams =
      genres.length > 0
        ? `&genres=${genres.map((genre: any) => genre.value).join(",")}`
        : "";
    const typeQuery = type ? `&type=${type.value}` : "";
    const res = await jikanAPI.get(
      `/anime?q=${search}${genreParams}${typeQuery}`
    );
    return res.data;
  },

  getGenres: async () => {
    const res = await jikanAPI.get(`/genres/anime`);
    return res.data;
  },
});
