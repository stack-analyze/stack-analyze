#!/usr/bin/env node

// modules
const { performance } = require("perf_hooks");
const inquirer = require("inquirer");
const { textSync } = require("figlet");
const {
  yellow,
  green,
  red
} = require("colors");
const { printTable, Table } = require("console-table-printer");

// options
const {
  aboutApp,
  developers,
  nonolive,
  projects,
  twitch,
  youtubeDev
} = require("./about");

// analyze web
const singleStack = require("./functions/singleStack");
const multipleStack = require("./functions/multipleStack");

// pagespeed web
// const { desktop, mobile } = require("./functions/pageSpeed");
const pageSpeed = require("./functions/pageSpeed");

// github info
const githubInfo = require("./functions/gitUser");

// anime search
const animeSearch = require("./functions/animeInfo");

// hardware modules
const {
  cpuInfo,
  ramMemInfo,
  osDetail,
  diskInfo,
  controllerInfo,
  displayInfo,
  biosInfo
} = require("./functions/hardware");

// crypto market module
const cryptoMarket = require("./functions/cryptoList");

/**
 * @description about selected anw
 * @param { string } result - about option selected
 * @return { void }
 */
function aboutSelected(result) {

  // tables
  const youtubeDevTable = new Table({
    columns: [
      {
        name: "youtubeChannel",
        alignment: "left",
        color: "green"
      },
      {
        name: "recomendation",
        alignment: "left",
        color: "cyan"
      }
    ]
  });
  const nonoliveTable = new Table({
    columns: [
      {
        name: "nonoID",
        alignment: "left",
        color: "red"
      },
      {
        name: "name",
        alignment: "left",
        color: "yellow"
      }
    ]
  });

  switch (result) {
    case "main info":
      console.clear();
      console.table(aboutApp);
      setTimeout(aboutOpts, 1000);
      break;
    case "devolepers lineup":
      console.clear();
      printTable(developers.map((dev, i) => ({ index: i + 1, dev })));
      setTimeout(aboutOpts, 1000);
      break;
    case "youtube streamers recomendation":
      console.clear();
      youtubeDevTable.addRows(youtubeDev);
      youtubeDevTable.printTable();
      setTimeout(aboutOpts, 1000);
      break;
    case "nonolive recomendation":
      console.clear();
      nonoliveTable.addRows(nonolive);
      nonoliveTable.printTable();
      setTimeout(aboutOpts, 1000);
      break;
    case "twitch recomendation":
      console.clear();
      printTable(twitch.map((streamer, i) => ({ index: i + 1, streamer })));
      setTimeout(aboutOpts, 1000);
      break;
    case "projects recomendation":
      console.clear();
      printTable(projects.map((project, i) => ({ index: i + 1, project })));
      setTimeout(aboutOpts, 1000);
      break;

    default:
      console.clear();
      question();
      break;
  }
}

/** 
 * @description about menu
 * @return { void }
 */
function aboutOpts() {
  inquirer.prompt({
    type: "list",
    name: "about",
    message: "select about option info",
    choices: [
      "main info",
      "devolepers lineup",
      "youtube streamers recomendation",
      "nonolive recomendation",
      "twitch recomendation",
      "projects recomendation",
      "return to main menu"
    ]
  }).then(({ about }) => aboutSelected(about))
    .catch((err) => console.error(red(err.message)));
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
        message: "do you want go to the main menu?",
      }
    ]);

    if (anw.return) {
      console.clear();
      question();
    } else {
      console.info(green("thanks for use stack-analyze"));

    }
  } catch (err) {
    console.error(red(err.message));
  }
}

/** 
 * @description select a hardware option
 * @param { string } result - selected a option hardware
 * @return { void }
*/
function hardwareSelected(result) {
  switch (result) {
    case "cpu":
      console.clear();
      cpuInfo();
      setTimeout(hardwareOpts, 1000);
      break;
    case "ram memory":
      console.clear();
      ramMemInfo();
      setTimeout(hardwareOpts, 1000);
      break;
    case "os":
      console.clear();
      osDetail();
      setTimeout(hardwareOpts, 1000);
      break;
    case "disk":
      console.clear();
      diskInfo();
      setTimeout(hardwareOpts, 1000);
      break;
    case "controller":
      console.clear();
      controllerInfo();
      setTimeout(hardwareOpts, 1000);
      break;
    case "display":
      console.clear();
      displayInfo();
      setTimeout(hardwareOpts, 1000);
      break;
    case "bios":
      console.clear();
      biosInfo();
      setTimeout(hardwareOpts, 1000);
      break;

    default:
      console.clear();
      question();
      break;
  }
}

