import { scrapingOpts } from "../utils.js";

const webRegex = /https?:\/\//g;

const singleWebQuery = {
  name: "url",
  message: "enter a url:",
  validate: input => webRegex.test(input) || "enter a url valid".yellow
};

const multipleWebQuery = {
  name: "webList",
  message: "enter URLs for analyze the tech stacks with whitespace without quotes example 'http://example.com https://nodejs.org': \n",
  validate(input) {
    const pass = input.match(webRegex);

    return pass && pass.length === 2 || "must be 2 sites";
  }
};

const webScrapingQuery = {
  type: "list",
  pageSize: 9,
  name: "option",
  message: "select a web scraping option:",
  choices: scrapingOpts
};

export {
  singleWebQuery,
  multipleWebQuery,
  webScrapingQuery
};
