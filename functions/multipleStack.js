// modules
const { textSync } = require("figlet");
const Wappalyzer = require("wappalyzer");
const { red, green } = require("colors");
const { Table } = require("console-table-printer");

/**
 *
 * @description call multiple websites tech stack analyze
 * @param { string[] } urls - tech analyze in multiples websites
 * @returns { Promise<void> } - async results in multiples websites
 * 
 */
const multipleStack = async (urls) => {
  const wappalyzer = await new Wappalyzer();

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

    const results = await Promise.all(
      urls.map(async (url) => {
        const { technologies } = await wappalyzer.open(url).analyze();

        return {
          url,
          stack: technologies
        };
      }));

    console.info("multiple websites tech stack \n");
    console.group();
    // loop web site tech stack
    for (const result of results) {
      console.info(green(textSync(result.url, "Small")));
      console.group();
      p.addRows(result.stack.map(({ name, website, categories }) => ({
        techName: name,
        techWebsite: website,
        techCategories: categories.map(({name}) => name).join(", ")
      })));
      p.printTable();
      console.groupEnd();
    }
  } catch (err) {
    console.error(red(err.message));
  }

  await wappalyzer.destroy();
};

module.exports = multipleStack;
