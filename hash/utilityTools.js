// menu
import { stackMenu } from "../menu.js";
import { pokerGameOpts } from "../utils.js";

// functions
import genPassword from "../functions/password.js";
import hardware from "../functions/hardware.js";
import pokerGame from "../functions/poker.js";

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
  },
  async poker_game(refreshCallback) {
  	const pokeOpt = await stackMenu({
  		message: "select a poker game for view instructions:",
  		choices: pokerGameOpts
  	});
  	
  	pokerGame(pokeOpt);
  	setTimeout(refreshCallback, 5e3);
  }
};

export default utilityTools;
