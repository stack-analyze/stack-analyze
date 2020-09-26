// module
const Wappalyzer = require("wappalyzer");

async function single (url) {
  let testReturn;
  const wappalyzer = await new Wappalyzer;

  try {
    await wappalyzer.init();

    const results = await wappalyzer.open(url).analyze()

    testReturn = results.technologies;
  } catch (err) {
    testReturn = err;
  }

  await wappalyzer.destroy();
  return testReturn;
}

module.exports = single;
