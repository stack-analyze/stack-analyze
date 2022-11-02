// modules
import { MultiBar, Presets } from "cli-progress";
import colors from "colors";

// pagespeed api
import { pagespeedApi } from "../api/webApis.js";

const maxScore = 100;

/**
  * It takes a score and a bar, and returns a color based on the score
  * @param {number} score - The score of the current test.
  * @returns {string} A function that takes two parameters, score and bar.
*/
const barColor = score => {
  const bar = "{bar}";

  switch (true) {
    case score === 1 || score <= 49:
      return bar.red;
    case score === 50 || score <= 89:
      return bar.yellow;
    case score >= 90 || score === maxScore:
      return bar.green;
    default:
      return bar.magenta;
  }
};

/**
 * @description async function mobile website pagespeed
 * @async
 * @param { string } url - website from pagespeed mobile results
 * @returns { Promise<void> } - return async mobile results
 */
export default async function pagespeed(url) {
  console.info(url.green);

  const multibar = new MultiBar({
    format: "{type} | {bar} | {value}/{total}",
    hideCursor: true,
    clearOnComplete: false
  }, Presets.legacy);

  try {
    // start api
    const { data: resMobile } = await pagespeedApi(url, "mobile");
    const { data: resDesktop } = await pagespeedApi(url, "desktop");

    // extract results
    const mobile = Math.round(resMobile.lighthouseResult.categories.performance.score * 100);
    const desktop = Math.round(resDesktop.lighthouseResult.categories.performance.score * 100);

    // result pagespeed color bar
    const b1 = multibar.create(maxScore, 0, { type: "mobile" }, {
      format: `{type} | ${barColor(mobile)} | {value}/{total}`
    });

    const b2 = multibar.create(maxScore, 0, { type: "desktop" }, {
      format: `{type} | ${barColor(desktop)} | {value}/{total}`
    });

    // initials bars
    b1.update(mobile);
    b2.update(desktop);

    // stop multibar
    multibar.stop();
  } catch (err) {
    console.error(colors.red(err.message));
  }
}
