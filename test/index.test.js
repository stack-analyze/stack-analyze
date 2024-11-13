// test module
import test from "node:test";

// function test modules
import animeSearch from "./animeinfo.js";
import bitlyInfo from "./bitly.js";
import bundlephobia from "./bundlephobia.js";
import cryptoMarket from "./crypto.js";
import githubInfo from "./githubinfo.js";
import hardwareTools from "./hardware.js";
import movieDB from "./moviesInfo.js";
import multiple from "./multiple.js";
import pagespeed from "./pageSpeed.js";
import pokemonInfo from "./pokemon.js";
import single from "./single.js";
import scrape from "./scraping.js";
import twitchInfo from "./twitch.js";
import cssValidate from "./cssValidator.js";
import deezer from "./deezer.js";
import potterSearch from "./potterSearch.js"

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

// css validate
test('css validate', async () => await cssValidate("http://example.com"));

// bundlephobia
test('npm pkg info', async () => await bundlephobia('react'));

// single stack
test('single stack', async () => await single("http://example.com"));

// multiple stack
test('multiple stack', async () => await multiple(["http://example.com", "https://www.wappalyzer.com/"]));

// pagespeed
test('desktop speed', async () => await pagespeed("http://example.com"));

/* pokemon info */
test('pokemon-id', async () => pokemonInfo(55)) // based in pokeID
test('pokemon-name', async () => pokemonInfo('pikachu')) // based in pokename

// deezer search
test('deezer', async () => await deezer("eminem"));

// potter search
test('potter search', async () => await potterSearch("potter"));
