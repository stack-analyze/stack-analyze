import axios from "axios";
import colors from "colors";
import { printTable } from "console-table-printer";

// save search
import { stackSave } from "../utils.js";

/**
 * @description search harry potter characters using keyword or name
 * @async
 * @param { string } search - get results of harry potter characters
 * @returns { Promise<void>}
 */
export default async function potterSearch(search) {
  try {
    const { data } = await axios.get("https://potterapi-fedeperin.vercel.app/en/characters", {
      params: { search }
    });
    
    const characterList = data.map(({
      nickname, fullName, hogwartsHouse, birthdate
    }) => ({
      nickname, fullName, birthdate,
      house: hogwartsHouse,
    }));
    
    printTable(characterList);
    stackSave("potter-results.json", JSON.stringify(characterList, null, 2));
  } catch(err) {
    console.error(colors.red(err.message));
  }
}
