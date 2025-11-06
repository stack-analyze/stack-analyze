import { writeFile } from "node:fs/promises";
import colors from "colors";

const listFormat = new Intl.ListFormat("en", {
  style: "short",
  type: "conjunction"
});

const currency = new Intl.NumberFormat("en-us", {
  style: "currency", currency: "USD"
});

/** @type {string} */
const returnMainOpts = "return main menu";

const scrapingOpts = [
  "title", "images", "metadata", "headings",
  "tableHead", "tableData", "links", "cites"
];

const pokerGameOpts = [
  "go-fish", "gin-rummy", "blackjack", "slapjack",
  "basics-of-poker", "texas-holdem-poker"
];

/**
 * @readonly
 * @type {Object<string,number>}
 */
const TCGP_EXPANSIONS = {
  "p-a": 100,
  a1: 286,
  a1a: 86,
  a2: 207,
  a2a: 96,
  a2b: 111,
  a3: 239,
  a3a: 103,
  a3b: 107,
  a4: 241,
  a4a: 105,
  b1: 331,
};

/**
 * @param {string} filename 
 * @param {any} data 
 * @returns {Promise<void>}
 */
const stackSave = async (filename, data) => {
  if (!data) {
    console.error("stackSave no using falsy values");
    return;
  }

  if (typeof data === "boolean") {
    console.info("stackSave no using boolean types");
    return;
  }

  try {
    await writeFile(filename, data);
  } catch (err) {
    console.info(colors.red(err.message));
  }
};

const exitMsg = "thanks for use stack-analyze".green;

/**
 * @param {Error} err
 * @returns {void}
 */
const forceExit = (err) => {
  if (err.name === "ExitPromptError") {
    console.info("👋 until next time!".green);
    process.exit(1);
  }
};

export {
  listFormat, currency, scrapingOpts, forceExit,
  stackSave, pokerGameOpts, exitMsg, returnMainOpts, TCGP_EXPANSIONS
};

