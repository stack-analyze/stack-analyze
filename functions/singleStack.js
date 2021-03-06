// module
const Wappalyzer = require("wappalyzer");
const { textSync } = require("figlet");
const { red } = require("colors");

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

    console.info(textSync(url).green);

    console.table(results.technologies.map((app) => ({
      "tech-name": app.name,
      "tech-website": app.website,
      "tech-categories": app.categories.map((categorie) => categorie.name).join(", ")
    })));
  } catch (err) {
    console.error(red(err.message));
  }

  await wappalyzer.destroy();
}

module.exports = singleStack;
