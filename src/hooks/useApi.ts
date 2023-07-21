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
});
