// stock module
import { performance } from "node:perf_hooks";

// inquirer
import { input } from "@inquirer/prompts";

// functions
import singleStack from "../functions/singleStack.js";
import multipleStack from "../functions/multipleStack.js";
import pageSpeed from "../functions/pageSpeed.js";
import scrape from "../functions/scraping.js";
import cssValidate from "../functions/cssValidator.js";

import { stackMenu } from "../menu.js";
import { scrapingOpts } from "../utils.js";

// regex
const webRegex = /https?:\/\//g;

const webTools = {
  async single(refreshCallback) {
    console.clear();
    
    const url = await input({
    	message: "enter a url:",
    	validate: input => webRegex.test(input) || "enter a url valid".yellow
    });  
      
    singleStack(url);
    const timeEnd = performance.now();
    setTimeout(refreshCallback, timeEnd);
  },
  async multiple(refreshCallback) {
    console.clear();
    
    const webList = await input({
    	message: "enter URLs for analyze the tech stacks with whitespace without quotes example 'http://example.com https://nodejs.org': \n",
    	validate(input) {
    		const pass = input.match(webRegex);

    		return pass && pass.length === 2 || "must be 2 sites";
    	}
    });
    
    multipleStack(webList.split(" "));
    const timeEnd = performance.now();
    setTimeout(refreshCallback, timeEnd);
  },
  async pagespeed(refreshCallback) {
    console.clear();
    
    const url = await input({
    	message: "enter a url:",
    	validate: input => webRegex.test(input) || "enter a url valid".yellow
    });
    
    pageSpeed(url);
    const timeEnd = performance.now();
    setTimeout(refreshCallback, timeEnd);
  },
  async scraping(refreshCallback) {
    console.clear();
    
    const { url, option } = {
      option: await stackMenu({
        pageSize: 9,
        message: "select a web scraping option:",
        choices: scrapingOpts
      }),
      url: await input({
        message: "enter a url:",
        validate: input => webRegex.test(input) || "enter a url valid".yellow
      })
    };
      
    scrape(url, option);
    setTimeout(refreshCallback, 3000);
  },
  async css_validate(refreshCallback) {
    console.clear();
    const url = await input({
    	message: "enter a url:",
    	validate: input => webRegex.test(input) || "enter a url valid".yellow
    });
      
    cssValidate(url);
    const timeEnd = performance.now();
    setTimeout(refreshCallback, timeEnd);
  }
};

export default webTools;
