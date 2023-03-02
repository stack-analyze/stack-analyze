// test modules
const single = require("./single");
const multiple = require("./multiple");
const pagespeed = require("./pageSpeed");
const githubInfo = require("./githubinfo");
const animeSearch = require("./githubinfo");
const {
  cpuInfo, ramMemInfo, osDetail, diskInfo,
  controllerInfo, displayInfo, biosInfo
} = require("./hardware");
const cryptoMarket = require("./crypto");
const bitlyInfo = require("./bitly");
const movieDB = require("./moviesInfo");
const twitchInfo = require("./twitch");
const scrape = require("./scraping");
const bundlephobia = require("./bundlephobia");

test('single stack', async () => await single("http://example.com"), 34000);

test('multiple stack', async () => await multiple(["http://example.com", "https://www.wappalyzer.com/"]), 40000);

test('desktop speed', async () => await pagespeed("http://example.com"), 30000);

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

// web scraping
test('title', async () => await scrape('https://example.com', 'title'));

test('images', async () => await scrape('https://example.com', 'images'));

test('metadata', async () => await scrape('https://example.com', 'metadata'));

test('headings', async () => await scrape('https://example.com', 'headings'));

test('table heading', async () => await scrape('https://example.com', 'table_heading'));

test('table data', async () => await scrape('https://example.com', 'table_data'));

test('links', async () => await scrape('https://example.com', 'links'));

test('cites', async () => await scrape('https://example.com', 'cites'));

// bundlephobia
test('npm pkg info', async () => await bundlephobia('react'));