/**
 * @description call hardware information options
 * @return { void }
 */
function hardwareOpts() {
  inquirer.prompt({
    type: "list",
    name: "hardware",
    message: "select a hardware-information option:",
    choices: [
      "cpu",
      "ram memory",
      "os",
      "disk",
      "controller",
      "display",
      "bios",
      "exit to main menu"
    ]
  }).then(({ hardware }) => hardwareSelected(hardware));
}

/**
 * 
 * @description function register option anwser
 * @param { string } result - result option anwser
 * @return { void }
 * 
 */
function anwOption(result) {
  // options conditional
  switch (result) {
    case "single":
      console.clear();
      inquirer.prompt({
        name: "url",
        message: "enter url for analyze the tech stack:"
      })
        .then(({ url }) => {
          if (url.indexOf("http") === 0) {
            singleStack(url);
            const timeEnd = performance.now();
            setTimeout(returnQuestion, timeEnd);
          } else {
            console.error(red("please insert a URL with parameter http:// or https://"));
            question();
          }
        });
      break;
    case "multiple":
      console.clear();
      inquirer.prompt({
        name: "urls",
        message: "enter URLs for analyze the tech stacks with whitespace without quotes example 'http://example.com https://nodejs.org': \n"
      })
        .then(({ urls }) => {
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
            console.error(red("please in each URL insert a website the parameter https:// or http://"));
            question();
          }
        });
      break;
    case "pagespeed":
      console.clear();
      inquirer.prompt({
        name: "speedWeb",
        message: "insert URL for page speed analyze:"
      })
        .then(({ speedWeb }) => {
          if (speedWeb.indexOf("http") === 0) {
            console.clear();
            console.info(green(textSync(speedWeb)));

            // start pagespeed results mobile
            textSync(speedWeb, "Small");
            pageSpeed(speedWeb);
            const timeEnd = performance.now();

            // start pagespeed results mobile
            /* desktop(speedWeb);
            const timeEndB = performance.now(); */

            // stop time
            setTimeout(returnQuestion, timeEnd);
          } else {
            console.error(red("please insert a URL with parameter https;// or http://"));
            question();
          }
        });
      break;
    case "github-info":
      inquirer.prompt({
        name: "user",
        message: "enter a github user"
      })
        .then(({ user }) => {
          if (user !== "") {
            console.clear();
            githubInfo(user);
            setTimeout(returnQuestion, 2000);
          } else {
            console.error(red("please the github username is required"));
            question();
          }
        });
      break;
    case "anime-search":
      inquirer.prompt({
        name: "anime",
        message: "enter a anime, music or ova search"
      })
        .then(({ anime }) => {
          if (anime !== "") {
            console.clear();
            animeSearch(anime);
            setTimeout(returnQuestion, 5000);
          } else {
            console.error(red("please the anime is required"));
            question();
          }
        });
      break;
    case "hardware-information":
      console.clear();
      hardwareOpts();
      break;
    case "about":
      // about info cli
      console.clear();
      aboutOpts();
      break;
    case "crypto market":
      console.clear();
      cryptoMarket();
      setTimeout(returnQuestion, 3000);
      break;
    default:
      console.clear();
      console.info(green("thanks for use stack-analyze"));
      break;
  }
}

/**
 * 
 * @description call the function question raw list options
 * @return { void }
 * 
 */
function question() {
  console.info(yellow(textSync("stack-analyze")));
  inquirer.prompt({
    type: "rawlist",
    name: "analyze",
    message: "what option do you want to analyze stack",
    choices: [
      "single",
      "multiple",
      "pagespeed",
      "github-info",
      "anime-search",
      "hardware-information",
      "crypto market",
      "about",
      "exit"
    ]
  })
    .then(({ analyze }) => anwOption(analyze))
    .catch((err) => console.error(red(err.message)));
}

// call the message title and question list
console.clear();
question();

