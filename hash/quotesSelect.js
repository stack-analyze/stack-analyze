import { input } from "@inquirer/prompts";
import { getAnimeQuote } from "../functions/quotes.js";

/** @type {import("../types.js").Select}*/
const quoteSelect = {
  animeQuote: async (refreshCallback) => {
    const quote = await input({
      message: "enter a anime for get random quote: \u0022if press enter key get random\u0022:".yellow,
    });

    getAnimeQuote(quote);
    setTimeout(refreshCallback, 5000);
  },
};

export default quoteSelect;
