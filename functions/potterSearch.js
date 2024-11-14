import axios from "axios";
import colors from "colors";

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
    
    console.table(characterList);
  } catch(err) {
    console.error(colors.red(err.message));
  }
}
