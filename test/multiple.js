const Wappalyzer = require("wappalyzer");

const multiple = async (urls) => {
  let testReturn;
  const wappalyzer = await new Wappalyzer();

  try {
    await wappalyzer.init()

    testReturn = await Promise.all(
      urls.map(async (url) => {
        const { technologies } = await wappalyzer.open(url).analyze();

        return {
          url,
          technologies
        };
      }));
    
  } catch (err) {
    testReturn = err;
  }
  await wappalyzer.destroy();
  return testReturn;
}

module.exports = multiple;
