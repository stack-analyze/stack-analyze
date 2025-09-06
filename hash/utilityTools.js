// menu
import { stackMenu } from "../menu.js";
import { pokerGameOpts, returnMainOpts } from "../utils.js";

// functions
import genPassword from "../functions/password.js";
import hardware from "../functions/hardware.js";
import pokerGame from "../functions/poker.js";

/**
 * select types
 * @typedef {({
 *   [x: string]: (
 *     refreshCallback: () => Promise<void>, 
 *     alternativeCallback?: () => Promise<void>
 *   ) => Promise<void> | void
 * })} Select
 * /

/** @type {Select}*/
const utilityTools = {
  password(refreshCallback) {
    console.clear();
    genPassword();
    setTimeout(refreshCallback, 3e3);
  },
  async hardware(refreshCallback) {
    console.clear();
    hardware();
    setTimeout(refreshCallback, 12e3);
  },
  async poker_game(refreshCallback) {
    const pokeOpt = await stackMenu({
      message: "select a poker game for view instructions:",
      choices: pokerGameOpts
    });

    pokerGame(pokeOpt);
    setTimeout(refreshCallback, 5e3);
  }
};

const menuUtilityOpts = [...Object.keys(utilityTools), returnMainOpts];

export { utilityTools, menuUtilityOpts };
