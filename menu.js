import { select } from "@inquirer/prompts";
import { forceExit } from "./utils.js";

/**
 * @typedef {Object} Menu
 * @property {string} message
 * @property {string[]} choices
 * @property {number} [pageSize]
 * 
 * @param {Menu} menu
 * @async
 * @returns {Promise<any>}
 */
export const stackMenu = async ({message, choices, pageSize}) => await select({
  message, choices, pageSize
}).catch(forceExit);
