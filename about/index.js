// version module
const { version, license } = require("../package.json");

/**
 * @type { { mainDeveloper: string, version: string, license: string } }
 */
const aboutApp = {
  mainDeveloper: "omega5300",
  license,
  version
};

/** @type { string[] } */
const developers = [
  "omega5300"
];

/**
 * @typedef {Object[]} youtubeDev
 * @property {string} youtubeDev.youtubeChannel
 * @property {string} youtubeDev.recomendation
 */
const youtubeDev = [
  {
    youtubeChannel: "fazt",
    recomendation: "recommend"
  },
  {
    youtubeChannel: "doriandesings",
    recomendation: "recommend"
  },
  {
    youtubeChannel: "bluuweb",
    recomendation: "recommend"
  },
  {
    youtubeChannel: "leonidas esteban",
    recomendation: "neutral recommend"
  },
  {
    youtubeChannel: "fernando herrera",
    recomendation: "recommend"
  },
  {
    youtubeChannel: "soy dalto",
    recomendation: "neutral recommend"
  },
];

/**
 * @typedef {Object[]} nonolive
 * @property {string} nonolive.youtubeChannel
 * @property {string} nonolive.recomendation
 */
const nonolive = [
  {
    nonoID: 14278329,
    name: "⚔️GothspiceChann💰"
  },
  {
    nonoID: 33519748,
    name: "Ly Pháp ❤️",
  },
  {
    nonoID: 28525468,
    name: "Seyyahi Solist"
  },
  {
    nonoID: 41145492,
    name: "ᴹᴰToni😈🦇Stream"
  },
  {
    nonoID: 35874353,
    name: "AlpiCornioRex🦙🦄🦖"
  },
  {
    nonoID: 41135433,
    name: "ᴹᴰ🐰CELI🦄🦎"
  },
  {
    nonoID: 17342980,
    name: "🎬Sailormoon🌙"
  },
  {
    nonoID: 31655138,
    name: "🦎🌟Aidee💋🦜"
  },
  {
    nonoID: 9330839,
    name: "🦎🌟GUANI🌻🍦"
  }
];

/** @type { string[] } */
const twitch = [
  "lunanny",
  "dannyaegyo"
];

/** @type { string[] } */
const projects = [
  "Doofy's Projects"
];

module.exports = {
  aboutApp,
  developers,
  youtubeDev,
  nonolive,
  twitch,
  projects
};
