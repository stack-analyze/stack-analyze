// modules
const {
  cpu,
  mem,
  osInfo,
  diskLayout,
  graphics,
  bios
} = require("systeminformation");
const { printTable } = require("console-table-printer");
const { red } = require("colors");


/**
 * 
 * @description call the async function cpuinfo
 * @return { Promise<void> } - return cpu results
 * 
 */
async function cpuInfo() {
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
    console.error(red(err.message));
  }
}

/**
 * 
 * @description call the async function ram memory
 * @return { Promise<void> } - return ram memory results
 * 
 */
async function ramMemInfo() {
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
    console.error(red(err.message));
  }
}

/**
 * 
 * @description call the async function osinfo
 * @return { Promise<void> } - return os results results
 * 
 */
async function osDetail() {
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
    console.error(red(err.message));
  }
}

/**
 * 
 * @description call the async function diskinfo
 * @return { Promise<void> } - return disks results
 * 
 */
async function diskInfo() {
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
    console.error(red(err.message));
  }
}

/**
 * 
 * @description call the async function graphic card
 * @return { Promise<void> } - return graphic controller results
 * 
 */
async function controllerInfo() {
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
    console.error(red(err.message));
  }
}

/**
 * 
 * @description call the async function display info
 * @return { Promise<void> } - return display results
 * 
 */
async function displayInfo() {
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
    console.error(red(err.message));
  }
}

/**
 * 
 * @description call the async function biosinfo
 * @return { Promise<void> } - return bios info results
 * 
 */
async function biosInfo() {
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
      bios_revision: revision === "" ? "no info": revision,
      version
    });
  } catch (err) {
    console.error(red(err.message));
  }
}

// exports modules
module.exports = {
  cpuInfo,
  ramMemInfo,
  osDetail,
  diskInfo,
  controllerInfo,
  displayInfo,
  biosInfo
};
