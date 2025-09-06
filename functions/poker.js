import { load } from "cheerio";
import colors from "colors";

import { pokerApi } from "../api/pokerApi.js";
import { stackSave } from "../utils.js";

/**
 * @typedef {"go-fish"|"gin-rummy"|"blackjack"|"slapjack"|"basics-of-poker"|"texas-holdem-poker"} Options
 * @param {Options} game
 * @returns {Promise<void>}
 */
export default async function pokerGame(game) {
  try {
    const { data } = await pokerApi.get(game);
    
    // extract rules
    const $ = load(data);

    const title = $("title").text();
    
    const [age, players] = $(".border-brand-blue-pale div:not(.text-brand-blue)").map(
      (i, el) => $(el).text()
    ).get().slice(1);
		
    const howPLay = $("h3.text-2xl+p.mb-5").map(
      (i, el) => $(el).text()
    ).get().slice(0, 5);
    
    // poker game
    const pokerGame = { title, age, players, howPLay };
    const pokerTable = { ...pokerGame };
    delete pokerTable.howPLay;
    console.table(pokerTable);
    
    stackSave(`${title}.json`, JSON.stringify(pokerGame, null, 2));
    console.info("poker rule file is created".green);
  } catch(err) {
    console.info(colors.red(err.message));
  }
}
