// modules
const inquirer = require("inquirer");
const { textSync } = require("figlet");
const { green } = require("colors");

// analyze web
const singleStack = require("../functions/singleStack");
const multipleStack = require("../functions/multipleStack");

// pagespeed web
const pageSpeed = require("../functions/pageSpeed");

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
 * @type {{ single(): Promise<void>, multiple(): Promise<void>,  pagespeed(): Promise<void>, github_info(): Promise<void>, anime_search(): Promise<void>, cryto_market(): void, bitly_info(): Promise<void>, movie_info(): Promise<void> }}
 */
const mainTools = {
  async single() {
    console.clear();
    const { url } = await inquirer.prompt({
      name: "url",
      message: "enter url for analyze the tech stack:"
    });

    url.indexOf("http") === 0
      ? singleStack(url)
      : console.error("please insert a URL with parameter http:// or https://".red);
  },
  async multiple() {
    console.clear();
    const { urls } = await inquirer.prompt({
      name: "urls",
      message: "enter URLs for analyze the tech stacks with whitespace without quotes example 'http://example.com https://nodejs.org': \n"
    });

    if (
      urls.match(/(http|https)/g) !== null ||
      urls.match(/(http|https)/g) >= 2
    ) {
      const websites = urls.split(" ");
      console.clear();
      multipleStack(websites);
    } else {
      console.error("please in each URL insert a website the parameter https:// or http://".red);
    }
  },
  async pagespeed() {
    console.clear();
    const { speedWeb } = await inquirer.prompt({
      name: "speedWeb",
      message: "insert URL for page speed analyze:"
    });

    if (speedWeb.indexOf("http") === 0) {
      console.clear();
      console.info(green(textSync(speedWeb)));

      // start pagespeed results mobile
      textSync(speedWeb, "Small");
      pageSpeed(speedWeb);
    } else {
      console.error("please insert a URL with parameter https;// or http://".red);
    }
  },
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
  cryto_market() {
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

// export
module.exports = mainTools;
