// package.json
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { license, version } = require("./package.json");

/**
 * @type {{ mainDeveloper: string, version: string, license: string }}
 */
const aboutApp = {
  mainDeveloper: "omega5300",
  license,
  version
};

/**
 * @typedef {Object} ideas
 * @property {string} ideas.author
 * @property {string} ideas.tool
 */

/** @type {ideas[]} */
const ideas = [
  { author: "verguiskarime", tool: "bitly info" }
];

/** @type { string[] } */
const developers = [ "omega5300" ];

/**
 * @typedef {Object} youtubeDev
 * @property {string} youtubeDev.youtubeChannel
 * @property {string} youtubeDev.recomendation
 */

/** @type {youtubeDev[]} */
const youtubeDev = [
  { youtubeChannel: "fazt", recomendation: "recommend" },
  { youtubeChannel: "doriandesings", recomendation: "recommend" },
  { youtubeChannel: "bluuweb", recomendation: "recommend" },
  { youtubeChannel: "leonidas esteban", recomendation: "neutral recommend" },
  { youtubeChannel: "fernando herrera", recomendation: "recommend" },
  { youtubeChannel: "soy dalto", recomendation: "neutral recommend" },
];

/** @type { string[] } */
const twitch = [ "dannyaegyo", "Lunanny" ];

/** @type { string[] } */
const projects = [ "Doofy's Projects" ];

export {
  aboutApp,
  developers,
  youtubeDev,
  twitch,
  projects,
  ideas
};
