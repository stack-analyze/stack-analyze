// modules
import {default as axios} from "axios";
import { format } from "timeago.js";
import colors from "colors";

import { printTable } from "console-table-printer";

// currency format
import { currency } from "../utils.js";

/**
 * @descripiton call the crypto market list
 * @async
 * @returns { Promise<void> } - return results search
 */
export default async function cryptoMarket() {
  try {
    // start crypto
    const { data } = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets", {
        params: { vs_currency: "usd" }
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
      price: currency.format(current_price),
      priceChanged: `${price_change_percentage_24h.toFixed(2)} %`,
      lastUpdated: format(last_updated)
    }));

    // print table
    printTable(coinList.slice(0, 10));
  } catch (err) {
    // print err message
    console.error(colors.red(err.message));
  }
}
