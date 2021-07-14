// modules
const axios = require("axios").default;
const { format } = require("timeago.js");
const { red } = require("colors");
const { Table } = require("console-table-printer");

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

    const animeList = new Table({
      columns: [
        {
          name: "title",
          alignment: "left",
          color: "green"
        },
        {
          name: "type",
          alignment: "left",
          color: "magenta"
        },
        {
          name: "episodes",
          alignment: "left",
          color: "magenta"
        },
        {
          name: "debutDate",
          alignment: "left",
          color: "magenta"
        },
        {
          name: "finalDate",
          alignment: "left",
          color: "green"
        }
      ]
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
        

    animeList.addRows(animeData);

    animeList.printTable();

  } catch (err) { console.error(red(err.message)); }
};

// exports module
module.exports = animeSearch;
