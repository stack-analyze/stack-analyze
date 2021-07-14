// modules
const CoinGecko = require("coingecko-api");
const { format } = require("timeago.js");
const { red, green } = require("colors");
const { Table } = require("console-table-printer");

// init coingecko api
const CoinGeckoClient = new CoinGecko();

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
    const coinList = coinData.data.map(({
      symbol,
      name,
      current_price,
      price_change_percentage_24h,
      last_updated
    }) => ({
      symbol,
      name,
      price: current_price,
      priceChanged: price_change_percentage_24h > 0 
        ? green(price_change_percentage_24h) 
        : red(price_change_percentage_24h),
      lastUpdated: format(last_updated)
    }));

    // init table
    const coinTable = new Table({
      columns: [
        {
          name: "symbol",
          alignment: "left",
          color: "green"
        },
        {
          name: "name",
          alignment: "left",
          color: "white_bold"
        },
        {
          name: "price",
          alignment: "left",
          color: "yellow"
        },
        {
          name: "priceChanged",
          alignment: "left"
        },
        {
          name: "lastUpdated",
          alignment: "left",
          color: "magenta"
        }
      ]
    });

    coinTable.addRows(coinList);

    // print table
    coinTable.printTable();
  } catch (err) {
    // print err message
    console.error(red(err.message));
  }
};

module.exports = cryptoMarket;
