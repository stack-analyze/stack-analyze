// stock module
import { performance } from "node:perf_hooks";

// inquirer
import inquirer from "inquirer";

// functions
import singleStack from "../functions/singleStack.js";
import multipleStack from "../functions/multipleStack.js";
import pageSpeed from "../functions/pageSpeed.js";
import scrape from "../functions/scraping.js";

// validations
import { 
  multipleWebQuery, 
  singleWebQuery, 
  webScrapingQuery 
} from "../validations/webValidations.js";

const webTools = {
  single(refreshCallback) {
    console.clear();
    inquirer.prompt([singleWebQuery])
      .then(({ url }) => {
        singleStack(url);
        const timeEnd = performance.now();
        setTimeout(refreshCallback, timeEnd);
      });
  },
  multiple(refreshCallback) {
    console.clear();
    inquirer.prompt([multipleWebQuery])
      .then(({webList}) => {
        multipleStack(webList.split(" "));
        const timeEnd = performance.now();
        setTimeout(refreshCallback, timeEnd);
      });
  },
  pagespeed(refreshCallback) {
    console.clear();
    inquirer.prompt([singleWebQuery])
      .then(({ url }) => {
        pageSpeed(url);
        const timeEnd = performance.now();
        setTimeout(refreshCallback, timeEnd);
      });
  },
  scraping(refreshCallback) {
    console.clear();
    inquirer.prompt([singleWebQuery, webScrapingQuery])
      .then(({ url, option }) => {
        scrape(url, option);
        setTimeout(refreshCallback, 3000);
      });
  }
};

export default webTools;
