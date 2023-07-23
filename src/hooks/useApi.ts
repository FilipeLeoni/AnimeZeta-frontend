import { useAuth } from "@/context/AuthContext";
import api from "@/services/api";

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

  getAnimeList: async () => {
    const token = localStorage.getItem("accessToken");
    const res = await api.get("/mylist", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
    return res;
  },

  AddAnimeToList: async (
    jikanId: string,
    title: string,
    imageUrl: string,
    status: string
  ) => {
    const token = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const res = await api.post(
      "/mylist",
      { jikanId, title, imageUrl, status },
      { headers }
    );

    console.log(res);
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
