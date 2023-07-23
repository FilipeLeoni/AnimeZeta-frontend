import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import jwt_decode from "jwt-decode";

const api = axios.create({
  baseURL: process.env.API_URL,
});

const addAccessTokenToHeader = (config: any) => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${accessToken}`,
    };
  }

  return config;
};

api.interceptors.request.use(addAccessTokenToHeader);

const isTokenExpired = () => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    const decodedToken: any = jwt_decode(accessToken);
    const expirationTime = decodedToken.exp * 1000;

    return Date.now() >= expirationTime;
  }

  return true;
};

const renewAccessToken = async () => {
  try {
    const response = await api.patch("token/refresh", {
      refreshToken: localStorage.getItem("refreshToken"),
    });

    const newAccessToken = response.data.accessToken;
    localStorage.setItem("accessToken", newAccessToken);

    return true;
  } catch (error) {
    console.error("Erro ao renovar o token:", error);
    return false;
  }
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const isRenewed = await renewAccessToken();

      if (isRenewed) {
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${localStorage.getItem("accessToken")}`;
        return api(originalRequest);
      } else {
        localStorage.removeItem("accessToken");
        window.location.replace("/auth/login");
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
