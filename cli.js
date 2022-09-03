#!/usr/bin/env node

// modules
import { performance } from "perf_hooks";
import inquirer from "inquirer";
import figlet from "figlet";
import colors from "colors";

// hash tables
import hardwareTools from "./functions/hardware.js";
import aboutTool from "./about.js";

import singleStack from "./functions/singleStack.js";
import multipleStack from "./functions/multipleStack.js";
import pageSpeed from "./functions/pageSpeed.js";
import githubInfo from "./functions/gitUser.js";
import animeSearch from "./functions/animeInfo.js";
import cryptoMarket from "./functions/cryptoList.js";
import bitlyInfo from "./functions/bitly.js";
import movieDB from "./functions/moviesInfo.js";
import twitchInfo from "./functions/twitch.js";
import scrape from "./functions/scraping.js";
import genPassword from "./functions/password.js";

/**
 * @description web scraping menu
 * @return { Promise<void>} web scraping options
 */
async function scrapingOpts (url) {
  console.info("web:", url);
  
  const { option } = await inquirer.prompt({
    type: "list",
    name: "option",
    message: "select a options for scraping",
    pageSize: 15,
    choices: [
      "pageTitle",
      "pageImages",
      "pageMetadata",
      "pageHeadings",
      "pageTableHead",
      "pageTableData",
      "pageLinks",
      "pageCites",
      "exit to main menu"
    ]
  });
    
  const {
    cites,
    headings,
    images,
    links,
    title,
    metadata,
    table_data,
    table_heading
  } = scrape(url);
  
  const timeScrape = 2000;

  /** @type {Object.<string, function(): void>} */
  const scrapeOpt = {
    pageTitle() {
      title();
      setTimeout(returnQuestion, timeScrape);
    },
    pageImages() {
      images();
      setTimeout(returnQuestion, timeScrape);
    },
    pageMetadata() {
      metadata();
      setTimeout(returnQuestion, timeScrape);
    },
    pageHeadings() {
      headings();
      setTimeout(returnQuestion, timeScrape);
    },
    pageTableHead() {
      table_heading();
      setTimeout(returnQuestion, timeScrape);
    },
    pageTableData() {
      table_data();
      setTimeout(returnQuestion, timeScrape);
    },
    pageLinks() {
      links();
      setTimeout(returnQuestion, timeScrape);
    },
    pageCites() {
      cites();
      setTimeout(returnQuestion, timeScrape);
    },
  };

  option === "exit to main menu" 
    ? question() 
    : scrapeOpt[option]();
}

/**
 * @description web scraping menu
 * @return { Promise<void>} web scraping options
 */
async function scrapingLink() {
  console.clear();
  const { link } = await inquirer.prompt({
    type: "input",
    name: "link",
    message: "enter a web scraping options?"
  });

  if(link.indexOf("http") === -1) {
    console.error("https:// or http:// is required".red);
    setTimeout(question, 5000);
  } else {
    scrapingOpts(link);
  }
}

/** 
 * @description about menu
 * @return { Promise<void> } about option sections answer
 */
async function aboutOpts() {
  const { about } = await inquirer.prompt({
    type: "list",
    pageSize: 9,
    name: "about",
    message: "select about option info",
    choices: [
      "mainInfo",
      "lineup",
      "youtubeRecomendation",
      "twitchRecomendation",
      "projectsRecomendation",
      "return to main menu"
    ]
  });

  if (about !== "return to main menu") {
    aboutTool[about]();
    setTimeout(aboutOpts, 1000);
  } else {
    question();
  }
}

/**
 * 
 * @description call the async function return list to question list
 * @return { Promise<void> } - return in boolean a result question list
 * 
 */
async function returnQuestion() {
  try {
    const anw = await inquirer.prompt([
      {
        type: "confirm",
        name: "return",
        message: "do you want go to the tools menu?",
      }
    ]);

    if (anw.return) {
      console.clear();
      question();
    } else {
      console.clear();
      console.info("thanks for use stack-analyze".green);
    }
  } catch (err) {
    console.error(colors.red(err.message));
  }
}

/**
 * @description This is a hash table with the options of the tools menu. 
 * @type {Object.<string, function(): void>}
 */
