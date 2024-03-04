// module
import Wappalyzer from "wapalyzer";

export default async function single (url) {
  let testReturn;
  const wappalyzer = new Wappalyzer;

  try {
    await wappalyzer.init();

    const { technologies } = await (await wappalyzer.open(url)).analyze()

    testReturn = technologies;
  } catch (err) {
    testReturn = err.message;
  }

  await wappalyzer.destroy();
  return testReturn;
}
