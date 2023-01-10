// inquirer
import inquirer from "inquirer";

// functions
import animeSearch from "../functions/animeInfo.js";
import movieDB from "../functions/moviesInfo.js";
import twitchInfo from "../functions/twitch.js";

// fields
import {
  promptParams,
  promptKey
} from "../validations/infoValidations.js";

/** query tools */
const queryTools = {

  anime_Search(refreshCallback) {
    console.clear();
    inquirer.prompt([promptParams("query", "")])
      .then(({ query }) => {
        animeSearch(query);
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
      promptParams("twitchSeparator", "enter a separator for split"),
      promptParams("twitchUsers", "enter a twitch user"),
      promptKey("twitchClient", "enter a twitch client ID"),
      promptKey("twitchToken", "enter a twitch token"),
    ])
      .then(({ twitchSeparator, twitchUsers, twitchClient, twitchToken }) => {
        twitchInfo({ twitchSeparator, twitchUsers, twitchClient, twitchToken });
        setTimeout(refreshCallback, 2e3);
      });
  }
};

export default queryTools;