const toolsOpts = {
  single() {
    console.clear();
    inquirer.prompt({
      name: "url",
      message: "enter url for analyze the tech stack:"
    }).then(({ url }) => {
      if (url.indexOf("http") === 0) {
        singleStack(url);
        const timeEnd = performance.now();
        setTimeout(returnQuestion, timeEnd);
      } else {
        console.error("please insert a URL with parameter http:// or https://".red);
      }
    });
  },
  multiple() {
    console.clear();
    inquirer.prompt({
      name: "urls",
      message: "enter URLs for analyze the tech stacks with whitespace without quotes example 'http://example.com https://nodejs.org': \n"
    }).then(({ urls }) => {

      if (
        urls.match(/(http|https)/g) !== null ||
        urls.match(/(http|https)/g) >= 2
      ) {
        const websites = urls.split(" ");
        console.clear();
        multipleStack(websites);
        const timeEnd = performance.now();
        setTimeout(returnQuestion, timeEnd);
      } else {
        console.error("please in each URL insert a website the parameter https:// or http://".red);
      }
    });
  },
  pagespeed() {
    console.clear();
    inquirer.prompt({
      name: "speedWeb",
      message: "insert URL for page speed analyze:"
    }).then(({ speedWeb }) => {
      if (speedWeb.indexOf("http") === 0) {
        console.clear();

        // start pagespeed results mobile
        figlet.textSync(speedWeb, "Small");
        pageSpeed(speedWeb);
        const timeEnd = performance.now();
        setTimeout(returnQuestion, timeEnd);
      } else {
        console.error("please insert a URL with parameter https;// or http://".red);
      }
    });
  },
  github_info() {
    console.clear();
    inquirer.prompt({
      name: "user",
      message: "enter a github user"
    }).then(({ user }) => {
      if (user !== "") {
        console.clear();
        githubInfo(user);
        setTimeout(returnQuestion, 2000);
      } else {
        console.error("please the github username is required".red);
      }
    });
  },
  anime_search() {
    console.clear();
    inquirer.prompt({
      name: "anime",
      message: "enter a anime, movie or ova search"
    }).then(({ anime }) => {
      if (anime !== "") {
        console.clear();
        animeSearch(anime);
        setTimeout(returnQuestion, 2000);
      } else {
        console.error("please the anime is required".red);
      }
    });
  },
  crypto_market() {
    console.clear();
    cryptoMarket();
    setTimeout(returnQuestion, 5000);
  },
  password() {
    console.clear();
    genPassword();
    setTimeout(returnQuestion, 3000);
  },
  bitly_info() {
    console.clear();
    inquirer.prompt([
      {
        name: "link",
        message: "enter a bitly link without http|https",
      },
      {
        name: "token",
        message: "enter a bitly token",
        type: "password",
        mask: "?"
      }
    ])
      .then(({ link, token }) => {
        bitlyInfo(link, token);
        setTimeout(returnQuestion, 3000);
      });
  },
  movie_info() {
    console.clear();
    inquirer.prompt([
      {
        name: "api_key",
        message: "insert api key",
        type: "password",
        mask: "?"
      },
      {
        name: "query",
        message: "please search a movie search",
      }
    ]).then(({ api_key, query }) => {
      console.clear();
      movieDB(query, api_key);
      setTimeout(returnQuestion, 3000);
    });
  },
  twitch_info() {
    console.clear();
    inquirer.prompt([
      {
        name: "user",
        message: "get twitch user"
      },
      {
        name: "twitch_client",
        message: "enter a twitch token client",
        type: "password",
        mask: "*"
      },
      {
        name: "twitch_token",
        message: "enter a twitch token without the key Bearer",
        type: "password",
        mask: "?"
      }
    ]).then(({ user, twitch_client, twitch_token }) => {
      if (user !== "" && twitch_client !== "" && twitch_token !== "") {
        console.clear();
        twitchInfo(user, twitch_client, twitch_token);
        setTimeout(returnQuestion, 3000);
      } else {
        console.error("twitch info fields is required".red);
      }
    });
  }
};

/**
 * @description call hardware information options
 * @returns { Promise<void> } hardware options tool
 */
async function hardwareOpts() {
  const { hardware } = await inquirer.prompt({
    type: "list",
    name: "hardware",
    pageSize: 9,
    message: "select a hardware-information option:",
    choices: [
      "cpuInfo",
      "ramMemInfo",
      "osDetail",
      "diskInfo",
      "controllerInfo",
      "displayInfo",
      "biosInfo",
      "exit to main menu"
    ]
  });

  if (hardware !== "exit to main menu") {
    hardwareTools[hardware]();
    setTimeout(hardwareOpts, 1000);
  } else {
    question();
  }
}

/**
 * 
 * @description call the function question raw list options
 * @returns { Promise<void> } return exit question
 * 
 */
async function question() {
  console.clear();
  console.info(colors.yellow(figlet.textSync("stack-analyze")));
  const { analyze } = await inquirer.prompt({
    type: "list",
    pageSize: 15,
    name: "analyze",
    message: "what option do you want to analyze stack",
    choices: [
      "single",
      "multiple",
      "pagespeed",
      "github_info",
      "anime_search",
      "crypto_market",
      "bitly_info",
      "movie_info",
      "twitch_info",
      "hardware tools",
      "scraping",
      "password",
      "about",
      "exit"
    ]
  });

  switch (analyze) {
    case "hardware tools":
      hardwareOpts();
      break;
    case "about":
      aboutOpts();
      break;
    case "scraping":
      scrapingLink();
      break;
    case "exit":
      console.clear();
      console.info("thanks for use stack-analyze".green);
      break;
    default:
      toolsOpts[analyze]();
      break;
  }
}

// call the message title and question list
question();
