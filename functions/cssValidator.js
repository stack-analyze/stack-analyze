// modules
import colors from "colors";
import cssValidator from "w3c-css-validator";
import { stackSave } from "../utils.js";

/** 
* @description css validator tool from w3c service
* @param {string} url - url analyze all stylesheets
* @async
* @returns {Promise<void>}
*/
export default async function cssValidate(url) {
  try {
    const cssResults = await cssValidator.validateURL(url, {
      warningLevel: 1
    });
		
    stackSave("cssErrors.json", JSON.stringify(cssResults.errors, null, 2));
    stackSave("cssWarnings.json", JSON.stringify(cssResults.warnings, null, 2));
		
    console.info("finish css results printers".green);
  } catch(err) {
    console.error(colors.red(err.message));
  }
}
