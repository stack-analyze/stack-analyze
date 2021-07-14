// modules
const axios = require("axios").default;
const cliProgress = require("cli-progress");

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
  const movil = Math.round(resMobile.data.lighthouseResult.categories.performance.score * 100);
  const desktop = Math.round(resDesktop.data.lighthouseResult.categories.performance.score * 100);

  // result pagespeed bar color
  const multibar = new cliProgress.MultiBar({
    format: " {bar} | {text} | {value}/{total}",
    clearOnComplete: false,
    hideCursor: true,
    barCompleteChar: "\u2588",
    barIncompleteChar: "\u2591",
  }, cliProgress.Presets.rect);
  
  // add bars
  const b1 = multibar.create(100, 0);
  const b2 = multibar.create(100, 0);
  
  try {

    // valid results
    switch (true) {
      case (movil === 1 || movil <= 49):
      case (desktop === 1 || desktop <=49):
        b1.update(movil, {text: "mobile result".red});
        b2.update(desktop, {text: "desktop result".red});
        break;
      case (movil === 50 || movil <= 89):
      case (desktop === 50 || desktop <=89):
        b1.update(movil, {text: "mobile result".yellow});
        b2.update(desktop, {text: "desktop result".yellow});
        break;
      case (movil >= 90 || movil === 100):
      case (desktop >=90 || desktop === 100):
        b1.update(movil, {text: "mobile result".green});
        b2.update(desktop, {text: "desktop result".green});
        break;
      default:
        b1.update(movil, {text: "mobile result"});
        b2.update(desktop, {text: "desktop result"});
        break;
    }
    
    // stop all bars
    multibar.stop();
  } catch (err) {
    console.error(err.message.red);
  }
};

module.exports = pageSpeed;
