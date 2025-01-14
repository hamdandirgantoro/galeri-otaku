import { fetchData } from "./api";

export const getMangasHome = () => fetchData(`manga?limit=6`);
export const getMangas = (param = null) =>
  fetchData(`manga${param ? param : ""}${param ? "&sfw=true" : "?sfw=true"}`);
export const getMangaById = (id, param = null) =>
  fetchData(`manga/${id}${param ? param : ""}`);
