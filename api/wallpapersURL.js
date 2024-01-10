import axios from "axios";

export const wallpapersURL = axios.create({
  baseURL: "https://sol-moon-wallpapers.vercel.app/",
  responseType: "stream"
});
