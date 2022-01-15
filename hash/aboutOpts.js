// print table
const { printTable } = require("console-table-printer");

// tables models 
const {
  youtubeDevTable,
  nonoliveTable,
  ideasTable
} = require("../models/aboutTables");

// about sections
const {
  aboutApp,
  developers,
  youtubeDev,
  nonolive,
  twitch,
  projects,
  ideas
} = require("../about");

/** @type {{ main_info(): void, lineup(): void, youtube_recomendation(): void, nonolive_recomendation(): void, twitch_recomendation(): void, projects_recomendation(): void, tools_ideas(): void }} */
const aboutTool = {
  main_info() {
    console.clear();
    console.table(aboutApp);
  },
  lineup() {
    console.clear();
    printTable(developers.map((dev, i) => ({ index: i + 1, dev })));
  },
  youtube_recomendation() {
    console.clear();
    youtubeDevTable.addRows(youtubeDev);
    youtubeDevTable.printTable();
  },
  twitch_recomendation() {
    console.clear();
    const streamers = twitch.map((streamer, i) => ({ index: i + 1, streamer }));
    printTable(streamers);
  },
  projects_recomendation() {
    console.clear();
    const proyectsReccomend = projects.map((project, i) => ({ index: i + 1, project }));
    printTable(proyectsReccomend);
  },
  tools_ideas() {
    console.clear();
    ideasTable.addRows(ideas);
    ideasTable.printTable();
  }
};

// export hash
module.exports = aboutTool;
