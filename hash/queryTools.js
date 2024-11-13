// inquirer
import inquirer from "inquirer";

// functions
import animeSearch from "../functions/animeInfo.js";
import movieDB from "../functions/moviesInfo.js";
import pokemonInfo from "../functions/pokemon.js";
import twitchInfo from "../functions/twitch.js";
import deezer from "../functions/deezer.js";
import potterSearch from "../functions/potterSearch.js";

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
  pokemon_info(refreshCallback) {
    console.clear();
    inquirer.prompt([
      {
        type: "list",
        name: "pokeOpt",
        message: "enter a opt for start search",
        choices: ["ID", "Name"],
      },
      {
        type: "number",
        name: "pokeId",
        message: "enter a poekmon ID:",
        validate: value => value > 0 || "this field not allowed empty values, NaN or number less or equal to 0",
        filter(value) {
          if(!value) return "";
      
          const int = parseInt(value);
      
          if(isNaN(int)) return "";
      
          return int <= 0 ? "" : int;
        },
        when: ({pokeOpt}) => pokeOpt === "ID",
      },
      {
        type: "input",
        name: "pokeName",
        message: "enter a poekmon name:",
        validate(input) {
          const excludeNumbers = /[^0-9]/;    
      
          return excludeNumbers.test(input) || "the pokemon name is required";
        },
        when: ({pokeOpt}) => pokeOpt === "Name",
      },
    ])
      .then(anw => {
        pokemonInfo(anw?.pokeName || anw?.pokeId);
        setTimeout(refreshCallback, 6e3);
      });
  },
  twitch_info(refreshCallback) {
    console.clear();
    
    inquirer.prompt([
      promptParams("twitchSeparator", "enter a separator for split example ',':"),
      promptParams("twitchUsers", "enter a twitch users example 'a,b,c'"),
      promptKey("twitchClient", "enter a twitch client ID"),
      promptKey("twitchToken", "enter a twitch token"),
    ])
      .then(({ twitchSeparator, twitchUsers, twitchClient, twitchToken }) => {
        twitchInfo({ twitchSeparator, twitchUsers, twitchClient, twitchToken });
        setTimeout(refreshCallback, 2e3);
      });
  },
  deezer(refreshCallback) {
  	console.clear();
  	
  	inquirer.prompt([
  		promptParams("query", "enter a query for search")
  	])
  		.then(({ query }) => {
  			deezer(query);
  			setTimeout(refreshCallback, 5e3);
  		});
  },
  potter_search(refreshCallback) {
    console.clear();
    
    inquirer.prompt([
      promptParams("search", "enter a keyword or name for search")
    ])
      .then(({ search }) => {
        potterSearch(search);
        setTimeout(refreshCallback, 5e3);
      });
  }
};

export default queryTools;
