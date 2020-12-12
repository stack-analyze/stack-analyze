// modules
const axios = require("axios").default;

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

    const animeData = res.data.results.map((anime) => {
      const { title, episodes, start_date, end_date, type } = anime;
      
      // anime dates
      const timeStart = new Date(start_date);
      const timeEnd = new Date(end_date);

      return {
        title,
        type,
        episodes,
        debut_date: `${timeStart.getFullYear()}-${timeStart.getMonth()}-${timeStart.getDate()}`,
        final_date: end_date === null ? "current date" : `${timeEnd.getFullYear()}-${timeEnd.getMonth()}-${timeEnd.getDate()}`
      };
    });

    console.table(animeData);

  } catch (err) { console.error(err.message); }
};

// exports module
module.exports = animeSearch;
