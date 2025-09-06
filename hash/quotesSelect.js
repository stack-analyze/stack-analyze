// import { input } from "@inquirer/prompts";
import { getSwiftQuotes } from "../functions/quotes.js";
import { returnMainOpts } from "../utils.js";
/**
* select types
 * @typedef {({
 *   [x: string]: (
 *     refreshCallback: () => Promise<void>, 
 *     alternativeCallback?: () => Promise<void>
 *   ) => Promise<void> | void
 * })} Select
 * /

/** @type {Select}*/
const quoteSelect = {
  
  swiftQuotes: (refreshCallback) => {
    getSwiftQuotes();
    setTimeout(refreshCallback, 5000);
  }
};

const menuQuoteOpts = [...Object.keys(quoteSelect), returnMainOpts];

export {quoteSelect, menuQuoteOpts };
