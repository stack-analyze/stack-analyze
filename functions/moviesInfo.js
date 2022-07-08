// modules
import { default as axios } from "axios";
import colors from "colors";
import { printTable } from "console-table-printer";

/** 
 * @description movie info tool
 * @param { string } query - search any movie
 * @returns { Promise<void> } - return movie lisy
*/
const movieDB = async (query, token) => {
  try {
    const { data } = await axios.get("https://api.themoviedb.org/3/search/movie", {
      params: {
        api_key: token,
        query,
        page: 1
      }
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

    printTable(movieData);
  } catch (err) {
    console.error(colors.red(err.message));
  }
};

// export
export default movieDB;
