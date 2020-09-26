const axios = require("axios").default

const mobile = async (url) => {
  let testReturn;
  const res = await axios.get(
    `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&key=AIzaSyBEDaW4FxSZ2s1vz5CdD5Ai6PGZGdAzij0&strategy=mobile`
  )
  
  try {
    const movil = res.data.lighthouseResult.categories.performance.score * 100

    testReturn = movil;
  } catch (err) {
    testReturn = err;
  }
  return testReturn;
}

const desktop = async (url) => {
  let testReturn;
  const res = await axios.get(
    `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&key=AIzaSyBEDaW4FxSZ2s1vz5CdD5Ai6PGZGdAzij0&strategy=desktop`
  ) 

  try {
    const desktop = res.data.lighthouseResult.categories.performance.score * 100

    testReturn = desktop;
  } catch (err) {
    testReturn =  err.message;
  }
  return testReturn;
}

module.exports = {
  mobile,
  desktop
}
