// inquirer
import { select } from "@inquirer/prompts";

import { wallpaperDownload } from "../functions/download.js";
import { returnMainOpts } from "../utils.js";

const message = "select a wallpaper for download:";
const backMenu = "back to menu";

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
const wallpaperSelect = {
  solMoon: async (refreshCallback, alternativeCallback) => {
    const solMoonWallpapers = [...Array(20).keys()]
      .map(i => `sol-moon${i + 1}.jpeg`);	

    
    const solMoon = await select({
    	message, choices: [...solMoonWallpapers, backMenu]
    });
    
    if (solMoon === backMenu) {
    	alternativeCallback();
    } else {
    	wallpaperDownload("sol-moon", solMoon);
    	setTimeout(refreshCallback, 5000);
    }
  },
  dimensions: async (refreshCallback, alternativeCallback) => {
    const dimensionsWallpapers = [...Array(12).keys()]
      .map(i => `dimensions-${i + 1}.jpeg`);

    
    const dimensions = await select({
    	message, choices: [...dimensionsWallpapers, backMenu]
    });
    
    if(dimensions === backMenu) {
    	alternativeCallback();    
    } else {
    	wallpaperDownload("dimensions", dimensions);
    	setTimeout(refreshCallback, 5000);
    }
  },
  seyyahi2: async (refreshCallback, alternativeCallback) => {
  	const seyyahiWallpapers = [...Array(14).keys()]
  		.map(i => `seyyahi2-wallpaper${i + 1}.jpg`);
  	
  	const seyyahi2 = await select({
  		message, choices: [...seyyahiWallpapers, backMenu]
  	});
  	
  	if(seyyahi2 === backMenu) {
  		alternativeCallback();
  	} else {
  		wallpaperDownload("seyyahi2", seyyahi2);
  		setTimeout(refreshCallback, 5000);
  	}
  },
  ancientMistery: async (refreshCallback, alternativeCallback) => {
    const ancientMisteryWallpapers = [...Array(6).keys()]
  		.map(i => `ancient-mistery${i + 1}.jpeg`);

    const ancientMistery = await select({
  		message, choices: [...ancientMisteryWallpapers, backMenu]
  	});

    if(ancientMistery === backMenu) {
  		alternativeCallback();
  	} else {
  		wallpaperDownload("ancient-mistery", ancientMistery);
  		setTimeout(refreshCallback, 5000);
  	}
  },
  tsukyNoEmily: async (refreshCallback, alternativeCallback) => {
    const tsukyNoEmilyWallpapers = [...Array(6).keys()]
  		.map(i => `tsuky-no-emily${i + 1}.jpeg`);

    const tsukyNoEmily = await select({
  		message, choices: [...tsukyNoEmilyWallpapers, backMenu]
  	});

    if(tsukyNoEmily === backMenu) {
  		alternativeCallback();
  	} else {
  		wallpaperDownload("tsuky-no-emily", tsukyNoEmily);
  		setTimeout(refreshCallback, 5000);
  	}
  },
};

const menuWallpaperOpts = [...Object.keys(wallpaperSelect), returnMainOpts];

export {wallpaperSelect, menuWallpaperOpts};
