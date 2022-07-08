// print table
import { printTable } from "console-table-printer";

import { listFormat } from "./utils.js";

// package.json
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { license, version } = require("./package.json");

/**
 * types for about tools
 * 
 * @typedef {Object.<string, function(): void>} aboutTable
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

/** @type {aboutTable} */
const aboutTool = {
  mainInfo() {
    /** @type {info} */
    const aboutApp = {
      mainDeveloper: "omega5300",
      license,
      version
    };

    console.clear();
    console.table(aboutApp);
  },
  lineup() {
    /** @type {developerList[]} */
    const developers = [
      {
        name: "omega5300",
        roles: listFormat.format(["main developer", "lead project", "founder"])
      }
    ];

    console.clear();
    printTable(developers);
  },
  youtubeRecomendation() {
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
  },
  twitchRecomendation() { 
    /** @type {twitch[]} */
    const twitchUsers = [
      {
        user: "dannyaegyo",
      },
      {
        user: "Lunanny",
        details: "audiovisual student even though if has ADHD has a great variety regardless of whether or not he has ADHD."
      }
    ];

    console.clear();
    printTable(twitchUsers);
  },
  projectsRecomendation() {
    /** @type {project[]} */
    const projects = [
      {
        name: "Doofy's Projects",
        desc: "tools and systems customs"
      },
      {
        name: "black metal promotion",
        desc: "upload new albums and sometimes tracks from upcoming albums with the permission of bands and/or labels"
      }
    ];

    console.clear();
    printTable(projects);
  }
};

export default aboutTool;
