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
    const { data } = await axios.get("https://api.jikan.moe/v3/search/anime", {
      params: {
        q: query,
        limit: 10
      }
    });

    const animeData = data.results.map(({
      title,
      episodes,
      start_date,
      end_date,
      type }) => ({
      title,
      type,
      episodes,
      debutDate: format(start_date),
      finalDate: end_date !== null
        ? format(end_date)
        : "current date"
    }));


    printTable(animeData);
  } catch (err) { console.error(colors.red(err.message)); }
};

// exports module
export default animeSearch;
