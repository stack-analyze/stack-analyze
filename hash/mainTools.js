// modules
import inquirer from "inquirer";
import figlet from "figlet";
import colors from "colors";

// analyze web
import singleStack from "../functions/singleStack.js";
import multipleStack from "../functions/multipleStack.js";

// pagespeed web
import pageSpeed from "../functions/pageSpeed.js";

/**
 * @type {{ single(): Promise<void>, multiple(): Promise<void>,  pagespeed(): Promise<void> }}
 */
const mainTools = {
  async single() {
    console.clear();
    const { url } = await inquirer.prompt({
      name: "url",
      message: "enter url for analyze the tech stack:"
    });

    url.indexOf("http") === 0
      ? singleStack(url)
      : console.error("please insert a URL with parameter http:// or https://".red);
  },
  async multiple() {
    console.clear();
    const { urls } = await inquirer.prompt({
      name: "urls",
      message: "enter URLs for analyze the tech stacks with whitespace without quotes example 'http://example.com https://nodejs.org': \n"
    });

    if (
      urls.match(/(http|https)/g) !== null ||
      urls.match(/(http|https)/g) >= 2
    ) {
      const websites = urls.split(" ");
      console.clear();
      multipleStack(websites);
    } else {
      console.error("please in each URL insert a website the parameter https:// or http://".red);
    }
  },
  async pagespeed() {
    console.clear();
    const { speedWeb } = await inquirer.prompt({
      name: "speedWeb",
      message: "insert URL for page speed analyze:"
    });

    if (speedWeb.indexOf("http") === 0) {
      console.clear();
      console.info(colors.green(figlet.textSync(speedWeb)));

      // start pagespeed results mobile
      figlet.textSync(speedWeb, "Small");
      pageSpeed(speedWeb);
    } else {
      console.error("please insert a URL with parameter https;// or http://".red);
    }
  }
};

// export
export default mainTools;
