// module
const Wappalyzer = require("wappalyzer");
const { textSync } = require("figlet");
const { red, green } = require("colors");
const { Table } = require("console-table-printer");

/**
 * 
 * @description call single website tech stack analyze
 * @param { string } url - analyze single website stack
 * @returns { Promise<void> } - return async results single web
 * 
 */
async function singleStack(url) {
  const wappalyzer = await new Wappalyzer;

  const p = new Table({
    columns: [
      {
        name: "techName",
        alignment: "left",
        color: "cyan"
      },
      {
        name: "techWebsite",
        alignment: "left",
        color: "green"
      },
      {
        name: "techCategories",
        alignment: "left",
        color: "cyan"
      }
    ]

  });

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

    console.info(green(textSync(url)));

    p.addRows(stackResult);

    p.printTable();
  } catch (err) {
    console.error(red(err.message));
  }

  await wappalyzer.destroy();
}

module.exports = singleStack;
