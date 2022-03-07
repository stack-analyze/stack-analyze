// print table
import { printTable } from "console-table-printer";

// tables models 
import {
  youtubeDevTable,
  ideasTable
} from "../models/aboutTables.js";

// about sections
import {
  aboutApp,
  developers,
  twitch,
  projects,
  ideas,
  youtubeDev
} from "../about.js";

/** @type {{ main_info(): void, lineup(): void, youtube_recomendation(): void, twitch_recomendation(): void, projects_recomendation(): void, tools_ideas(): void }} */
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
export default aboutTool;
