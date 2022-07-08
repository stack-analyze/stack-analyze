// modules
import figlet from "figlet";
import Wappalyzer from "wappalyzer";
import colors from "colors";
import { printTable } from "console-table-printer";

// list format
import { listFormat } from "../utils.js";

/**
 *
 * @description call multiple websites tech stack analyze
 * @param { string[] } urls - tech analyze in multiples websites
 * @returns { Promise<void> } - async results in multiples websites
 * 
 */
const multipleStack = async (urls) => {
  const wappalyzer = await new Wappalyzer();

  try {
    await wappalyzer.init();

    const results = await Promise.all(
      urls.map(async (url) => {
        const { technologies } = await wappalyzer.open(url).analyze();

        return {
          url,
          technologies
        };
      }));

    console.info("multiple websites tech stack \n");
    console.group();
    // loop web site tech stack
    results.forEach(({url, technologies}) => {
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

      console.info(colors.green(figlet.textSync(url, "Small")));
      console.group();
      printTable(stackResult);
      console.groupEnd();
    });
  } catch (err) {
    console.error(colors.red(err.message));
  }

  await wappalyzer.destroy();
};

export default multipleStack;
