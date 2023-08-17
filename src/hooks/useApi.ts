import { fetchApi, fetchWrapper } from "@/services/fetch";

import api from "@/services/api";

import Cookies from "js-cookie";

export const useApi = () => ({
  createUser: async (username: string, email: string, password: string) => {
    const res = await api.post("/user", {
      username,
      email,
      password,
    });
    return res;
  },

  refreshToken: async () => {
    try {
      const res: any = await api.patch("/token/refresh");
      return res;
    } catch (error) {
      console.error("Erro ao renovar o token:", error);
      throw error;
    }
  },

  login: async (email: string, password: string) => {
    const res = await api.post("/sessions", {
      email,
      password,
    });
    return res;
  },

  getUser: async () => {
    const accessToken = Cookies.get("accessToken");
    const res = await api.get("/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  },

  getAnimeList: async () => {
    const accessToken = Cookies.get("accessToken");
    const headers = { Authorization: `Bearer ${accessToken}` };
    const res: any = await api.get("/mylist", { headers });
    return res.data;
  },

  AddAnimeToList: async (
    jikanId: string,
    title: string,
    imageUrl: string,
    status: string,
    episodeProgress: number,
    episodes?: number,
    rating?: number
  ) => {
    const accessToken = Cookies.get("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const res = await api.post(
      "mylist",
      { jikanId, title, imageUrl, status, episodeProgress, episodes, rating },
      { headers }
    );
    return res;
  },

  UpdateAnime: async (
    id: string,
    status?: string,
    episodeProgress?: number,
    rating?: number
  ) => {
    const accessToken = Cookies.get("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const res = await api.patch(
      `status/${id}`,
      { status, episodeProgress, rating },
      { headers }
    );
    return res;
  },

  RemoveAnime: async (id: string) => {
    const accessToken = Cookies.get("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const res = await api.delete(`anime/${id}`, { headers });
    return res;
  },
});
