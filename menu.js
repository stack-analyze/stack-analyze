import { select } from "@inquirer/prompts";

/**
 * @typedef {Object} Menu
 * @property {string} message
 * @property {string[]} choices
 * @property {number} [pageSize]
 * @param {Menu}
 * @returns {Promise<any>}
 */
export const stackMenu = async ({message, choices, pageSize}) => await select({
  message, choices, pageSize
});
