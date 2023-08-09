import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import jwt_decode from "jwt-decode";

const api = axios.create({
  baseURL: process.env.API_URL,
});

export default api;
