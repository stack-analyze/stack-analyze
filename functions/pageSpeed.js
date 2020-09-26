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
      case (movil <=0 || movil <=49):
        console.info(`\x1b[31mresultado en movil es: ${movil} malo\n`);
        break;
      case (movil <=50 || movil <=89):
        console.info(`\x1b[33mresultado en movil es: ${movil} decente\n`);
        break;
      case (movil >=90 || movil ===100):
        console.info(`\x1b[32mresultado en movil es: ${movil} excelente\n`);
        break;
      default:
        console.info(`\x1b[35mresultado indefinido en movil ${movil}\n`);
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
      case (desktop <= 0 || desktop <=49):
        console.info(`\x1b[31mresultado en ordenador es: ${desktop} malo\x1b[0m\n`);
        break;
      case (desktop <=50 || desktop <=89):
        console.info(`\x1b[33mresultado en ordenador es: ${desktop} decente\x1b[0m\n`);
        break;
      case (desktop >=90 || desktop === 100):
        console.info(`\x1b[32mresultado en ordenador es: ${desktop} excelente\x1b[0m\n`);
        break;
      default:
        console.info(`\x1b[35mresultado indefinido en ordenador ${desktop}\x1b[0m\n`);
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
