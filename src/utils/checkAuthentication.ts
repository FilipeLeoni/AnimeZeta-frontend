import Cookies from "js-cookie";
import { decodeAccessToken } from "./decodeAccessToken";
import { useApi } from "@/hooks/useApi";

export const CheckAuthentication = async () => {
  const api = useApi();

  const accessToken = Cookies.get("accessToken");
  if (accessToken) {
    const decodedToken = decodeAccessToken(accessToken);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp && decodedToken.exp < currentTime) {
      try {
        const refreshTokenResponse = await api.refreshToken();
        const newAccessToken = refreshTokenResponse.data.accessToken;
        Cookies.set("accessToken", newAccessToken);
      } catch (error) {
        return false;
      }
    }
  } else {
  }

  return true;
};
