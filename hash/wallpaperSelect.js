// inquirer
import inquirer from "inquirer";
import colors from "colors";

import { wallpaperDownload } from "../functions/download.js";

const message = "select a wallpaper for download:";
const backMenu = "back to menu";

const wallpaperSelect = {
  solMoon(refreshCallback, alternativeCallback) {
    const solMoonWallpapers = [...Array(20).keys()]
      .map(i => `sol-moon${i + 1}.jpeg`);	

    inquirer.prompt([
      {
        type: "list",
        name: "solMoon",
        message,
        choices: [...solMoonWallpapers, backMenu]
      }
    ])
      .then(({ solMoon }) => {
        if (solMoon === backMenu) {
          alternativeCallback();
        } else {
          wallpaperDownload("sol-moon", solMoon);
          setTimeout(refreshCallback, 5000);
        }
      })
      .catch(err => console.error(colors.red(err.message)));
  },
  dimensions(refreshCallback, alternativeCallback) {
    const dimensionsWallpapers = [...Array(12).keys()]
      .map(i => `dimensions-${i + 1}.jpeg`);

    inquirer.prompt([
      {
        type: "list",
        name: "dimensions",
        message,
        choices: [...dimensionsWallpapers, backMenu]
      }
    ])
      .then(({ dimensions }) => {
        if(dimensions === backMenu) {
          alternativeCallback();    
        } else {
          wallpaperDownload("dimensions", dimensions);
          setTimeout(refreshCallback, 5000);
        }
      });
  },
  seyyahi2(refreshCallback, alternativeCallback) {
  	const seyyahiWallpapers = [...Array(14).keys()]
  		.map(i => `seyyahi2-wallpaper${i + 1}.jpg`);
  		
  	inquirer.prompt([
  		{
  			type: "list",
  			name: "seyyahi2",
  			message,
  			choices: [...seyyahiWallpapers, backMenu]
  		}
  	])
  		.then(({ seyyahi2 }) => {
  			if(seyyahi2 === backMenu) {
  				alternativeCallback();
  			} else {
  				wallpaperDownload("seyyahi2", seyyahi2);
  			}
  		});
  }
};

export default wallpaperSelect;
