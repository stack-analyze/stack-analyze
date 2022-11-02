// inquirer
import inquirer from "inquirer";

// functions
import genPassword from "../functions/password.js";
import bitlyInfo from "../functions/bitly.js";
import cryptoMarket from "../functions/cryptoList.js";
import githubInfo from "../functions/gitUser.js";
import animeSearch from "../functions/animeInfo.js";
import movieDB from "../functions/moviesInfo.js";
import twitchInfo from "../functions/twitch.js";

// fields
import {
  bitlyQuery,
  promptParams,
  promptKey
} from "../validations/infoValidations.js";

/** query tools */
const queryTools = {
  github_info(refreshCallback) {
    console.clear();
    inquirer.prompt([promptParams("gitUser", "enter a github user for search")])
      .then(({ gitUser }) => {
        githubInfo(gitUser);
        setTimeout(refreshCallback, 2e3);
      });
  },
  anime_Search(refreshCallback) {
    console.clear();
    inquirer.prompt([promptParams("query", "")])
      .then(({ query }) => {
        animeSearch(query);
        setTimeout(refreshCallback, 2e3);
      });
  },
  bitly_info(refreshCallback) {
    console.clear();
    inquirer.prompt([bitlyQuery, promptKey("token", "enter a bitly token")])
      .then(({ bitlyLink, token }) => {
        bitlyInfo(bitlyLink, token);
        setTimeout(refreshCallback, 2e3);
      });
  },
  movie_info(refreshCallback) {
    console.clear();
    inquirer.prompt([
      promptParams("query", "enter movie for search DB"),
      promptKey("token", "enter a token key")
    ])
      .then(({ query, token }) => {
        movieDB(query, token);
        setTimeout(refreshCallback, 2e3);
      });
  },
  twitch_info(refreshCallback) {
    console.clear();
    inquirer.prompt([
      promptParams("twitchUser", "enter a twitch user"),
      promptKey("twitchClient", "enter a twitch client ID"),
      promptKey("twitchToken", "enter a twitch token"),
    ])
      .then(({twitchUser, twitchClient, twitchToken}) => {
        twitchInfo(twitchUser, twitchClient, twitchToken);
        setTimeout(refreshCallback, 2e3);
      });
  },
  crypto_market(refreshCallback) {
    console.clear();
    cryptoMarket();
    setTimeout(refreshCallback, 5e3);
  },
  password(refreshCallback) {
    console.clear();
    genPassword();
    setTimeout(refreshCallback, 3e3);
  }
};

export default queryTools;
