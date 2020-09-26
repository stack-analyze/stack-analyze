// test modules
const single = require("./single");
const multiple = require("./multiple");
const { desktop, mobile } = require("./pageSpeed");

test('single stack', async () => await single("http://example.com"), 34000)

test('multiple stack', async () => await multiple(["http://example.com", "https://www.wappalyzer.com/"]), 40000)

test('desktop speed', async () => await desktop("http://example.com"), 30000)

test('mobile speed', async () => await mobile("http://example.com"), 30000)
