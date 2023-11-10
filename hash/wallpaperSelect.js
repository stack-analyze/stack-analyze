// stock module
import { performance } from "node:perf_hooks";

// inquirer
import inquirer from "inquirer";
import colors from "colors";

import { solMoonDownload } from "../functions/download.js";

const wallpaperSelect = {
	// refreshCallback
	solMoon(refreshCallback, alternativeCallback) {
		const solMoonWallpapers = [...Array(20).keys()]
			.map(i => `sol-moon${i + 1}.jpeg`);
		
		inquirer.prompt([
		  {
		  	type: "list",
		  	name: "wallpaper",
		  	message: "select a wallpaper for download:",
		  	choices: [...solMoonWallpapers, "back to menu"]
		  }
		])
			.then(({ wallpaper }) => {
				if (wallpaper === "back to menu") {
					alternativeCallback();
				} else {
					solMoonDownload(wallpaper);
					setTimeout(refreshCallback, 5000);
				}
			})
			.catch(err => console.error(colors.red(err.message)));
	}
};

export default wallpaperSelect;
