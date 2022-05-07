// modules
import axios from "axios";
import { format } from "timeago.js";
import colors from "colors";

import coinTable from "../models/cryptoTables.js";

/*
 *
 * @descripiton call the crypto market list
 * @returns { Promise<void> } - return results search
 *
 */
const cryptoMarket = async () => {
  try {
    // start crypto
    const { data } = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",{
        params: {
          vs_currency: "usd",
          per_page: 10
        }
      }
    );

    // map coinData
    const coinList = data.map(({
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
        ? colors.green(price_change_percentage_24h) 
        : colors.red(price_change_percentage_24h),
      lastUpdated: format(last_updated)
    }));

    coinTable.addRows(coinList);

    // print table
    coinTable.printTable();
  } catch (err) {
    // print err message
    console.error(colors.red(err.message));
  }
};

export default cryptoMarket;
