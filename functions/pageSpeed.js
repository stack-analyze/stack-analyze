// modules
import { default as axios } from "axios";
import { SingleBar } from "cli-progress";
import colors from "colors";

/**
 * @description async function mobile website pagespeed
 * @param { string } url - website from pagespeed mobile results
 * @returns { Promise<void> } - return async mobile results
 */
const pageSpeed = async (url) => {
  const resMobile = await axios.get("https://www.googleapis.com/pagespeedonline/v5/runPagespeed", {
    params: {
      url,
      key: "AIzaSyBEDaW4FxSZ2s1vz5CdD5Ai6PGZGdAzij0",
      strategy: "mobile"
    }
  });

  const resDesktop = await axios.get("https://www.googleapis.com/pagespeedonline/v5/runPagespeed", {
    params: {
      url,
      key: "AIzaSyBEDaW4FxSZ2s1vz5CdD5Ai6PGZGdAzij0",
      strategy: "desktop"
    }
  });

  // extract results
  const mobile = Math.round(resMobile.data.lighthouseResult.categories.performance.score * 100);
  const desktop = Math.round(resDesktop.data.lighthouseResult.categories.performance.score * 100);

  // result pagespeed bar color
  let b1;
  let b2;

  try {

    // valid results
    switch (true) {
      case (mobile === 1 || mobile <= 49):
      case (desktop === 1 || desktop <= 49):
        b1 = new SingleBar({
          format: "Mobile Result | {bar} || {value}/{total} || bad".red,
          barCompleteChar: "\u2588",
          barIncompleteChar: "\u2591",
          hideCursor: true
        });
        b2 = new SingleBar({
          format: "Desktop Result | {bar} || {value}/{total} || bad".red,
          barCompleteChar: "\u2588",
          barIncompleteChar: "\u2591",
          hideCursor: true
        });
        break;
      case (mobile === 50 || mobile <= 89):
      case (desktop === 50 || desktop <= 89):
        b1 = new SingleBar({
          format: "Mobile Result | {bar} || {value}/{total} || decent".yellow,
          barCompleteChar: "\u2588",
          barIncompleteChar: "\u2591",
          hideCursor: true
        });
        b2 = new SingleBar({
          format: "Desktop Result | {bar} || {value}/{total} || decent".yellow,
          barCompleteChar: "\u2588",
          barIncompleteChar: "\u2591",
          hideCursor: true
        });
        break;
      case (mobile >= 90 || mobile === 100):
      case (desktop >= 90 || desktop === 100):
        b1 = new SingleBar({
          format: "Mobile Result | {bar} || {value}/{total} || excelent".green,
          barCompleteChar: "\u2588",
          barIncompleteChar: "\u2591",
          hideCursor: true
        });
        b2 = new SingleBar({
          format: "Desktop Result | {bar} || {value}/{total} || excelent".green,
          barCompleteChar: "\u2588",
          barIncompleteChar: "\u2591",
          hideCursor: true
        });
        break;
      default:
        b1 = new SingleBar({
          format: "Mobile Result | {bar} || {value}/{total} || undifined",
          barCompleteChar: "\u2588",
          barIncompleteChar: "\u2591",
          hideCursor: true
        });
        b2 = new SingleBar({
          format: "Desktop Result | {bar} || {value}/{total} || undifined",
          barCompleteChar: "\u2588",
          barIncompleteChar: "\u2591",
          hideCursor: true
        });
        break;
    }
    
    // initials bars
    b1.start(100, 0);
    b2.start(100, 0);
    
    b1.update(mobile);
    b2.update(desktop);

    // stop all bars
    b1.stop();
    b2.stop();
  } catch (err) {
    console.error(colors.red(err.message));
  }
};

export default pageSpeed;
