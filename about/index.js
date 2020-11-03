// version module
const { version } = require("../package.json");


/**
 * about data object
 * @typedef { Object } aboutApp - structure info app
 * @property { string } aboutApp.mainDeveloper - leader cli app developers
 * @property { string[] } aboutApp.developers - developers author the cli app
 * @property { string[] } aboutApp.devRecommendationYoutube - youtubers recomendation from omega5300
 * @property { string } aboutApp.version - version the cli app
 */
const aboutApp = {
  mainDeveloper: "omega5300",
  developers: ["omega5300"].join(", "),
  devRecommendationYoutube: ["fazt", "doriandesings", "bluuweb"].join(", "),
  nonoliveStreamersRecommendation: ["⚔️GothspiceChann💰"].join(", "),
  version
};

module.exports = aboutApp;
