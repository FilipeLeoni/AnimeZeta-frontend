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
    const accessToken = res.data.accessToken;
    localStorage.setItem("accessToken", accessToken);
    return res;
  },
});
