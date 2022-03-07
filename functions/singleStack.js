// module
import Wappalyzer from "wappalyzer";
import figlet from "figlet";
import colors from "colors";
import stackTable from "../models/stackTables.js";

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
    }) => ({
      techName: name,
      techWebsite: website,
      techCategories: categories.map(({ name }) => name).join(", ")
    }));

    console.info(colors.green(figlet.textSync(url)));

    stackTable.addRows(stackResult);

    stackTable.printTable();
  } catch (err) {
    console.error(colors.red(err.message));
  }

  await wappalyzer.destroy();
}
