import axios from "axios";
import { printTable } from "console-table-printer";
import colors from "colors";

// save data search
import { stackSave } from "../utils.js";

/**
	* @async
	* @params { string } query
	* @returns {Promise<void>}
*/
export default async function deezer(q) {
	try {
		const { data } = await axios.get(
			"https://api.deezer.com/search/album", {
				params: { q }
			}
		);
		
		const results = data.data.map(({
			title, record_type, explicit_lyrics, artist
		}) => ({
			artist: artist.name,
			title,
			record_type,
			lyrics_content: explicit_lyrics ? "explicit" : "clean"
		}));
		
		printTable(results.slice(0, 15));
		
		stackSave("album-search.json", JSON.stringify(data.data, null, 2));
	} catch(err) {
		console.error(colors.red(err.message));
	}
}
