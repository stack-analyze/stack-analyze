// module
import Wappalyzer from "wappalyzer";
import figlet from "figlet";
import colors from "colors";
import { printTable } from "console-table-printer";

// list format
import { listFormat } from "../utils.js";

/**
 * 
 * @description call single website tech stack analyze
 * @param { string } url - analyze single website stack
 * @returns { Promise<void> } - return async results single web
 * 
 */
export default async function singleStack(url) {
  const wappalyzer = await new Wappalyzer;

  try {
    await wappalyzer.init();

    const { technologies } = await wappalyzer.open(url).analyze();

    const stackResult = technologies.map(({
      name,
      website,
      categories
    }) => {
      const stackCategories = categories.map(({ name }) => name);

      return {
        techName: name,
        techWebsite: website,
        techCategories: listFormat.format(stackCategories)
      };
    });

    console.info(colors.green(figlet.textSync(url)));

    printTable(stackResult);
  } catch (err) {
    console.error(colors.red(err.message));
  }

  await wappalyzer.destroy();
}
