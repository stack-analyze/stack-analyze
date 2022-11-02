// module
import colors from "colors";
import { printTable } from "console-table-printer";

// list format
import { listFormat } from "../utils.js";
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

    console.info(url.green);

    printTable(stackResult);
  } catch (err) {
    console.error(colors.red(err.message));
  }

  await wappalyzer.destroy();
}
