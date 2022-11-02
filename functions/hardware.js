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
import { printTable } from "console-table-printer";

const timeout = 1e3;

/**
 * 
 * @param {number} size 
 * @param {number} [base = 1073741824] 
 * @returns {string}
 */
const gigabyteConvert = (size, base=1073741824) => (size / base).toFixed(2);

const hardwareTools = {
  async cpuInfo(refreshCallback) {
    console.clear();

    try {
      const {
        manufacturer,
        brand,
        speed,
        cores,
        physicalCores,
        processors,
        vendor,
        family,
        model
      } = await cpu();

      // show results
      console.table({
        manufacturer,
        brand,
        speed,
        cores,
        physicalCores,
        processors,
        vendor,
        family,
        model
      });
    } catch (err) {
      console.error(colors.red(err.message));
    }
    setTimeout(refreshCallback, timeout);
  },
  async ramMemInfo(refreshCallback) {
    console.clear();

    try {
      const {
        total,
        free,
        used,
        active,
        available
      } = await mem();

      // show results
      console.table({
        total_mem: `${gigabyteConvert(total)} GB`,
        free_mem: `${gigabyteConvert(free)} GB`,
        used_mem: `${gigabyteConvert(used)} GB`,
        active_mem: `${gigabyteConvert(active)} GB`,
        available_mem: `${gigabyteConvert(available)} GB`
      });
    } catch (err) {
      console.error(colors.red(err.message));
    }
    setTimeout(refreshCallback, timeout);
  },
  async osDetail(refreshCallback) {
    console.clear();

    try {
      const {
        hostname,
        platform,
        distro,
        release,
        kernel,
        arch,
        serial,
        uefi
      } = await osInfo();
  
      // show results
      console.table({
        hostname,
        platform,
        distro,
        release,
        kernel,
        arch,
        serial,
        uefi
      });
    } catch (err) {
      console.error(colors.red(err.message));
    }
    setTimeout(refreshCallback, timeout);
  },
  async diskInfo(refreshCallback) {
    console.clear();

    try {
      const disks = await diskLayout();
  
      const disksList = disks.map(({
        type,
        name,
        vendor,
        size,
        interfaceType
      }) => ({
        type,
        name,
        vendor,
        diskSize: `${gigabyteConvert(size)} GB`,
        interfaceType
      }));
  
      printTable(disksList);
  
    } catch (err) {
      console.error(colors.red(err.message));
    }
    setTimeout(refreshCallback, timeout);
  },
  async controllerInfo(refreshCallback) {
    console.clear();

    try {
      const { controllers } = await graphics();
  
      const controllersList = controllers.map(({
        model,
        vendor,
        vram
      }) => ({
        model,
        vendor,
        vramSize: vram < 1024
          ? `${vram} MB`
          : `${gigabyteConvert(vram, 1024)} GB`
      }));
  
      // show results
      printTable(controllersList);
    } catch (err) {
      console.error(colors.red(err.message));
    }
    setTimeout(refreshCallback, timeout);
  },
  async displayInfo(refreshCallback) {
    console.clear();

    try {
      const { displays } = await graphics();
  
      const displayList = displays.map(({
        model,
        main,
        connection,
        resolutionX,
        resolutionY
      }) => ({
        model,
        main,
        connection,
        resolutionX,
        resolutionY
      }));
  
      // show results
      printTable(displayList);
    } catch (err) {
      console.error(colors.red(err.message));
    }
    setTimeout(refreshCallback, timeout);
  },
  async biosInfo(refreshCallback) {
    console.clear();

    try {
      const {
        releaseDate,
        vendor,
        revision,
        version
      } = await bios();
  
      console.table({
        releaseDate,
        vendor,
        bios_revision: revision || "no info",
        version
      });
    } catch (err) {
      console.error(colors.red(err.message));
    }
    setTimeout(refreshCallback, timeout);
  }
};

// exports modules
export default hardwareTools;
