// colors module
import colors from "colors";

// url api
import { wallpapersURL } from "../api/wallpapersURL.js";

// save file
import { stackSave } from "../utils.js";

/**
  * sol, moon wallpapers downloader
  * @async
  * @param {"sol-moon" | "dimensions"} opt
  * @param {string} filename
  * @returns {Promise<void>}
*/
export const wallpaperDownload = async (opt, filename) => {	
  try {
    const { data } = await wallpapersURL.get(`/${opt}/download/${filename}`);
    stackSave(filename, data);
  } catch(err) {
    console.error(colors.red(err.message));
  }
};
