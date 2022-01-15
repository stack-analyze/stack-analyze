// modules
const inquirer = require("inquirer");

// github info
const githubInfo = require("../functions/gitUser");

// anime search
const animeSearch = require("../functions/animeInfo");

// crypto market
const cryptoMarket = require("../functions/cryptoList");

// bitly
const bitlyInfo = require("../functions/bitly");

// movies
const movieDB = require("../functions/moviesInfo");


/** 
 * @type {{ github_info(): Promise<void>, anime_search(): Promise<void>, crypto_market(): void, bitly_info(): Promise<void>, movie_info(): Promise<void> }} 
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
    const { link, token } = await inquirer.prompt([
      {
        name: "link",
        message: "enter a bitly link without http|https",
      },
      {
        name: "token",
        message: "enter a bitly token",
        type: "password",
        mask: "?"
      }
    ]);

    bitlyInfo(link, token);
  },
  async movie_info() {
    const { api_key, query } = await inquirer.prompt([
      {
        name: "api_key",
        message: "insert api key",
        type: "password",
        mask: "?"
      },
      {
        name: "query",
        message: "please search a movie search",
      }
    ]);

    movieDB(api_key, query);
  }
};

// exports
module.exports = infoTools;
