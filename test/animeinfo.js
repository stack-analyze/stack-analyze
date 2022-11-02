const axios = require("axios").default;

async function animeSearch(q) {
    let run;
    try {
        const { data } = await axios.get("https://api.jikan.moe/v4/anime", {
            params: { q }
        });

        run = data
    } catch (err) {
        run = err.message;
    }
    return run;
}

module.exports = animeSearch;
