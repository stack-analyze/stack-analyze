#!/usr/bin/env node

// modules
const { performance } = require("perf_hooks");
const inquirer = require("inquirer");
const { textSync } = require("figlet");

// options
const aboutApp = require("./about");

// analyze web
const singleStack = require("./functions/singleStack");
const multipleStack = require("./functions/multipleStack");

// pagespeed web
const { desktop, mobile } = require("./functions/pageSpeed");

// github info
const githubInfo = require("./functions/gitUser");

// anime search
const animeSearch = require("./functions/animeInfo");

/**
 * 
 * @description call the function question raw list options
 * @return { void }
 * 
 */
function question() {
  inquirer.prompt({
    type: "rawlist",
    name: "analyze",
    message: "what option do you want to analyze stack",
    choices: [
      "single",
      "multiple",
      "pagespeed",
      "about",
      "github-info",
      "anime search",
      "exit"
    ]
  })
    .then((anw) => anwOption(anw.analyze));
}

/**
 * 
 * @description call the async function return list to question list
 * @return { Promise<void> } - return in boolean a result question list
 * 
 */
async function returnQuestion() {
  const anw = await inquirer.prompt([
    {
      type: "confirm",
      name: "return",
      message: "do you want go to the main menu?",
    }
  ]);

  anw.return
    ? question()
    : console.log("\x1b[44mthanks for use stack-analyze\x1b[0m");
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
        .then((anw) => {
          if (anw.url.indexOf("http" || "https") > -1) {
            singleStack(anw.url);
            const timeEnd = performance.now();
            setTimeout(returnQuestion, timeEnd);
          } else {
            console.error("\x1b[31mplease insert a URL with parameter http:// or https://");
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
        .then((anw) => {
          if (
            anw.urls.match(/(http|https)/g) !== null ||
            anw.urls.match(/(http|https)/g) === 2
          ) {
            const websites = anw.urls.split(" ");
            console.clear();
            multipleStack(websites);
            const timeEnd = performance.now();
            setTimeout(returnQuestion, timeEnd);
          } else {
            console.error("\x1b[31mplease in each URL insert a website the parameter https:// or http://");
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
        .then((anw) => {
          if (anw.speedWeb.indexOf("http" || "https") > -1) {
            console.clear();
            textSync(anw.speedWeb, "Small");
            mobile(anw.speedWeb);
            const timeEndA = performance.now();
            desktop(anw.speedWeb);
            const timeEndB = performance.now();
            setTimeout(returnQuestion, (timeEndA + timeEndB));
          } else {
            console.error("\x1b[31mplease insert a URL with parameter https;// or http://");
            question();
          }
        });
      break;
    case "github-info":
      inquirer.prompt({
        name: "user",
        message: "enter a github user"
      })
        .then((anw) => {
          if (anw.user !== "") {
            console.clear();
            githubInfo(anw.user);
            setTimeout(returnQuestion, 2000);
          } else {
            console.error("\x1b[31mplease is required the");
            question();
          }
        });
      break;
    case "anime search":
      inquirer.prompt({
        name: "anime",
        message: "enter a anime, music or ova search"
      })
        .then((anw) => {
          if (anw.anime !== "") {
            console.clear();
            animeSearch(anw.anime);
            setTimeout(returnQuestion, 5000);
          } else {
            console.error("\x1b[31mplease is required the");
            question();
          }
        });
      break;
    case "about":
      // about info cli
      console.clear();
      console.table(aboutApp);
      question();
      break;
    default:
      console.log("\x1b[44mthanks for use stack-analyze\x1b[0m");
      break;
  }
}

// call the message title and question list
console.clear();
console.info("\x1b[33m", textSync("stack-analyze"));
question();

