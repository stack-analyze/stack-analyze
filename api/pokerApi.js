import axios from "axios";

export const pokerApi = axios.create({
  baseURL: "https://bicyclecards.com/how-to-play/",
});
