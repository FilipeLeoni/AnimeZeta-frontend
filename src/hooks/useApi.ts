import { useAuth } from "@/context/AuthContext";
import { fetchApi } from "@/services/fetch";

import api from "@/services/api";
import Cookie from "js-cookie";
import { cookies } from "next/headers";
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
  login: async (email: string, password: string) => {
    const res = await api.post("/sessions", {
      email,
      password,
    });
    return res;
  },

  getAnimeList: async (accessToken: string) => {
    const headers = { Authorization: `Bearer ${accessToken}` };
    return fetchApi("mylist", { headers, method: "GET" });
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
