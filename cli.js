#!/usr/bin/env node
import ora from "ora";
import colors from "colors";
import { confirm } from "@inquirer/prompts";
import figlet from "figlet";

import { stackMenu } from "./menu.js";

import {menuWebOpts, webTools} from "./hash/webTools.js";
import {menuQueryOpts, queryTools} from "./hash/queryTools.js";
import {infoTools, menuInfoOpts} from "./hash/infoTools.js";
import {menuUtilityOpts, utilityTools} from "./hash/utilityTools.js";
import {menuWallpaperOpts, wallpaperSelect} from "./hash/wallpaperSelect.js";
import {aboutTool, menuAboutOpts} from "./about.js";

import { exitMsg } from "./utils.js";
import { quoteSelect, menuQuoteOpts } from "./hash/quotesSelect.js";

const [spinner, totalTime, pageSize] = [
  ora({spinner: "dots11", color: "white" }), 
  1e4, 9
];

/** @returns {void} */
const exitCli = () => {
  console.clear();
  console.info(exitMsg);
};

/** @returns {Promise<void>} */
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

/** @returns {Promise<void>} */
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

/** @returns {Promise<void>} */
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

/** @returns {Promise<void>} */
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

/** @returns {Promise<void>} */
async function quotesOpts() {
  console.info(colors.yellow(figlet.textSync("quotes")));

  const quotes = await stackMenu({
    pageSize,
    choices: menuQuoteOpts,
    message: "enter a quote option"
  });

  quotes === "return main menu"
    ? mainMenu()
    : quoteSelect[quotes](returnMain);
}

/** @returns {Promise<void>} */
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

/** @returns {Promise<void>} */
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

/** @returns {Promise<void>} */
async function mainMenu() {
  console.clear();
  console.info(colors.yellow(figlet.textSync("stack-analyze")));

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
    quotes() {
      console.clear();
      quotesOpts();
    },
    about() {
      console.clear();
      aboutOpts();
    }
  };

  const option = await stackMenu({
    message: "what option do you want to analyze stack",
    choices: [...Object.keys(menuList), "exit"],
    pageSize: 10
  });

  option !== "exit" ? menuList[option]() : exitCli();
}

/** @returns {Promise<void>} */
async function returnMain() {
  try {
    const returnMain = await confirm({
      message: "do you want go to the main menu?",
    }).catch();

    returnMain ? mainMenu() : exitCli();
  } catch (err) {
    console.error(colors.bgRed(err.message));
  }
}

for (let i = 50; i < totalTime; i += 50) {
  const percentage = i / totalTime * 100;

  setTimeout(() => {
    /* gauge.pulse();
    gauge.show(`Loading app... ${percentage * 100}%`.random, percentage); */
    spinner.text = `Loading app... ${Math.ceil(percentage)}%`.random;
    spinner.start();
  }, i);
}

setTimeout(() => {
  spinner.stop();
  mainMenu();
}, totalTime);
