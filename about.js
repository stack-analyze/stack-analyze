// print table
import { printTable } from "console-table-printer";

import { listFormat } from "./utils.js";

// package.json
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { license, version } = require("./package.json");

const timeout = 1e3;

/**
 * types for about tools
 * 
 * @typedef {Object} info
 * @property {string} info.mainDeveloper
 * @property {string} info.version
 * @property {string} info.license
 * 
 * @typedef {Object} developerList
 * @property {string} developerList.name
 * @property {string} developerList.roles
 * 
 * @typedef {Object} youtube
 * @property {string} youtubeChannel
 * @property {string} recomendation
 * 
 * @typedef {Object} twitch
 * @property {string} twitch.user
 * @property {string} [twitch.details]
 * 
 * @typedef {Object} project
 * @property {string} project.name
 * @property {string} project.desc
 */

const aboutTool = {
  mainInfo(refreshCallback) {
    /** @type {info} */
    const aboutApp = {
      mainDeveloper: "omega5300",
      license,
      version
    };

    console.clear();
    console.table(aboutApp);
    setTimeout(refreshCallback, timeout);
  },
  lineup(refreshCallback) {
    /** @type {developerList[]} */
    const developers = [
      {
        name: "omega5300",
        roles: listFormat.format(["main developer", "lead project", "founder"])
      }
    ];

    console.clear();
    printTable(developers);
    setTimeout(refreshCallback, timeout);
  },
  youtubeRecomendation(refreshCallback) {
    /** @type {youtube[]} */
    const youtubeDev = [
      { youtubeChannel: "fazt", recomendation: "recommend" },
      { youtubeChannel: "doriandesings", recomendation: "recommend" },
      { youtubeChannel: "bluuweb", recomendation: "recommend" },
      { youtubeChannel: "leonidas esteban", recomendation: "neutral recommend" },
      { youtubeChannel: "fernando herrera", recomendation: "recommend" },
      { youtubeChannel: "soy dalto", recomendation: "neutral recommend" },
    ];

    console.clear();
    printTable(youtubeDev);
    setTimeout(refreshCallback, timeout);
  },
  twitchRecomendation(refreshCallback) { 
    /** @type {twitch[]} */
    const twitchUsers = [
      {
        user: "dannyaegyo",
      },
      {
        user: "Lunanny",
        details: "audiovisual student with ADHD."
      }
    ];

    console.clear();
    printTable(twitchUsers);
    setTimeout(refreshCallback, timeout);
  },
  projectsRecomendation(refreshCallback) {
    /** @type {project[]} */
    const projects = [
      {
        name: "Doofy's Projects",
        desc: "tools and systems customs"
      },
      {
        name: "black metal promotion",
        desc: "promos albums and community"
      }
    ];

    console.clear();
    printTable(projects);
    setTimeout(refreshCallback, timeout);
  }
};

export default aboutTool;
