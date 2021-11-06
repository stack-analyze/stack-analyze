// @ts-nocheck
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
movieDB = require("./moviesInfo");

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
