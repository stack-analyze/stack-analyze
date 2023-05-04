// module
import colors from "colors";
import { printTable } from "console-table-printer";

// utils
import { listFormat, stackSave } from "../utils.js";

// wappalyzer
import { wappalyzer } from "../api/webApis.js";

/**
 * 
 * @description call single website tech stack analyze
 * @async
 * @param { string } url - analyze single website stack
 * @returns { Promise<void> } - return async results single web
 */
export default async function singleStack(url) {
  try {
    await wappalyzer.init();

    const { technologies } = await (await wappalyzer.open(url)).analyze();

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

    console.info(url.green);

    printTable(stackResult.slice(0, 10));

    stackSave("single-stack.json", JSON.stringify(stackResult, null, 2));
  } catch (err) {
    console.error(colors.red(err.message));
  }

  await wappalyzer.destroy();
}
