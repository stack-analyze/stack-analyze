const axios = require("axios").default;

const pageSpeed = async (url) => {
  const testReturn = [];
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
  
  try {
    const movil = resMobile.data.lighthouseResult.categories.performance.score * 100;
    const desktop = resDesktop.data.lighthouseResult.categories.performance.score * 100;

    testReturn.push(movil);
    testReturn.push(desktop);
  } catch (err) {
    testReturn.push(err.message);
  }
  return testReturn;
};

module.exports = pageSpeed;
