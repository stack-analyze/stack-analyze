// core modules
import { writeFile } from "node:fs/promises";

// colors module
import colors from "colors";

// url api
import { wallpapersURL } from "../api/wallpapersURL.js";

/**
  * sol, moon wallpapers downloader
  * @async
  * @param {"sol-moon" | "dimensions" | "seyyahi2" | "ancient-mistery" | "tsuky-no-emily"} opt
  * @param {string} filename
  * @returns {Promise<void>}
*/
export const wallpaperDownload = async (opt, filename) => {
  try {
    const { data } = await wallpapersURL.get(`/${opt}/download/${filename}`);

    writeFile(filename, data, {encoding: "base64"});
  } catch (err) {
    console.error(colors.red(err.message));
  }
};
