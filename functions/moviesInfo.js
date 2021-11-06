// modules
const axios = require("axios").default;
const { red } = require("colors");
const { Table } = require("console-table-printer");

/** 
 * @description movie info tool
 * @param { string } api_key - key required for api tool
 * @param { string } query - search any movie
 * @returns { Promise<void> } - return movie lisy
*/
const movieDB = async (api_key, query) => {
  try {
    const { data } = await axios.get("https://api.themoviedb.org/3/search/movie", {
      params: {
        api_key,
        query,
        page: 1
      }
    });

    const movieList = new Table({
      columns: [
        {
          name: "title",
          alignment: "left",
          color: "green"
        },
        {
          name: "original_language",
          alignment: "left",
          color: "green"
        },
        {
          name: "popularity",
          alignment: "left",
          color: "yellow"
        },
        {
          name: "vote_average",
          alignment: "left",
          color: "yellow"
        },
        {
          name: "release_date",
          alignment: "left",
          color: "yellow"
        }
      ]
    });

    const movieData = data.results
      .map(({
        title,
        original_language,
        popularity,
        vote_average,
        release_date
      }) => ({
        title,
        original_language,
        popularity,
        vote_average,
        release_date
      }))
      .sort((x, y) => {
        // date values
        const primaryDate = new Date(x.release_date);
        const secondaryDate = new Date(y.release_date);
        
        return primaryDate.getTime() - secondaryDate.getTime();
      })
      .filter(({ release_date }) => release_date !== undefined && release_date !== "");

    movieList.addRows(movieData);

    movieList.printTable();
  } catch (err) {
    console.error(red(err.message));
  }
};

// export
module.exports = movieDB;
