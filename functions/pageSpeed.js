// module
const axios = require("axios").default;
const cliProgress = require("cli-progress");

// result pagespeed bar color
let bar;

/**
 * @description async function mobile website pagespeed
 * @param { string } url - website from pagespeed mobile results
 * @returns { Promise<void> } - return async mobile results
 */
const mobile = async (url) => {
  const res = await axios.get(
    `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&key=AIzaSyBEDaW4FxSZ2s1vz5CdD5Ai6PGZGdAzij0&strategy=mobile`
  );
  
  try {
    const movil = res.data.lighthouseResult.categories.performance.score * 100;

    switch (true) {
      case (movil === 1 || movil <= 49):
        bar = new cliProgress.SingleBar({
          format: `Mobile Result | \x1b[31m{bar}\x1b[0m || {value}/{total} || bad`,
          barCompleteChar: "\u2588",
          barIncompleteChar: "\u2591",
          hideCursor: true
        });
        break;
      case (movil === 50 || movil <= 89):
        bar = new cliProgress.SingleBar({
          format: `Mobile Result | \x1b[33m{bar}\x1b[0m || {value}/{total} || decent`,
          barCompleteChar: "\u2588",
          barIncompleteChar: "\u2591",
          hideCursor: true
        });
        break;
      case (movil >= 90 || movil === 100):
        bar = new cliProgress.SingleBar({
          format: `Mobile Result | \x1b[32m{bar}\x1b[0m || {value}/{total} || excelent`,
          barCompleteChar: "\u2588",
          barIncompleteChar: "\u2591",
          hideCursor: true
        });
        break;
      default:
        bar = new cliProgress.SingleBar({
          format: `Mobile Result | \x1b[35m{bar}\x1b[0m || {value}/{total} undifined`,
          barCompleteChar: "\u2588",
          barIncompleteChar: "\u2591",
          hideCursor: true
        });
        break;
    }

    bar.start(100, 0);

    bar.update(movil);

    bar.stop();
  } catch (err) {
    console.error(err.message);
  }
};

/**
 * 
 * @description async function desktop website pagespeed
 * @param { string } url - website from pagespeed desktop
 * @return { Promise<void> } - return async desktop results
 *
 */
const desktop = async (url) => {
  const res = await axios.get(
    `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&key=AIzaSyBEDaW4FxSZ2s1vz5CdD5Ai6PGZGdAzij0&strategy=desktop`
  ); 

  try {
    const desktop = res.data.lighthouseResult.categories.performance.score * 100;

    switch (true) {
      case (desktop === 0 || desktop <=49):
        bar = new cliProgress.SingleBar({
          format: `Desktop Result | \x1b[31m{bar}\x1b[0m || {value}/{total} || bad`,
          barCompleteChar: "\u2588",
          barIncompleteChar: "\u2591",
          hideCursor: true
        });
        break;
      case (desktop === 50 || desktop <=89):
        bar = new cliProgress.SingleBar({
          format: `Desktop Result | \x1b[33m{bar}\x1b[0m || {value}/{total} || decent`,
          barCompleteChar: "\u2588",
          barIncompleteChar: "\2591",
          hideCursor: true
        });
        break;
      case (desktop >=90 || desktop === 100):
        bar = new cliProgress.SingleBar({
          format: `Desktop Result | \x1b[32m{bar}\x1b[0m || {value}/{total} || excelent`,
          barCompleteChar: "\u2588",
          barIncompleteChar: "\u2591",
          hideCursor: true
        });
        break;
      default:
        bar = new cliProgress.SingleBar({
          format: `Desktop Result | \x1b[35m{bar}\x1b[0m || {value}/{total} || undifined`,
          barCompleteChar: "\u2588",
          barIncompleteChar: "\u2591",
          hideCursor: true
        });
        break;
    }

    bar.start(100, 0);

    bar.update(desktop);

    bar.stop();
  } catch (err) {
    console.error("\x1b[31m", err.message, "\x1b[0m");
  }
};

module.exports = {
  mobile,
  desktop
};
