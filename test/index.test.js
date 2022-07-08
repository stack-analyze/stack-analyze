// test modules
const single = require("./single");
const multiple = require("./multiple");
const pageSpeed = require("./pageSpeed");
const githubInfo = require("./githubinfo");
const animeSearch = require("./githubinfo");
const {
  cpuInfo,
  ramMemInfo,
  osDetail,
  diskInfo,
  controllerInfo,
  displayInfo,
  biosInfo
} = require("./hardware");
const cryptoMarket = require("./crypto");
const bitlyInfo = require("./bitly");
const movieDB = require("./moviesInfo");
const twitchInfo = require("./twitch");
const scrape = require("./scraping");

test('single stack', async () => await single("http://example.com"), 34000);

test('multiple stack', async () => await multiple(["http://example.com", "https://www.wappalyzer.com/"]), 40000);

test('desktop speed', async () => await pageSpeed("http://example.com"), 30000);

test('github info', async () => await githubInfo("faztweb"));

test('anime search', async () => await animeSearch("naruto"));

test('cpuInfo', async () => await cpuInfo());

test('ramMemInfo', async () => await ramMemInfo());

test('osDetail', async () => await osDetail());

test('diskInfo', async () => await diskInfo());

test('displayInfo', async () => await displayInfo());

test('controllerInfo', async () => await controllerInfo());

test('biosInfo', async () => await biosInfo());

test('crypto market', async () => await cryptoMarket());

// using fake token
test('bitly info', async () => await bitlyInfo('bit.ly/onlyfans-rougekamcosplay', 'AAAAAAAAAAAAAAAAAAAAAFnz2wAAAAAACOxyz'));

// using fake api
test('movies info', async () => await movieDB('AAAAAAAAAAAAAAAAAAAAAFnz2wAAAAAACOxyz', 'dragonball'));

// fake twitch token
test('twitch info', async () => await twitchInfo('example', 'AAAAAAAAAAAAAAAAAAAAAFnz2wAAAAAACOxyz'))

/* web scraping */
const {
  title,
  images,
  metadata,
  headings,
  table_heading,
  table_data,
  links,
  cites
} = scrape('https://example.com');

test('title', async () => await title());

test('images', async () => await images());

test('metadata', async () => await metadata());

test('headings', async () => await headings());

test('table heading', async () => await table_heading());

test('table data', async () => await table_data());

test('links', async () => await links());

test('cites', async () => await cites());
