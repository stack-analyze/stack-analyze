// modules
import { default as axios } from "axios";
import { format } from "timeago.js";
import colors from "colors";
import { printTable } from "console-table-printer";

/**
 *
 * @description call the anime serach info
 * @param { string } query - get query results
 * @returns { Promise<void> } - return results serach
 *
 */
const animeSearch = async (query) => {
  /* error manager */
  try {
    // call api
    const { data } = await axios.get("https://api.jikan.moe/v4/anime", {
      params: {
        q: query,
        limit: 10
      }
    });

    const animeData = data.data.map(({
      title,
      episodes,
      aired,
      status,
      type }) => ({
      title,
      type,
      totalEpisodes: episodes ?? 1,
      debutDate: format(aired.from),
      finalDate: aired.to !== null
        ? format(aired.to)
        : status
    }));


    printTable(animeData);
  } catch (err) { console.error(colors.red(err.message)); }
};

// exports module
export default animeSearch;
