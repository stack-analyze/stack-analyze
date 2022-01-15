// modules
const axios = require("axios").default;
const CoinGecko = require("coingecko-api");
const {
  cpu,
  mem,
  osInfo,
  diskLayout,
  graphics,
  bios
} = require("systeminformation");
const Wappalyzer = require("wappalyzer");

// init coingecko api
const CoinGeckoClient = new CoinGecko();

// functions

const animeSearch = async (query) => {
  /* error manager */
  try {
    // call api
    const { data } = await axios.get("https://api.jikan.moe/v3/search/anime", {
      params: {
        q: query,
        limit: 10
      }
    });

    return data.results;

  } catch (err) { return err; }
};

const bitlyInfo = async (link, token) => {
  try {
    const { data } = await axios.post(
      "https://api-ssl.bitly.com/v4/expand",
      {
        bitlink_id: link
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    return data;
  } catch (err) { return err; }
};

/*
 *
 * @descripiton call the crypto market list
 * @returns { Promise<void> } - return results search
 *
 */
const cryptoMarket = async () => {
  try {
    // start crypto
    const coinData = await CoinGeckoClient.coins.markets({
      per_page: 10
    });

    // map coinData
    return coinData.data;
  } catch (err) { return err; }
};

async function githubInfo(user) {
  try {
    const { data } = await axios.get(`https://api.github.com/users/${user}`);

    return data;
  } catch (err) { return err; }
}

async function cpuInfo() {
  try {
    const {
      manufacturer,
      brand,
      speed,
      cores,
      physicalCores,
      processors,
      vendor,
      family,
      model
    } = await cpu();

    // show results
    return {
      manufacturer,
      brand,
      speed,
      cores,
      physicalCores,
      processors,
      vendor,
      family,
      model
    };
  } catch (err) { return err; }
}

async function ramMemInfo() {
  try {
    const {
      total,
      free,
      used,
      active,
      available
    } = await mem();

    // show results
    return {
      total_mem: `${(total / 1073741824).toFixed(2)} GB`,
      free_mem: `${(free / 1073741824).toFixed(2)} GB`,
      used_mem: `${(used / 1073741824).toFixed(2)} GB`,
      active_mem: `${(active / 1073741824).toFixed(2)} GB`,
      available_mem: `${(available / 1073741824).toFixed(2)} GB`
    };
  } catch (err) { return err; }
}

async function osDetail() {
  try {
    const {
      hostname,
      platform,
      distro,
      release,
      kernel,
      arch,
      serial,
      uefi
    } = await osInfo();

    // show results
    return {
      hostname,
      platform,
      distro,
      release,
      kernel,
      arch,
      serial,
      uefi
    };
  } catch (err) { return err; }
}

async function diskInfo() {
  try {
    const disks = await diskLayout();

    const disksList = disks.map(({
      type,
      name,
      vendor,
      size,
      interfaceType
    }) => ({
      type,
      name,
      vendor,
      diskSize: `${(size / 1073741824).toFixed(2)} GB`,
      interfaceType
    }));

    return disksList;

  } catch (err) { return err; }
}

async function controllerInfo() {
  try {
    const { controllers } = await graphics();

    const controllersList = controllers.map(({
      model,
      vendor,
      vram
    }) => ({
      model,
      vendor,
      vramSize: vram < 1024
        ? `${vram} MB`
        : `${(vram / 1024).toFixed(2)} GB`
    }));

    return controllersList;
  } catch (err) { return err; }
}

async function displayInfo() {
  try {
    const { displays } = await graphics();

    const displayList = displays.map(({
      model,
      main,
      connection,
      resolutionX,
      resolutionY
    }) => ({
      model,
      main,
      connection,
      resolutionX,
      resolutionY
    }));

    return displayList;
  } catch (err) { return err; }
}

async function biosInfo() {
  try {
    const {
      releaseDate,
      vendor,
      revision,
      version
    } = await bios();

    return { releaseDate, vendor, revision, version };
  } catch (err) { return err; }
}

const movieDB = async (api_key, query) => {
  try {
    const { data } = await axios.get("https://api.themoviedb.org/3/search/movie", {
      params: {
        api_key,
        query,
        page: 1
      }
    });

    const movieData = data.results
      .map(({
        title,
        original_language,
        popularity,
        vote_average,
        release_date
      }) => ({
        title,
        original_language,
        popularity,
        vote_average,
        release_date
      }))
      .sort((x, y) => {
        // date values
        const primaryDate = new Date(x.release_date);
        const secondaryDate = new Date(y.release_date);

        return primaryDate.getTime() - secondaryDate.getTime();
      })
      .filter(({ release_date }) => release_date !== undefined && release_date !== "");

    return movieData;
  } catch (err) { return err; }
};

async function multipleStack(urls) {
  let result;
  const wappalyzer = new Wappalyzer();
  try {
    await wappalyzer.init();
    result = await Promise.all(
      urls.map(async (url) => {
        const { technologies } = await wappalyzer.open(url).analyze();
        return {
          url,
          technologies
        };
      })
    );
  } catch (err) { result = err; }
  await wappalyzer.destroy();
  return result;
}

const pageSpeed = async (url) => {
  try {
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

    // extract results
    const mobile = Math.round(resMobile.data.lighthouseResult.categories.performance.score * 100);
    const desktop = Math.round(resDesktop.data.lighthouseResult.categories.performance.score * 100);

    return {mobile, desktop};
  } catch (err) { return err; }
};

async function singleStack(url) {
  const wappalyzer = await new Wappalyzer;

  let result;
  try {
    await wappalyzer.init();

    const { technologies } = await wappalyzer.open(url).analyze();

    result = technologies.map(({
      name,
      website,
      categories
    }) => ({
      techName: name,
      techWebsite: website,
      techCategories: categories.map(({ name }) => name).join(", ")
    }));
  } catch (err) { result = err; }

  await wappalyzer.destroy();
  return result;
}


// exports
exports = {
  animeSearch,
  bitlyInfo,
  cryptoMarket,
  githubInfo,
  controllerInfo,
  osDetail,
  diskInfo,
  displayInfo,
  biosInfo,
  cpuInfo,
  ramMemInfo,
  movieDB,
  multipleStack,
  pageSpeed,
  singleStack
};
