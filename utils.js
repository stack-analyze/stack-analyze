import { writeFile } from "node:fs/promises";

const listFormat = new Intl.ListFormat("en", {
  style: "short",
  type: "conjunction"
});

const currency = new Intl.NumberFormat("en-us", {
  style: "currency", currency: "USD"
});

const returnMainOpts = "return main menu";

const menuOpts = [
  "web", "info", "query", "utility", "wallpapers", 
  "about", "exit"
];

const menuWebOpts = [
  "single", "multiple", "pagespeed", "scraping", "css_validate", 
  returnMainOpts
];

const menuInfoOpts = [
  "github_info", "crypto_market", "bitly_info", "bundlephobia_info", returnMainOpts
];

const menuQueryOpts = [
  "anime_Search", "movie_info", "pokemon_info", 
  "twitch_info", "deezer", "potter_search", returnMainOpts
];

const menuUtilityOpts = [
  "hardware", "password", "poker_game", returnMainOpts
];

const menuWallpaperOpts = ["solMoon", "dimensions", "seyyahi2", returnMainOpts];

const menuHardwareOpts = [
  "cpuInfo", "ramMemInfo", "osDetail", "diskInfo",
  "controllerInfo", "displayInfo", "biosInfo", returnMainOpts
];

const menuAboutOpts = [
  "mainInfo", "lineup", "youtubeRecomendation",
  "twitchRecomendation", "projectsRecomendation", returnMainOpts
];

const scrapingOpts = [
  "title", "images", "metadata", "headings",
  "tableHead", "tableData", "links", "cites"
];

const pokerGameOpts = [
  "go-fish", "gin-rummy", "blackjack", "slapjack",
  "basics-of-poker", "texas-holdem-poker"
];

/**
 * 
 * @param {string} filename 
 * @param {any} data 
 * @returns {Promise<void>}
 */
const stackSave = async (filename, data) => {
  if (!data) {
    console.error("stackSave no using falsy values");
    return;
  }
  
  if(typeof data === "boolean") {
    console.info("stackSave no using boolean types");
    return;
  }

  try {
    await writeFile(filename, data);
  } catch (err) {
    console.info(err.message);
  }
};

const exitCli = "thanks for use stack-analyze";

export {
  listFormat,
  currency,
  menuOpts,
  menuWebOpts,
  menuInfoOpts,
  menuQueryOpts,
  menuUtilityOpts,
  menuHardwareOpts,
  menuWallpaperOpts,	
  menuAboutOpts,
  scrapingOpts,
  stackSave,
  pokerGameOpts,
  exitCli
};

