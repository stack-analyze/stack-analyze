// inquirer
import { input, password, number, select } from "@inquirer/prompts";

// functions
import bitlyInfo from "../functions/bitly.js";
import cryptoMarket from "../functions/cryptoList.js";
import githubInfo from "../functions/gitUser.js";
import bundlephobia from "../functions/bundlephobia.js";
import { returnMainOpts, TCGP_EXPANSIONS } from "../utils.js";
import getTcgpCard from "../functions/tcgp.js";
import getStations from "../functions/getStations.js";

// bitly regexp
const bitlyRegexp = /bit\.ly\//g;

/**
* select types
 * @typedef {({
 *   [x: string]: (
 *     refreshCallback: () => Promise<void>,
 *   ) => Promise<void> | void
 * })} Select
 * /

/** @type {Select}*/
const infoTools = {
  async github_info(refreshCallback) {
    console.clear();

    const gitUser = await input({
      message: "enter a github user for search",
      required: true
    });

    githubInfo(gitUser);
    setTimeout(refreshCallback, 2e3);
  },
  async bitly_info(refreshCallback) {
    console.clear();

    const { bitlyLink, token } = {
      bitlyLink: await input({
        message: "enter a short link:",
        validate: input => bitlyRegexp.test(input) || "only bitly link".yellow
      }),
      token: await password({
        message: "enter a bitly token",
        mask: true
      })
    };

    bitlyInfo(bitlyLink, token);
    setTimeout(refreshCallback, 2e3);
  },
  crypto_market(refreshCallback) {
    console.clear();
    cryptoMarket();
    setTimeout(refreshCallback, 5e3);
  },
  async bundlephobia_info(refreshCallback) {
    console.clear();

    const pkgName = await input({
      message: "enter a npm package name for search info size"
    });

    console.info(pkgName);
    bundlephobia(pkgName);
    setTimeout(refreshCallback, 5e3);
  },
  async tcgpCard(refreshCallback) {
    console.clear();
    
    const setName = await select({
      message: "Select a expansion set TCGP:",
      choices: Object.keys(TCGP_EXPANSIONS),
      loop: true,
    });
    
    const cardID = await number({
      message: `Enter a card id between 1 to ${TCGP_EXPANSIONS[setName]}:`,
      min: 1, max: TCGP_EXPANSIONS[setName]
    });

    getTcgpCard(setName, cardID);

    setTimeout(refreshCallback, 5e3);
  },
  async getStations(refreshCallback) {
    console.warn("some stations not visble only info".yellow);
    
    const country = await input({
      message: "enter country"
    });

    getStations(country);
    setTimeout(refreshCallback, 5e3);
  }
};

const menuInfoOpts = [...Object.keys(infoTools), returnMainOpts];

export { infoTools, menuInfoOpts };
