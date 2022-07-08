const axios = require("axios").default;

const cryptoMarket = async () => {
  let run;
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

    run = data;
  } catch (err) {
    run = err.message;
  }
};

module.exports = cryptoMarket;