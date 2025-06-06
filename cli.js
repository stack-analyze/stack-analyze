#!/usr/bin/env node
import Gauge from "gauge";
import colors from "colors";
import { confirm } from "@inquirer/prompts";
import figlet from "figlet";

import { stackMenu } from "./menu.js";

import webTools from "./hash/webTools.js";
import queryTools from "./hash/queryTools.js";
import infoTools from "./hash/infoTools.js";
import utilityTools from "./hash/utilityTools.js";
import wallpaperSelect from "./hash/wallpaperSelect.js";
import aboutTool from "./about.js";

import {
  menuOpts,
  menuQueryOpts,
  menuWebOpts,
  menuAboutOpts,
  menuInfoOpts,
  menuWallpaperOpts,
  menuUtilityOpts
} from "./utils.js";

const [gauge, totalTime, pageSize] = [new Gauge(), 1e4, 9];

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
  console.info(colors.yellow(figlet.textSync("web options")));
  
  const web = await stackMenu({
    pageSize,
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
  console.info(colors.yellow(figlet.textSync("info options")));
  
  const info = await stackMenu({
    pageSize,
    message: "enter a info tool option",
    choices: menuInfoOpts
  });

  info === "return main menu"
    ? mainMenu()
    : infoTools[info](returnMain);
}

/**
 * @async
 * @returns {Promise<void>}
 */
async function queryOpts() {
  console.info(colors.yellow(figlet.textSync("query options")));
  
  const query = await stackMenu({
    pageSize,
    message: "enter a query tool option",
    choices: menuQueryOpts
  });

  query === "return main menu"
    ? mainMenu()
    : queryTools[query](returnMain);
}

/**
 * @async
 * @returns {Promise<void>}
 */
async function wallpapersOpts() {
  console.info(colors.yellow(figlet.textSync("wallpapers")));
  
  const wallpaper = await stackMenu({
    pageSize,
    message: "enter a wallpaper selector",
    choices: menuWallpaperOpts
  });
	
  wallpaper === "return main menu"
    ? mainMenu()
    : wallpaperSelect[wallpaper](returnMain, wallpapersOpts);
}

/**
 * @async
 * @returns {Promise<void>}
 */
async function utilityOpts() {
  console.info(colors.yellow(figlet.textSync("utility options")));
  
  const utility = await stackMenu({
    pageSize,
    message: "enter a utility tool option",
    choices: menuUtilityOpts
  });

  utility === "return main menu"
    ? mainMenu()
    : utilityTools[utility](returnMain);
}

/**
 * @async
 * @returns {Promise<void>}
 */
async function aboutOpts() {
  console.info(colors.yellow(figlet.textSync("About Menu")));
  
  const about = await stackMenu({
    pageSize,
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

  const option = await stackMenu({
  	message: "what option do you want to analyze stack",
  	choices: menuOpts
  });

  const menuList = {
    web() {
      console.clear();
      webOpts();
    },
    info() {
      console.clear();
      infoOpts();
    },
    query() {
      console.clear();
      queryOpts();
    },
    utility() {
      console.clear();
      utilityOpts();
    },
    wallpapers() {
      console.clear();
      wallpapersOpts();
    },
    about() {
      console.clear();
      aboutOpts();
    }
  };

  option !== "exit" ? menuList[option]() : exitCli();
}

/**
 * @async
 * @returns {Promise<void>}
 */
async function returnMain() {
  try {
    const returnMain = await confirm({
      message: "do you want go to the main menu?",
    });

    returnMain ? mainMenu() : exitCli();
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
