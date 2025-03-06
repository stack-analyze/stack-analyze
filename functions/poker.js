import { load } from "cheerio";
import colors from "colors";

import { pokerApi } from "../api/pokerApi.js";

/**
 * @typedef {"go-fish"|"gin-rummy"|"blackjack"|"slapjack"|"basics-of-poker"|"texas-holdem-poker"} Options
 * @params {Options} game
 * @returns {Promise<void>}
 */
export default async function pokerGame(game) {
  try {
    const { data } = await pokerApi.get(game);
    
    // extract rules
    const $ = load(data);
    
    const [age, players] = $(".border-brand-blue-pale div:not(.text-brand-blue)").map(
      (i, el) => $(el).text()
    ).get().slice(1);
		
    const howPlayTitle = $("h3.text-2xl").map(
      (i, el) => $(el).text()
    ).get();
		
    const howPlayDesc = $("h3.text-2xl+p.mb-5").map(
      (i, el) => $(el).text()
    ).toArray();
    
    // poker game
    const pokerGame = {
      title: $("title").text(),
      age, players,
      ...(Object.fromEntries(
        howPlayTitle.map((item, i) => [item, howPlayDesc[i]])
      ))
    };
    console.table(pokerGame);
  } catch(err) {
    console.info(colors.red(err.message));
  }
}
