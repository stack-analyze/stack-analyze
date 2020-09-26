const { textSync } = require("figlet");
const Wappalyzer = require("wappalyzer");

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
      console.info("\x1b[36m", textSync(result.url, "Small"), "\x1b[0m");
      console.group();
      console.table(result.stack.technologies.map((app) => ({
        "tech-name": app.name,
        "tech-website": app.website,
        "tech-categories": Object.values(app.categories).map((categorie) => categorie.name).join(", ")
      })));
      console.groupEnd();
    }
  } catch (err) {
    console.error("\x1b[31m", err.message, "\x1b[0m");
  }

  await wappalyzer.destroy();
};

module.exports = multipleStack;
