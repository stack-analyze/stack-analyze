// modules
import { default as axios } from "axios";
import { format } from "timeago.js";
import colors from "colors";
import { printTable } from "console-table-printer";

// save anime
import { stackSave } from "../utils.js";

/**
 *
 * @description call the anime serach info
 * @async
 * @param { string } q - get query results
 * @returns { Promise<void> } - return results serach
 *
 */
export default async function animeSearch(q) {
  try {
    // call api
    const { data } = await axios.get("https://api.jikan.moe/v4/anime", {
      params: { q }
    });

    const animeData = data.data.map(({
      title,
      episodes,
      aired,
      status,
      type }) => ({
      title,
      type,
      totalEpisodes: episodes || "current",
      debutDate: format(aired.from),
      finalDate: aired?.to
        ? format(aired.to)
        : status
    }));


    printTable(animeData.slice(0, 10));
    
    stackSave(`${q}-results.json`, JSON.stringify(animeData, null, 2));
  } catch (err) { console.error(colors.red(err.message)); }
}
