import { input} from "@inquirer/prompts";

import { scrapingOpts } from "../utils.js";

import { stackMenu } from "../menu.js";

// regex
const webRegex = /https?:\/\//g;

// inputs
const url = await input({
  message: "enter a url:",
  validate: input => webRegex.test(input) || "enter a url valid".yellow
});

const webList = await input({
  message: "enter URLs for analyze the tech stacks with whitespace without quotes example 'http://example.com https://nodejs.org': \n",
  validate(input) {
    const pass = input.match(webRegex);

    return pass && pass.length === 2 || "must be 2 sites";
  }
});

const webScrapingQuery = await stackMenu({
  pageSize: 9,
  message: "select a web scraping option:",
  choices: scrapingOpts
});

export { url, webList, webScrapingQuery };
