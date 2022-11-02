const listFormat = new Intl.ListFormat("en", {
  style: "short",
  type: "conjunction"
});

const currency = new Intl.NumberFormat("en-us", {
  style: "currency", currency: "USD"
});

const returnMainOpts = "return main menu";

const menuOpts = ["web", "query", "hardware", "about", "exit"];

const menuWebOpts = [
  "single", "multiple", "pagespeed", "scraping", returnMainOpts
];

const menuQueryOpts = [
  "github_info", "anime_Search", "bitly_info", "movie_info",
  "twitch_info", "crypto_market", "password", returnMainOpts
];

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

const exitCli = "thanks for use stack-analyze";

export {
  listFormat,
  currency,
  menuOpts,
  menuWebOpts,
  menuQueryOpts,
  menuHardwareOpts,
  menuAboutOpts,
  scrapingOpts,
  exitCli
};

