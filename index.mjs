// modules
import axios from "axios";
import CoinGecko from "coingecko-api";
import {
  cpu,
  mem,
  osInfo,
  diskLayout,
  graphics,
  bios
} from "systeminformation";
import Wappalyzer from "wappalyzer";

// init coingecko api
const CoinGeckoClient = new CoinGecko();

/**
 * @typedef {Object} anime
 * @property {string} anime.query
 * @property {function(data): void} anime.results
 * 
 * @typedef {Object} bitly
 * @property {string} bitly.link
 * @property {string} bitly.token
 * @property {function(data): void} bitly.results
 * 
 * @typedef {Object} github
 * @property {string} github.user
 * @property {string} github.results
 * 
 * @typedef {Object} movie
 * @property {string} movie.api_key
 * @property {string} movie.query
 * @property {function(data): void} movie.results
 * 
 * @typedef {Object} multiple
 * @property {string[]} multiple.urls
 * @property {function(data): void} multiple.results
 * 
 * @typedef {Object} stack
 * @property {string} stack.urls
 * @property {function(data): void} stack.results
 * 
 * @typedef {Object} twitch
 * @property {string} twitch.query
 * @property {string} twitch.token
 * @property {string} twitch.clientID
 * @property {function(data): void} twitch.results
 */

/**
 * @param {anime} {query, results}
 * @returns {Promise<void>}
 */
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

/**
 * @param {bitly} {link, token, results}
 * @returns {Promise<void>}
 */
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
 * @param {function(data): void} callback
 * @returns { Promise<void> } - return results search
 */
const cryptoMarket = async (callback) => {
  try {
    // start crypto
    const coinData = await CoinGeckoClient.coins.markets({
      per_page: 10
    });

    // map coinData
    callback(coinData.data);
  } catch (err) { callback(err); }
};

/**
 *
 * @param {github} {user, results}
 * @returns {Promise<void>}
 */
async function githubInfo({ user, results }) {
  try {
    const { data } = await axios.get(`https://api.github.com/users/${user}`);

    results(data);
  } catch (err) { results(err); }
}

/**
 *
 * @param {function(data): void} callback
 * @returns {Promise<void>}
 */
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

/**
 *
 * @param {function(data): void} callback
 * @returns {Promise<void>}
 */
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

/**
 *
 * @param {function(data): void} callback
 * @returns {Promise<void>}
 */
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

/**
 *
 * @param {function(data): void} callback
 * @returns {Promise<void>}
 */
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

/**
 *
 * @param {function(data): void} callback
 * @returns {Promise<void>}
 */
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

/**
 *
 * @param {function(data): void} callback
 * @returns {Promise<void>}
 */
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

/**
 *
 * @param {function(data): void} callback
 * @returns {Promise<void>}
 */
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

/**
 * @param {movie} {api_key, query, results}
 * @returns {Promise<void>} void results
 */
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

/**
 * @param {multiple} {urls, results}
 * @returns {Promise<void>}
 */
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

/**
 * @param {stack} {url, results}
 * @returns {Promise<void>}
 */
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

/**
 * @param {stack} {url, results}
 * @returns {Promise<void>}
 */
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

/**
 *
 * @param {twitch} { query, token, clientID, results }
 * @returns {Promise<void>}
 */
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

// exports
export {
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
  twitchInfo
};
