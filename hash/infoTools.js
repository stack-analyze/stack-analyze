// modules
import inquirer from "inquirer";

// github info
import githubInfo from "../functions/gitUser.js";

// anime search
import animeSearch from "../functions/animeInfo.js";

// crypto market
import cryptoMarket from "../functions/cryptoList.js";

// bitly
import bitlyInfo from "../functions/bitly.js";

// movies
import movieDB from "../functions/moviesInfo.js";

// twitch
import twitchInfo from "../functions/twitch.js";


/** 
 * @type {{ github_info(): Promise<void>, anime_search(): Promise<void>, crypto_market(): void, bitly_info(): Promise<void>, movie_info(): Promise<void>, twitch_info(): Promise<void>}} 
*/
const infoTools = {
  async github_info() {
    const { user } = await inquirer.prompt({
      name: "user",
      message: "enter a github user"
    });

    if (user !== "") {
      console.clear();
      githubInfo(user);
    } else {
      console.error("please the github username is required".red);
    }
  },
  async anime_search() {
    const { anime } = await inquirer.prompt({
      name: "anime",
      message: "enter a anime, movie or ova search"
    });

    if (anime !== "") {
      console.clear();
      animeSearch(anime);
    } else {
      console.error("please the anime is required".red);
    }
  },
  crypto_market() {
    console.clear();
    cryptoMarket();
  },
  async bitly_info() {
    console.clear();
    const { link } = await inquirer.prompt([
      {
        name: "link",
        message: "enter a bitly link without http|https",
      }
    ]);

    if (link !== "") {
      console.clear();
      bitlyInfo(link);
    } else {
      console.error("bitly link is required".red);
    }
  },
  async movie_info() {
    const { query } = await inquirer.prompt([
      {
        name: "query",
        message: "please search a movie search",
      }
    ]);

    if (query !== "") {
      console.clear();
      movieDB(query);
    } else {
      console.error("please the movie is required".red);
    }
  },
  async twitch_info() {
    const { user, twitch_token } = await inquirer.prompt([
      {
        name: "user",
        message: "get twitch user"
      },
      {
        name: "twitch_token",
        message: "enter a twitch token without the key Bearer",
        type: "password",
        mask: "?"
      }
    ]);

    if (user !== "" && twitch_token !== "") {
      console.clear();
      twitchInfo(user, twitch_token);
    } else {
      console.error("twitch info fields is required".red);
    }
  }
};

// exports
export default infoTools;
