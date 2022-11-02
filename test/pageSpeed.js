const axios = require("axios").default;

const apiQuery = async (url, strategy) => await axios.get("https://www.googleapis.com/pagespeedonline/v5/runPagespeed", {
  params: {
    url,
    key: "AIzaSyBEDaW4FxSZ2s1vz5CdD5Ai6PGZGdAzij0",
    strategy
  }
});

const pagespeed = async (url) => {
  const testReturn = [];

  try {
    const resMobile = await apiQuery(url, "mobile");

    const resDesktop = await apiQuery(url, "desktop");

    testReturn.push(resMobile.data.lighthouseResult.categories.performance.score * 100);
    testReturn.push(resDesktop.data.lighthouseResult.categories.performance.score * 100);
  } catch (err) {
    testReturn.push(err.message);
  }
  return testReturn;
};

module.exports = pagespeed;