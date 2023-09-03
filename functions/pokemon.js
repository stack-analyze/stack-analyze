// colors
import colors from "colors";
import boxen from "boxen";
import CliProgress from "cli-progress";

// utils
import { listFormat, stackSave } from "../utils.js";

const pokeStats = {
  hp: 255,
  attack: 194,
  defense: 230,
  "special-attack": 180,
  "special-defense": 230,
  speed: 200,
  xp: 635
};

/** 
*	@param {string}
* @returns {string}
*/
const barColor = stat => {
  switch(stat) {
    case "hp":
      return "{bar}".red;
    case "attack":
      return "{bar}".yellow;
    case "defense":
      return "{bar}".brightYellow;
    case "special-attack":
      return "{bar}".blue;
    case "special-defense":
      return "{bar}".green;
    case "speed":
      return "{bar}".magenta;
    default:
      return "{bar}".cyan;
  }
};

/** 
* @async
* @param {number | string} pokemon
* @returns {Promise<void>}
*/
export default async function pokemonInfo(pokemon) {
  console.clear();
  
  const multibar = new CliProgress.MultiBar({
    format: "{stats} | {bar} | {value}/{total}",
    clearOnComplete: false,
    stopOnComplete: true,
    hideCursor: true,
    forceRedraw: true,
  }, CliProgress.Presets.shades_grey);
  
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
      types: listFormat.format(types.map(({ type }) => type.name)),
    };
    
    const PokeInfo = boxen(info.types, {title: `${id} - ${name}`});
    
    multibar.create(pokeStats.xp, 0, { stats: "xp" }, {
      format: `{stats} | ${barColor("xp")} | {value}/{total}`,
    }).update(base_experience);
      
    stats.forEach(({base_stat, stat}) => {
      multibar.create(pokeStats[stat.name], 0, { stats: stat.name }, {
        format: `{stats} | ${barColor(stat.name)} | {value}/{total}`,
      }).update(base_stat);
      
      info[stat.name] = base_stat;
    });
    
    multibar.log(`${PokeInfo}\n`);
    
    setTimeout(() => {
      multibar.stop();
    }, 3000);
    
    stackSave("poke-info.json", JSON.stringify(info, null, 2));
  } catch(err) {
    console.info(colors.red(err.message));
  }
}
