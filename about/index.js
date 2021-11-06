// version module
const { license } = require("../package.json");

/**
 * @type {{ mainDeveloper: string, version: string, license: string }}
 */
const aboutApp = {
  mainDeveloper: "omega5300",
  license,
  version: process.env.npm_package_version
};

/**
 * @typedef {Object[]} ideas
 * @property {string} ideas.author
 * @property {string} ideas.tool
 */
const ideas = [
  { author: "verguiskarime", tool: "bitly info" }
];

/** @type { string[] } */
const developers = [ "omega5300" ];

/**
 * @typedef {Object[]} youtubeDev
 * @property {string} youtubeDev.youtubeChannel
 * @property {string} youtubeDev.recomendation
 */
const youtubeDev = [
  { youtubeChannel: "fazt", recomendation: "recommend" },
  { youtubeChannel: "doriandesings", recomendation: "recommend" },
  { youtubeChannel: "bluuweb", recomendation: "recommend" },
  { youtubeChannel: "leonidas esteban", recomendation: "neutral recommend" },
  { youtubeChannel: "fernando herrera", recomendation: "recommend" },
  { youtubeChannel: "soy dalto", recomendation: "neutral recommend" },
];

/**
 * @typedef {Object[]} nonolive
 * @property {string} nonolive.youtubeChannel
 * @property {string} nonolive.recomendation
 */
const nonolive = [
  { nonoID: 14278329, name: "⚔️GothspiceChann💰" },
  { nonoID: 28525468, name: "Seyyahi Solist" },
  { nonoID: 41145492, name: "ᴹᴰToniDAle" },
  { nonoID: 41135433, name: "ᴹᴰ🐰CELI69🦄🦎" },
  { nonoID: 17342980, name: "🎬Sailormoon🌙" },
  { nonoID: 31655138, name: "🦎🌟Aidee💋🦜" },
  { nonoID: 18539967, name: "💋🧉Narki🐺Lili" },
  { nonoID: 28480328, name: "🌼PAPATYA❣SS🌼" },
  { nonoID: 31925565, name: "💲💋Lili🧉🌟" },
  { nonoID: 9330839, name: "🦎🌟GUANI🌻🍦" }
];

/** @type { string[] } */
const twitch = [ "lunanny", "dannyaegyo" ];

/** @type { string[] } */
const projects = [ "Doofy's Projects" ];

module.exports = {
  aboutApp,
  developers,
  youtubeDev,
  nonolive,
  twitch,
  projects,
  ideas
};
