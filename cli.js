#!/usr/bin/env node

// modules
const { performance } = require("perf_hooks");
const inquirer = require("inquirer");
const { textSync } = require("figlet");
const { yellow, red } = require("colors");

// hash tables
const mainTools = require("./hash/mainTools");
const hardwareTools = require("./hash/hardwareTools");
const aboutTool = require("./hash/aboutOpts");
const infoTools = require("./hash/infoTools");

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
      "main_info",
      "lineup",
      "youtube_recomendation",
      "twitch_recomendation",
      "projects_recomendation",
      "tools_ideas",
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
async function returnWebQuestion() {
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
      mainOptions();
    } else {
      question();
    }
  } catch (err) {
    console.error(red(err.message));
  }
}

/**
 * 
 * @description call the async function return list to question list
 * @return { Promise<void> } - return in boolean a result question list
 * 
 */
async function returnInfoQuestion() {
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
      infoOpts();
    } else {
      question();
    }
  } catch (err) {
    console.error(red(err.message));
  }
}

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
      "cpu",
      "ram_memory",
      "os",
      "disk",
      "controller",
      "display",
      "bios",
      "exit to main menu"
    ]
  });

  if(hardware !== "exit to main menu") {
    hardwareTools[hardware]();
    setTimeout(hardwareOpts, 1000);
  } else {
    question();
  }
}

/**
 * 
 * @description call the function question web tools options
 * @returns { Promise<void> } return main tools options
 * 
 */
async function mainOptions() {
  const { main } = await inquirer.prompt({
    type: "list",
    pageSize: 9,
    name: "main",
    message: "",
    choices: [
      "single",
      "multiple",
      "pagespeed",
      "return main menu"
    ]
  });

  if (main !== "return main menu") {
    mainTools[main]();
    const timeEnd = performance.now();
    setTimeout(returnWebQuestion, timeEnd);
  } else {
    question();
  }
}

/**
 * 
 * @description call the function question info tools options
 * @returns { Promise<void> } return main tools options
 * 
 */
async function infoOpts() {
  const { info } = await inquirer.prompt({
    type: "list",
    pageSize: 9,
    name: "info",
    message: "enter a info tools option",
    choices: [
      "github_info",
      "anime_search",
      "crypto_market",
      "bitly_info",
      "movie_info",
      "return main menu"
    ]
  });

  if (info !== "return main menu") {
    infoTools[info]();
    const timeEnd = performance.now();
    setTimeout(returnInfoQuestion, timeEnd);
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
  console.info(yellow(textSync("stack-analyze")));
  const { analyze } = await inquirer.prompt({
    type: "list",
    name: "analyze",
    message: "what option do you want to analyze stack",
    choices: ["web tools", "info tools", "hardware tools", "about", "exit"]
  });

  switch (analyze) {
    case "web tools":
      mainOptions();
      break;
    case "info tools":
      infoOpts();
      break;
    case "hardware tools":
      hardwareOpts();
      break;
    case "about":
      aboutOpts();
      break;
    default:
      console.clear();
      console.info("thanks for use stack-analyze".green);
      break;
  }
}

// call the message title and question list
question();

