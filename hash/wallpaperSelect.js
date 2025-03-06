// inquirer
import { select } from "@inquirer/prompts";

import { wallpaperDownload } from "../functions/download.js";

const message = "select a wallpaper for download:";
const backMenu = "back to menu";

const wallpaperSelect = {
  async solMoon(refreshCallback, alternativeCallback) {
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
  async dimensions(refreshCallback, alternativeCallback) {
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
  async seyyahi2(refreshCallback, alternativeCallback) {
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
  }
};

export default wallpaperSelect;
