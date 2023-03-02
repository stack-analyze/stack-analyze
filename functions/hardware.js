// modules
import { createWriteStream } from "node:fs";
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

const hardwareinfo = createWriteStream("hardware.csv");

const csvHeader = (obj) => `${Object.keys(obj).join(";")}\n`;
const csvData = (obj, spaces) => `${Object.values(obj).join(";")}${spaces}`;

/**
 * 
 * @param {number} size 
 * @param {number} [base = 1073741824] 
 * @returns {string}
 */
const gigabyteConvert = (size, base = 1073741824) => (size / base).toFixed(2);

/**
 * 
 * @async
 * @returns {Promise<void>}
 */
export default async function hardware() {
  try {
    // bios info
    const biosInfo = await bios();
    
    for (const key in biosInfo) {
      if (!biosInfo[key]) {
        delete biosInfo[key];
      }
    }
    
    hardwareinfo.write(csvHeader(biosInfo));
    hardwareinfo.write(csvData(biosInfo, "\n\n"));

    // cpu info
    const cpuInfo = await cpu();
    
    for (const key in cpuInfo) {
      if (!cpuInfo[key]) {
        delete cpuInfo[key];
      }
    }

    for (const key in cpuInfo.cache) {
      if (!cpuInfo.cache[key]) {
        delete cpuInfo.cache[key];
      }
    }
    
    cpuInfo.cache = Object.entries(cpuInfo.cache)
      .map(([key, value]) => `${key}: ${value}`)
      .join(" ");
    
    hardwareinfo.write(csvHeader(cpuInfo));
    hardwareinfo.write(csvData(cpuInfo, "\n\n"));

    // os info
    const os = await osInfo();
    
    for (const key in os) {
      if (!os[key]) {
        delete os[key];
      }
    }
    
    hardwareinfo.write(csvHeader(os));
    hardwareinfo.write(csvData(os, "\n\n"));
    

    // ram memory info
    const ram = await mem();
    
    for (const key in ram) {
      ram[key] = `${gigabyteConvert(ram[key])} GB`;
    }
    
    hardwareinfo.write(csvHeader(ram));
    hardwareinfo.write(csvData(ram));

    // disks
    const disks = await diskLayout();
    
    disks.forEach(disk => {
      for (const key in disk) {
        if (!disk[key]) {
          delete disk[key];
        }

        if (typeof disk[key] === "number") {
          disk[key] = `${gigabyteConvert(ram[key])} GB`;
        }
      }
      
      hardwareinfo.write(csvHeader(disk));
      hardwareinfo.write(csvData(disk, "\n"));
    });
    hardwareinfo.write("\n");

    /* displays & controllers */
    const { displays, controllers } = await graphics();
    
    // controllers
    controllers.forEach(controller => {
      for (const key in controller) {
        if (!controller[key]) {
          delete controller[key];
        }

        if (typeof controller[key] === "number") {
          controller[key] = controller[key] < 1024
            ? `${controller[key]} MB`
            : `${gigabyteConvert(controller[key])} GB`;
        }
      }
      
      hardwareinfo.write(csvHeader(controller));
      hardwareinfo.write(csvData(controller, "\n"));
    });
    
    hardwareinfo.write("\n");

    displays.forEach(display => {
      for (const key in display) {
        if (!display[key]) {
          delete display[key];
        }
      }
      
      hardwareinfo.write(csvHeader(display));
      hardwareinfo.write(csvData(display, "\n"));
    });
    
    // finish
    console.info("finish the hardware information file");
  } catch (err) {
    console.error(colors.red(err.message));
  }
}
