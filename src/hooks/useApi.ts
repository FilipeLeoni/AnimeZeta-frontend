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
    episodes: number
  ) => {
    const accessToken = Cookies.get("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const res = await api.post(
      "mylist",
      { jikanId, title, imageUrl, status, episodes },
      { headers }
    );
    return res;
  },

  UpdateAnime: async (id: string, status?: string, episodes?: number) => {
    const accessToken = Cookies.get("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const res = await api.patch(
      `status/${id}`,
      { status, episodes },
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

  getUser: async () => {
    const token = localStorage.getItem("accessToken");
    const res = await api.get("/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },
});
