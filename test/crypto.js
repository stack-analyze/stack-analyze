const CoinGecko = require("coingecko-api");

const CoinGeckoClient = new CoinGecko();

const cryptoMarket = async () => {
  let run;
  try {
    // start crypto
    const coinData = await CoinGeckoClient.coins.markets({
      per_page: 10
    });

    run = coinData.data;
  } catch (err) {
    run = err.message;
  }
};

module.exports = cryptoMarket;