// modules
const axios = require("axios").default;
const { format } = require("timeago.js");
const { red } = require("colors");

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
    const res = await axios.get("https://api.jikan.moe/v3/search/anime", {
      params: {
        q: query,
        limit: 10
      }
    });

    const animeData = res.data.results.map(({ title, episodes, start_date, end_date, type }) => ({
      title,
      type,
      episodes,
      debut_date: format(start_date),
      final_date: end_date === null ? "current date" : format(end_date)
    }));

    console.table(animeData);

  } catch (err) { console.error(red(err.message)); }
};

// exports module
module.exports = animeSearch;
