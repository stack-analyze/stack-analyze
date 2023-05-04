// test module
import test from "node:test";

// function test modules
import single from "./single.js";
import multiple from "./multiple.js";
import pagespeed from "./pageSpeed.js";
import githubInfo from "./githubinfo.js";
import animeSearch from "./githubinfo.js";
import hardwareTools from "./hardware.js";
import cryptoMarket from "./crypto.js";
import bitlyInfo from "./bitly.js";
import movieDB from "./moviesInfo.js";
import twitchInfo from "./twitch.js";
import scrape from "./scraping.js";
import bundlephobia from "./bundlephobia.js";

// github info
test('github info', async () => await githubInfo("faztweb"));

// anime search
test('anime search', async () => await animeSearch("naruto"));

// hardware
test('cpuInfo', async () => await hardwareTools.cpuInfo());

test('ramMemInfo', async () => await hardwareTools.ramMemInfo());

test('osDetail', async () => await hardwareTools.osDetail());

test('diskInfo', async () => await hardwareTools.diskInfo());

test('displayInfo', async () => await hardwareTools.displayInfo());

test('controllerInfo', async () => await hardwareTools.controllerInfo());

test('biosInfo', async () => await hardwareTools.biosInfo());

// crypto market
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

// single stack
test('single stack', async () => await single("http://example.com"));

// multiple stack
test('multiple stack', async () => await multiple(["http://example.com", "https://www.wappalyzer.com/"]));

// pagespeed
test('desktop speed', async () => await pagespeed("http://example.com"));
