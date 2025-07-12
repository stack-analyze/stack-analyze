// print table
import { printTable } from "console-table-printer";

// package.json
const { default: { license, version}} = await import("./package.json", {with: {type: "json" }});

/** @type {number} */
const timeout = 1e3;

/** @type {import("./types.js").Select}*/
const aboutTool = {
  mainInfo(refreshCallback) {
    /** @type {import("./types.js").Info} */
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
    
    /** @type {import("./types.js").DeveloperList[]} */
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
    /** @type {import("./types.js").Youtube[]} */
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
    /** @type {import("./types.js").Twitch[]} */
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
    /** @type {import("./types.js").Project[]} */
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
