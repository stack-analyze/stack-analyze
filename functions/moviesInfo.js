// modules
import { default as axios } from "axios";
import colors from "colors";
import { printTable } from "console-table-printer";

// save movies
import { stackSave } from "../utils.js";

/** 
 * @description movie info tool
 * @async
 * @param { string } query - search any movie
 * @param { string } token
 * @returns { Promise<void> } - return movie lisy
*/
export default async function movieDB(query, token) {
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
      .filter((data) => data?.release_date);

    printTable(movieData);
    
    stackSave("movie-list.json", JSON.stringify(movieData, null, 2));
  } catch (err) {
    console.error(colors.red(err.message));
  }
}
