import axios from "axios";

const BASE_URL = "https://api.jikan.moe/v4";

const jikanAPI = axios.create({
  baseURL: BASE_URL,
});

export default jikanAPI;
