const axios = require("axios").default;

async function animeSearch(query) {
    let run;
    try {
        const res = await axios.get("https://api.jikan.moe/v3/search/anime", {
      params: {
        q: query,
        limit: 10
      }
    });

        run = res.data
    } catch (err) {
        run = err.message;
    }
    return run;
}

module.exports = animeSearch;

