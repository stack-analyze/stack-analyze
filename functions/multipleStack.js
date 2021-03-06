// modules
const { textSync } = require("figlet");
const Wappalyzer = require("wappalyzer");
const { red, green } = require("colors");

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
      urls.map(async (url) => ({
        url,
        stack: await wappalyzer.open(url).analyze()
      })));

    console.info("multiple websites tech stack \n");
    console.group();
    // loop web site tech stack
    for (const result of results) {
      console.info(green(textSync(result.url, "Small")));
      console.group();
      console.table(result.stack.technologies.map((app) => ({
        tech_name: app.name,
        tech_website: app.website,
        tech_categories: app.categories.map((categorie) => categorie.name).join(", ")
      })));
      console.groupEnd();
    }
  } catch (err) {
    console.error(red(err.message));
  }

  await wappalyzer.destroy();
};

module.exports = multipleStack;
