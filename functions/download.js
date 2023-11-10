// save password 
import { stackSave } from "../utils.js";

/**
	* sol, moon wallpapers downloader
	* @async
	* @param {string} filename
	* @returns {Promise<void>}
 */
export const solMoonDownload = async (filename) => {
	console.info(filename);
	
	const url = `https://sol-moon-wallpapers.vercel.app/api/download/${filename}`;
	
	try {
		const res = await fetch(url);
		
		if(!res.ok) {
			throw new Error(`Error HTTP: ${res.status}`);
		}
		
		const data = await res.blob();
		
		stackSave(filename, data.stream());
	} catch(err) {
		console.error(colors.red(err.message));
	}
};
