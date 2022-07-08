// modules
const axios = require("axios").default;
const {
  cpu,
  mem,
  osInfo,
  diskLayout,
  graphics,
  bios
} = require("systeminformation");
const Wappalyzer = require("wappalyzer");
const { load } = require("cheerio");

const animeSearch = async ({ query, results }) => {
  /* error manager */
  try {
    // call api
    const { data } = await axios.get("https://api.jikan.moe/v3/search/anime", {
      params: {
        q: query,
        limit: 10
      }
    });

    results(data.results);

  } catch (err) { results(err); }
};

const bitlyInfo = async ({ link, token, results }) => {
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

    results(data);
  } catch (err) { results(err); }
};

/**
 *
 * @descripiton call the crypto market list
 * @param {function(any): void} callback
 * @returns { Promise<void> } - return results search
 */
const cryptoMarket = async (callback) => {
  try {
    // start crypto
    const { data } = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets", {
      params: {
        vs_currency: "usd",
        per_page: 10
      }
    }
    );

    // map coinData
    callback(data);
  } catch (err) { callback(err); }
};

async function githubInfo({ user, results }) {
  try {
    const { data } = await axios.get(`https://api.github.com/users/${user}`);

    results(data);
  } catch (err) { results(err); }
}

async function cpuInfo(callback) {
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
    callback({
      manufacturer,
      brand,
      speed,
      cores,
      physicalCores,
      processors,
      vendor,
      family,
      model
    });
  } catch (err) { callback(err); }
}

async function ramMemInfo(callback) {
  try {
    const {
      total,
      free,
      used,
      active,
      available
    } = await mem();

    // show results
    callback({
      total_mem: `${(total / 1073741824).toFixed(2)} GB`,
      free_mem: `${(free / 1073741824).toFixed(2)} GB`,
      used_mem: `${(used / 1073741824).toFixed(2)} GB`,
      active_mem: `${(active / 1073741824).toFixed(2)} GB`,
      available_mem: `${(available / 1073741824).toFixed(2)} GB`
    });
  } catch (err) { callback(err); }
}

async function osDetail(callback) {
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
    callback({
      hostname,
      platform,
      distro,
      release,
      kernel,
      arch,
      serial,
      uefi
    });
  } catch (err) { callback(err); }
}

async function diskInfo(callback) {
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

    callback(disksList);

  } catch (err) { callback(err); }
}

async function controllerInfo(callback) {
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

    callback(controllersList);
  } catch (err) { callback(err); }
}

async function displayInfo(callback) {
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

    callback(displayList);
  } catch (err) { callback(err); }
}

async function biosInfo(callback) {
  try {
    const {
      releaseDate,
      vendor,
      revision,
      version
    } = await bios();

    callback({ releaseDate, vendor, revision, version });
  } catch (err) { callback(err); }
}

const movieDB = async ({ api_key, query, results }) => {
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

    results(movieData);
  } catch (err) { results(err); }
};

async function multipleStack({ urls, results }) {
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
  results(result);
}

const pageSpeed = async ({ url, results }) => {
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

    results({ mobile, desktop });
  } catch (err) { results(err); }
};

async function singleStack({ url, results }) {
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
  } catch (err) { results(err); }

  await wappalyzer.destroy();
  results(result);
}

async function twitchInfo({ query, token, clientID, results }) {
  try {
    const { data: twitchData } = await axios.get(`https://api.twitch.tv/helix/users?login=${query}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Client-Id": clientID
        }
      });

    results(twitchData.data);
  } catch (err) { results(err); }
}

function scrape(url) {
  let $;

  const scraping = axios.create({
    baseURL: url
  });

  const title = async (callback) => {
    try {
      const { data } = await scraping.get("");
      $ = load(data);

      callback($("title").text());
    } catch (err) { console.error(colors.red(err.message)); }
  };

  const images = async (callback) => {
    try {
      const { data } = await scraping.get("");
      $ = load(data);

      const imgs = $("img").map((i, el) => ({
        imagePath: $(el).attr("src"),
        imageTitle: $(el).attr("alt")
      })).toArray();

      callback(imgs);
    } catch (err) { console.error(colors.red(err.message)); }
  };

  const metadata = async (callback) => {
    try {
      const { data } = await scraping.get("");
      $ = load(data);

      const metadataList = $("meta").map((i, el) => ({
        metaInfo: $(el).attr("name"),
        metaContent: $(el).attr("content")
      })).toArray()
        .filter(({ metaInfo }) => metaInfo !== undefined);

      callback(metadataList);
    } catch (err) { console.error(colors.red(err.message)); }
  };

  const headings = async (callback) => {
    try {
      const { data } = await scraping.get("");
      $ = load(data);

      const headingList = $("h1, h2, h3, h4, h5, h6").map((i, el) => ({
        headingTag: $(el).prop("tagName"),
        headingText: $(el).text()
      })).toArray();

      callback(headingList);
    } catch (err) { console.error(colors.red(err.message)); }
  };

  const table_heading = async (callback) => {
    try {
      const { data } = await scraping.get("");
      $ = load(data);

      const tableHeadList = $("th").map((i, el) => ({
        headingRow: i,
        text: $(el).text()
      })).toArray();

      callback(tableHeadList);
    } catch (err) { console.error(colors.red(err.message)); }
  };

  const table_data = async (callback) => {
    try {
      const { data } = await scraping.get("");
      $ = load(data);

      const tableColumnList = $("td").map((i, el) => $(el).text()).toArray();

      callback(tableColumnList);
    } catch (err) { console.error(colors.red(err.message)); }
  };


  const links = async (callback) => {
    try {
      const { data } = await scraping.get("");
      $ = load(data);

      const linkList = $("a").map((i, el) => ({
        url: $(el).attr("href"),
        text: $(el).text()
      })).toArray()
        .filter(({ url }) => url.indexOf("#") !== 0);

      callback(linkList);
    } catch (err) { console.error(colors.red(err.message)); }
  };

  const cites = async (callback) => {
    try {
      const { data } = await scraping.get("");
      $ = load(data);

      const citeList = $("q, blockquote").map((i, el) => ({
        citeTag: $(el).prop("tagName"),
        citeLink: $(el).attr("cite"),
        citeText: $(el).text()
      })).toArray();
      
      callback(citeList);
    } catch (err) { console.error(colors.red(err.message)); }
  };

  return {
    title,
    images,
    metadata,
    headings,
    table_heading,
    table_data,
    links,
    cites
  };
}

// exports
module.exports = {
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
  singleStack,
  twitchInfo,
  scrape
};
