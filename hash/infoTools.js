// inquirer
import inquirer from "inquirer";

// functions
import bitlyInfo from "../functions/bitly.js";
import cryptoMarket from "../functions/cryptoList.js";
import githubInfo from "../functions/gitUser.js";
import bundlephobia from "../functions/bundlephobia.js";

// fields
import {
  bitlyQuery,
  promptParams,
  promptKey
} from "../validations/infoValidations.js";

const infoTools = {
  github_info(refreshCallback) {
    console.clear();
    inquirer.prompt([
      promptParams("gitUser", "enter a github user for search")
    ])
      .then(({ gitUser }) => {
        githubInfo(gitUser);
        setTimeout(refreshCallback, 2e3);
      });
  },
  bitly_info(refreshCallback) {
    console.clear();
    inquirer.prompt([
      bitlyQuery, 
      promptKey("token", "enter a bitly token")
    ])
      .then(({ bitlyLink, token }) => {
        bitlyInfo(bitlyLink, token);
        setTimeout(refreshCallback, 2e3);
      });
  },
  crypto_market(refreshCallback) {
    console.clear();
    cryptoMarket();
    setTimeout(refreshCallback, 5e3);
  },
  bundlephobia_info(refreshCallback) {
    console.clear();
    inquirer.prompt([
      promptParams("pkgName", "enter a npm package name for search info size")
    ])
      .then(({ pkgName }) => {
        console.info(pkgName);
        bundlephobia(pkgName);
        setTimeout(refreshCallback, 5e3);
      });
  },
};

export default infoTools;
