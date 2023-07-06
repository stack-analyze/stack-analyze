// colors
import colors from "colors";

// utils
import { listFormat, stackSave } from "../utils.js";

/** 
* @async
* @param {number | string} pokemon
* @returns {Promise<void>}
*/
export default async function pokemonInfo(pokemon) {
  console.clear();
  
  try {
    const data = await (
      await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    ).json();
    
    const {
      id,
      name,
      height, 
      base_experience, 
      weight, 
      stats, 
      types
    } = data;
    
    const info = {
      id,
      name,
      height,
      base_experience,
      weight,
      types: listFormat.format(types.map(({ type }) => type.name))
    };
    
    stats.forEach(({ base_stat, stat }) => {
      info[stat.name] = base_stat;
    });
    
    console.info(info);
    
    stackSave("poke-info.json", JSON.stringify(info, null, 2));
  } catch(err) {
    console.info(colors.red(err.message));
  }
}
