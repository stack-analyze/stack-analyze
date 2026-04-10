import axios from "axios";
import { printTable } from "console-table-printer";
import colors from "colors";

/**
 * 
 * @param {string} country 
 */
const getStations = async (country) => {
  try {
    const { data } = await axios.get(`https://de1.api.radio-browser.info/json/stations/bycountry/${country}`, {
      params: { limit: 20 }
    });

    const stations = data.map(({ name, state, codec }) => ({
      name, state: state || "unknown", codec,
    }));

    stations.length === 0 ? console.warn("no stations".yellow) : printTable(stations);
  } catch (err) {
    console.error(colors.red(err));
  }
};

export default getStations;
