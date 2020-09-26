const Wappalyzer = require("wappalyzer");

const multiple = async (urls) => {
  let testReturn;
  const wappalyzer = await new Wappalyzer();

  try {
    await wappalyzer.init()

    const results = await Promise.all(
      urls.map(async (url) => ({
        url,
        stack: await wappalyzer.open(url).analyze()
      })))

    testReturn = results;
    
  } catch (err) {
    testReturn = err;
  }
  await wappalyzer.destroy();
  return testReturn;
}

module.exports = multiple;
