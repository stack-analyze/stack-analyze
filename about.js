// print table
import { printTable } from "console-table-printer";
import { returnMainOpts, listFormat } from "./utils.js";

// package.json
const { default: { license, version } } = await import("./package.json", { with: { type: "json" } });

/**
 * @typedef {Object} DeveloperList
 * @property {string} DeveloperList.name
 * @property {string} DeveloperList.roles
 * 
 * @typedef {Object} Youtube
 * @property {string} Youtube.youtubeChannel
 * @property {string} Youtube.recomendation
 * 
 * @typedef {Object} Twitch
 * @property {string} Twitch.user
 * @property {string} [Twitch.details]
 * 
 * @typedef {Object} Project
 * @property {string} Project.name
 * @property {string} Project.desc
 * 
 */


/** @type {number} */
const timeout = 1e3;

const aboutTool = {
  mainInfo(refreshCallback) {
    /** @type {Object<string, string>} */
    const aboutApp = {
      mainDeveloper: "omega5300",
      license, version
    };

    console.clear();
    console.table(aboutApp);

    setTimeout(refreshCallback, timeout);
  },
  lineup(refreshCallback) {
    /** @type {DeveloperList[]} */
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
    /** @type {Youtube[]} */
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
    /** @type {Twitch[]} */
    const twitchUsers = [
      {
        user: "DannyQuiin",
      },
    ];

    console.clear();
    printTable(twitchUsers);
    setTimeout(refreshCallback, timeout);
  },
  projectsRecomendation(refreshCallback) {
    /** @type {Project[]} */
    const projects = [
      {
        name: "black metal promotion",
        desc: "promos albums and community"
      },
      {
        name: "black metal catalog",
        desc: "promos albums and community"
      },
    ];

    console.clear();
    printTable(projects);
    setTimeout(refreshCallback, timeout);
  }
};

const menuAboutOpts = [...Object.keys(aboutTool), returnMainOpts];

export { aboutTool, menuAboutOpts };
