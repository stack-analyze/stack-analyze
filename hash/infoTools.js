// inquirer
import { input, password } from "@inquirer/prompts";

// functions
import bitlyInfo from "../functions/bitly.js";
import cryptoMarket from "../functions/cryptoList.js";
import githubInfo from "../functions/gitUser.js";
import bundlephobia from "../functions/bundlephobia.js";
import { returnMainOpts } from "../utils.js";

// bitly regexp
const bitlyRegexp = /bit\.ly\//g;

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
};

const menuInfoOpts = [...Object.keys(infoTools), returnMainOpts];

export { infoTools, menuInfoOpts };
