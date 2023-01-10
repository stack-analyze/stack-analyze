// modules
import {
  cpu,
  mem,
  osInfo,
  diskLayout,
  graphics,
  bios
} from "systeminformation";
import colors from "colors";

import { stackSave } from "../utils.js";

/**
 * 
 * @param {number} size 
 * @param {number} [base = 1073741824] 
 * @returns {string}
 */
const gigabyteConvert = (size, base=1073741824) => (size / base).toFixed(2);

/**
 * 
 * @async
 * @returns {Promise<void>}
 */
export default async function hardware() {
  try {
    // Map object
    const hardware = new Map();
    
    // info
    const biosInfo = await bios()
    const cpuInfo = await cpu()
    const ram = await mem()
    const os = await osInfo()
    const disks = await diskLayout()
    const { displays, controllers } = await graphics();

    // omit falsy values
    for(const key in biosInfo) {
      if(!biosInfo[key]) {
        delete biosInfo[key];
      }
    }

    for(const key in cpuInfo) {
      if(!cpuInfo[key]) {
        delete cpuInfo[key];
      }
    }
    
    for(const key in cpuInfo.cache) {
      if(!cpuInfo.cache[key]) {
        delete cpuInfo.cache[key];
      }
    }

    for(const key in os) {
      if(!os[key]) {
        delete os[key];
      }
    }

    for(const key in ram) {
      ram[key] = `${gigabyteConvert(ram[key])} GB`;
    }
    
    disks.forEach(disk => {
      for(const key in disk) {
        if(!disk[key]) {
          delete disk[key];
        }
        
        if(typeof disk[key] === "number") {
          disk[key] = `${gigabyteConvert(ram[key])} GB`;
        }
      }
    });
    
    controllers.forEach(controller => {
      for(const key in controller) {
        if(!controller[key]) {
          delete controller[key];
        }
        
        if(typeof controller[key] === "number") {
          controller[key] = controller[key] < 1024
            ? `${controller[key]} MB`
            : `${gigabyteConvert(controller[key])} GB`;
        }
      }
    });
    
    displays.forEach(display => {
      for(const key in display) {
        if(!display[key]) {
          delete display[key];
        }
      }
    });
    
    // add values
    hardware.set("bios", biosInfo);
    hardware.set("cpu", cpuInfo);
    hardware.set("ram", ram);
    hardware.set("os", os);
    hardware.set("disks", disks);
    hardware.set("graphics", controllers);
    hardware.set("displays", displays);

    // save file
    stackSave("hardware.json", JSON.stringify(Object.fromEntries(hardware), null, 2));
    
    // finish
    console.info("finish the hardware information file");
  } catch (err) {
    console.error(colors.red(err.message));
  }
}
