// module
const Wappalyzer = require("wappalyzer");

async function single (url) {
  let testReturn;
  const wappalyzer = await new Wappalyzer;

  try {
    await wappalyzer.init();

    const { technologies } = await wappalyzer.open(url).analyze()

    testReturn = technologies;
  } catch (err) {
    testReturn = err.message;
  }

  await wappalyzer.destroy();
  return testReturn;
}

module.exports = single;
