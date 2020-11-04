// module
const axios = require("axios").default;

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
        console.info(`\x1b[31mDesktop Result ${movil}/100 || bad\x1b[0m`)
        break;
      case (movil === 50 || movil <= 89):
        console.info(`\x1b[33mDesktop Result ${movil}/100 || decent\x1b[0m`)
        break;
      case (movil >= 90 || movil === 100):
        console.info(`\x1b[32mDesktop Result ${movil}/100 || excelent\x1b[0m`)
        break;
      default:
        console.info(`\x1b[35mDesktop Result ${movil}/100 || undifined\x1b[0m`)
        break;
    }
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
        console.info(`\x1b[31mDesktop Result ${desktop}/100 || bad\x1b[0m`)
        break;
      case (desktop === 50 || desktop <=89):
        console.info(`\x1b[33mDesktop Result ${desktop}/100 || decent\x1b[0m`)
        break;
      case (desktop >=90 || desktop === 100):
        console.info(`\x1b[32mDesktop Result ${desktop}/100 || excelent\x1b[0m`)
        break;
      default:
        console.info(`\x1b[35mDesktop Result ${desktop}/100 || undifined\x1b[0m`)
        break;
    }
  } catch (err) {
    console.error("\x1b[31m", err.message, "\x1b[0m");
  }
};

module.exports = {
  mobile,
  desktop
};
