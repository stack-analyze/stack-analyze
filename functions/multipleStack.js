// modules
import colors from "colors";
import { printTable } from "console-table-printer";
import { wappalyzer } from "../api/webApis.js";

// list format
import { listFormat } from "../utils.js";

/**
 *
 * @description call multiple websites tech stack analyze
 * @param { string[] } urlList - tech analyze in multiples websites
 * @returns { Promise<void> } - async results in multiples websites
 * 
 */
export default async function multipleStack(urlList) {
  try {
    await wappalyzer.init();

    console.info("multiple websites tech stack \n");
    
    for await (const url of urlList) {
      console.info(url.green);
      
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

      printTable(stackResult);
    }
  } catch (err) {
    console.error(colors.red(err.message));
  }

  await wappalyzer.destroy();
}
