// hardware modules
const {
  cpuInfo,
  ramMemInfo,
  osDetail,
  diskInfo,
  controllerInfo,
  displayInfo,
  biosInfo
} = require("../functions/hardware");

/**
 * @type {{ cpu(): void, ram_memory(): void, os(): void, disk(): void, controller(): void, display(): void, bios(): void }}
 */
const hardwareTools = {
  cpu() {
    console.clear();
    cpuInfo();
  },
  ram_memory() {
    console.clear();
    ramMemInfo();
  },
  os() {
    console.clear();
    osDetail();
  },
  disk() {
    console.clear();
    diskInfo();
  },
  controller() {
    console.clear();
    controllerInfo();
  },
  display() {
    console.clear();
    displayInfo();
  },
  bios() {
    console.clear();
    biosInfo();
  }
};

// exports
module.exports = hardwareTools;
