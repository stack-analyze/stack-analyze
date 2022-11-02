const { 
  cpu, 
  mem, 
  osInfo, 
  diskLayout, 
  graphics, 
  bios 
} = require("systeminformation");

const hardwareTools = {
  async cpuInfo() {
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
  
      return {
        manufacturer,
        brand,
        speed,
        cores,
        physicalCores,
        processors,
        vendor,
        family,
        model
      };
    } catch (err) {
      return err.message;
    }
  },
  async ramMemInfo() {
    try {
      const {
        total,
        free,
        used,
        active,
        available
      } = await mem();
  
      return {
        total,
        free,
        used,
        active,
        available
      };
    } catch (err) {
      return err.message;
    }
  },
  async osDetail() {
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
  
      return {
        hostname,
        platform,
        distro,
        release,
        kernel,
        arch,
        serial,
        uefi
      };
    } catch (err) {
      return err.message;
    }
  },
  async diskInfo() {
    try {
      return (await diskLayout())
        .map(({ type, name, vendor, size, interfaceType }) => ({
          type,
          name,
          vendor,
          size,
          interfaceType
        }));
  
    } catch (err) {
      return err.message;
    }
  },
  async controllerInfo() {
    try {
      const { controllers } = await graphics();
  
      return controllers.map(({
        model,
        vendor,
        vram
      }) => ({
        model,
        vendor,
        vram
      }));
    } catch (err) {
      return err.message;
    }
  },
  async displayInfo() {
    try {
      const { displays } = await graphics();
  
      return displays.map(({
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
    } catch (err) {
      return err.message;
    }
  },
  async biosInfo() {
    try {
      const {
        releaseDate,
        vendor,
        revision,
        version
      } = await bios();
  
      return {
        releaseDate,
        vendor,
        revision,
        version
      };
    } catch (err) {
      return err.message;
    }
  }
}

// exports modules
module.exports = hardwareTools;
