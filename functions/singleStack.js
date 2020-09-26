// module
const Wappalyzer = require("wappalyzer");
const { textSync } = require("figlet");

/**
 * 
 * @description call single website tech stack analyze
 * @param { string } url - analyze single website stack
 * @returns { Promise<void> } - return async results single web
 * 
 */
async function singleStack (url) {
  const wappalyzer = await new Wappalyzer;

  try {
    await wappalyzer.init();

    const results = await wappalyzer.open(url).analyze();

    console.info("\x1b[32m", textSync(url), "\x1b[0m");

    console.table(results.technologies.map((app) => ({
      "tech-name": app.name,
      "tech-website": app.website,
      "tech-categories": Object.values(app.categories).map((categorie) => categorie.name).join(", ")
    })));
  } catch (err) {
    console.error("\x1b[31m", err.message, "\x1b[0m");
  }

  await wappalyzer.destroy();
}

module.exports = singleStack;
