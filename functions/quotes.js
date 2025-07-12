import axios from "axios";
import colors from "colors";

/**
 * @description get random quote from anime characters.
 * @async
 * @param {string} anime 
 * @returns {Promise<void>}
 */
async function getAnimeQuote(anime) {
  try {
    /** @type {import('axios').AxiosResponse<import('../types.js').AnimeQuoute>} */
    const { data } = await axios.get("https://api.animechan.io/v1/quotes/random", {
      params: { anime }
    });

    const {
      content,
      anime: { altName: animeAltName, name: animeName },
      character: { name: characterName }
    } = data.data;

    console.info({
      content, animeAltName, animeName, characterName
    });
  } catch (err) {
    console.error(colors.red(/** @type {import('axios').AxiosError} */(err).message));
  }
}

export {
  getAnimeQuote
};
