// functions
import genPassword from "../functions/password.js";
import hardware from "../functions/hardware.js";

// opts
import { menuHardwareOpts } from "../utils.js";

const utilityTools = {
  password(refreshCallback) {
    console.clear();
    genPassword();
    setTimeout(refreshCallback, 3e3);
  },
  async hardware(refreshCallback) {
    console.clear();
    hardware();
    setTimeout(refreshCallback, 3e3);
  }
};

export default utilityTools;
