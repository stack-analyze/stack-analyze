// version module
const { version } = require("../package.json");

/**
 * about data object
 * @typedef { Object } aboutApp - structure info app
 * @property { string } aboutApp.mainDeveloper - leader cli app developers
 * @property { string[] } aboutApp.developers - developers author the cli app
 * @property { string[] } aboutApp.devRecommendationYoutube - youtubers recomendation from omega5300
 * @property { string[] } aboutApp.nonoliveStreamersRecommendation - nonolive streamers recomendation from omega5300 
 * @property { string[] } aboutApp.projectsRecommendation - projects recomendation from omega5300
 * @property { string[] } aboutApp.twitchRecommendation - twitch users recomendation from omega5300
 * @property { string } aboutApp.version - version the cli app
 */
const aboutApp = {
  mainDeveloper: "omega5300",
  developers: ["omega5300"].join(", "),
  devRecommendationYoutube: [
    "fazt", 
    "doriandesings", 
    "bluuweb", 
    "leonidas esteban",
  ].join(", "),
  nonoliveStreamersRecommendation: [
    "⚔️GothspiceChann💰 (14278329)",
    "JUJU جوهري🎵SS (17342980)",
    "ᴹᴰToni😈🦇Stream (41145492)",
    "AlpiCornioRex🦙🦄🦖 (35874353)"
  ].join(","),
  projectsRecommendation: ["Doofy's Projects"].join(", "),
  twitchRecommendation: ["lunanny", "dannyaegyo"].join(", "),
  version
};

module.exports = aboutApp;
