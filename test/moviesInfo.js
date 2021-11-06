// axios module
const axios = require("axios").default;

const movieDB = async (api_key, query) => {
  let run;
  try {
    const { data } = await axios.get("https://api.themoviedb.org/3/search/movie", {
      params: {
        api_key,
        query,
        page: 1
      }
    });

    run = data.results
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
      }));
  } catch (err) {
    run = err.message;
  }
};

// export
module.exports = movieDB;
