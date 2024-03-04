import Wappalyzer from "wapalyzer";

const multiple = async (urls) => {
  let testReturn;
  const wappalyzer = await new Wappalyzer();

  try {
    await wappalyzer.init()

    testReturn = await Promise.all(
      urls.map(async (url) => {
        const { technologies } = await (await wappalyzer.open(url)).analyze();

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

export default multiple;
