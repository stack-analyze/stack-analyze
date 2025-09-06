// inquirer
import { input, password, select, number } from "@inquirer/prompts";

// functions
import animeSearch from "../functions/animeInfo.js";
import movieDB from "../functions/moviesInfo.js";
import pokemonInfo from "../functions/pokemon.js";
import twitchInfo from "../functions/twitch.js";
import deezer from "../functions/deezer.js";
import potterSearch from "../functions/potterSearch.js";
import { returnMainOpts } from "../utils.js";

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
const queryTools = {
  async anime_Search(refreshCallback) {
    console.clear();
    
    const query = await input({
    	message: "enter a anime keyword for search",
    	required: true
    });
    
    animeSearch(query);
    setTimeout(refreshCallback, 2e3);
  },
  async movie_info(refreshCallback) {
    console.clear();
    
    const { query, token } = { 
      query: await input({
      	message: "enter movie for search DB",
      	required: true
      }),
      token: await password({
      	message: "enter a token key",
      	mask: true
      })
    };
    
    movieDB(query, token);
    setTimeout(refreshCallback, 2e3);
  },
  async pokemon_info(refreshCallback) {
    console.clear();
    
    const pokeSelect = await select({
    	message: "enter a opt for start search",
    	choices: ["id", "name"],
    });
    
    const opt = pokeSelect === "id" 
      ? await number({
    		message: "enter a poekmon ID:",
    		min: 1,
    		required: true
    	}) : await input({
    	  message: "enter a poekmon name:",
    	  required: true,
    	  validate: input => /[^0-9]/.test(input) || "the pokemon name is required"
    	});
    	
    	pokemonInfo(opt);
    	setTimeout(refreshCallback, 6e3);
  },
  async twitch_info(refreshCallback) {
    console.clear();
    
    const { twitchSeparator, twitchUsers, twitchClient, twitchToken } = { 
    	twitchSeparator: await input({
    		message: "enter a separator for split example ',':",
    		required: true
    	}),
    	twitchUsers: await input({
      	message: "enter a twitch users example 'a,b,c'",
      	required: true
    	}),
    	twitchClient: await password({
    		message: "enter a twitch client ID:",
      	mask: true
    	}),
    	twitchToken: await password({
      	message: "enter a twitch token:",
      	mask: true
    	})
    };
    
    twitchInfo({ twitchSeparator, twitchUsers, twitchClient, twitchToken });
    setTimeout(refreshCallback, 2e3);
  },
  async deezer(refreshCallback) {
  	console.clear();
  	
  	const query = await input({
  		message: "enter a query for search",
  		required: true
  	});
  	
  	setTimeout(refreshCallback, 5e3);
  	deezer(query);
  },
  async potter_search(refreshCallback) {
    console.clear();
    
    const search = await input({
      message: "enter a keyword or name for search",
      required: true
    });
    
    potterSearch(search);
    setTimeout(refreshCallback, 5e3);
  }
};

const menuQueryOpts = [...Object.keys(queryTools), returnMainOpts];

export {queryTools, menuQueryOpts};
