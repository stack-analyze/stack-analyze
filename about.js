// print table
import { printTable } from "console-table-printer";

// package.json
const { default: { license, version}} = await import("./package.json", {with: {type: "json" }});

const timeout = 1e3;

/**
 * types for about tools
 * 
 * @typedef {Object} Info
 * @property {string} Info.mainDeveloper
 * @property {string} Info.version
 * @property {string} Info.license
 * 
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
 */

const aboutTool = {
  mainInfo(refreshCallback) {
    /** @type {Info} */
    const aboutApp = {
      mainDeveloper: "omega5300",
      license,
      version
    };

    console.clear();
    console.table(aboutApp);
    
    setTimeout(refreshCallback, timeout);
  },
  async lineup(refreshCallback) {
    const { listFormat } = await import("./utils.js");
    
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
        user: "DannyAgii",
      },
      {
        user: "Lunanny",
        details: "art director with ADHD."
      },
      {
        user: "Japon_HR",
        details: "cosplayer, gamer, dance & halo machinima creator"
      }
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
      {
      	name: "slithering black records",
      	desc: "record label & community"
      }
    ];

    console.clear();
    printTable(projects);
    setTimeout(refreshCallback, timeout);
  }
};

export default aboutTool;
