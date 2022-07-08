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

/** @type {Object.<string, function(): Promise<void>>} */
const hardwareTools = {
  async cpuInfo() {
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
  },
  async ramMemInfo() {
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
        total_mem: `${(total / 1073741824).toFixed(2)} GB`,
        free_mem: `${(free / 1073741824).toFixed(2)} GB`,
        used_mem: `${(used / 1073741824).toFixed(2)} GB`,
        active_mem: `${(active / 1073741824).toFixed(2)} GB`,
        available_mem: `${(available / 1073741824).toFixed(2)} GB`
      });
    } catch (err) {
      console.error(colors.red(err.message));
    }
  },
  async osDetail() {
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
  },
  async diskInfo() {
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
        diskSize: `${(size / 1073741824).toFixed(2)} GB`,
        interfaceType
      }));
  
      printTable(disksList);
  
    } catch (err) {
      console.error(colors.red(err.message));
    }
  },
  async controllerInfo() {
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
          : `${(vram / 1024).toFixed(2)} GB`
      }));
  
      // show results
      printTable(controllersList);
    } catch (err) {
      console.error(colors.red(err.message));
    }
  },
  async displayInfo() {
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
  },
  async biosInfo() {
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
        bios_revision: revision === "" ? "no info" : revision,
        version
      });
    } catch (err) {
      console.error(colors.red(err.message));
    }
  }
};

// exports modules
export default hardwareTools;
