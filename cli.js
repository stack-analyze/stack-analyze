#!/usr/bin/env node
import Gauge from "gauge";
import colors from "colors";
import inquirer from "inquirer";
import figlet from "figlet";

import webTools from "./hash/webTools.js";
import queryTools from "./hash/queryTools.js";
import hardwareTools from "./functions/hardware.js";
import aboutTool from "./about.js";

import {
  menuOpts,
  menuQueryOpts,
  menuWebOpts,
  menuAboutOpts,
  menuHardwareOpts
} from "./utils.js";

const [ gauge, totalTime, pageSize ] = [ new Gauge(), 1e4, 9 ];

/** @returns {void} */
const exitCli = () => {
  console.clear();
  console.info("thanks for use stack-analyze".green);
};

/**
 * @async
 * @returns {Promise<void>}
 */
async function webOpts() {
  const { web } = await inquirer.prompt({
    type: "list",
    pageSize,
    name: "web",
    message: "enter a web tool option",
    choices: menuWebOpts
  });

  web !== "return main menu"
    ? webTools[web](returnMain)
    : mainMenu();
}

/**
 * @async
 * @returns {Promise<void>}
 */
async function infoOpts() {
  const { info } = await inquirer.prompt({
    type: "list",
    pageSize,
    name: "info",
    message: "enter a info tool option",
    choices: menuQueryOpts
  });

  info === "return main menu"
    ? mainMenu()
    : queryTools[info](returnMain);
}

/**
 * @async
 * @returns {Promise<void>}
 */
async function hardwareOpts() {
  const { hardware } = await inquirer.prompt({
    type: "list",
    name: "hardware",
    pageSize,
    message: "select a hardware-information option:",
    choices: menuHardwareOpts
  });

  hardware !== "return main menu"
    ? hardwareTools[hardware](hardwareOpts)
    : mainMenu();
}

/**
 * @async
 * @returns {Promise<void>}
 */
async function aboutOpts() {
  const { about } = await inquirer.prompt({
    type: "list",
    pageSize,
    name: "about",
    message: "select about option info",
    choices: menuAboutOpts
  });

  about !== "return main menu"
    ? aboutTool[about](aboutOpts)
    : mainMenu();
}

/**
 * @async
 * @returns {Promise<void>}
 */
async function mainMenu() {
  console.clear();
  console.info(colors.yellow(figlet.textSync("stack-analyze")));

  const { option } = await inquirer.prompt({
    type: "list",
    name: "option",
    message: "what option do you want to analyze stack",
    choices: menuOpts
  });

  const menuList = {
    web() {
      console.clear();
      webOpts();
    },
    query() {
      console.clear();
      infoOpts();
    },
    hardware() {
      console.clear();
      hardwareOpts();
    },
    about() {
      console.clear();
      aboutOpts();
    }
  };

  option !== "exit" ?menuList[option]() : exitCli();
}

/**
 * @async
 * @returns {Promise<void>}
 */
async function returnMain() {
  try {
    const { returnMain } = await inquirer.prompt({
      type: "confirm",
      name: "returnMain",
      message: "do you want go to the main menu?",
    });

    returnMain ? mainMenu(): exitCli();
  } catch (err) {
    console.error(colors.bgRed(err.message));
  }
}

for (let i = 50; i < totalTime; i += 50) {
  const percentage = i / totalTime;

  setTimeout(() => {
    gauge.pulse();
    gauge.show(`Loading app... ${percentage * 100}%`.random, percentage);
  }, i);
}

setTimeout(() => {
  gauge.hide();
  mainMenu();
}, totalTime);
