import axios from "axios";
import { printTable } from "console-table-printer";
import colors from "colors";

/**
 * 
 * @param {string} country 
 */
const getStations = async (country) => {
  try {
    const { data } = await axios.get(`https://de1.api.radio-browser.info/json/stations/bycountry/${country}`);

    const totalStationsList = Array.from(Array(20), () => data[Math.floor(Math.random() * data.length)])

    const finalStationsList = totalStationsList.map(({ name, state, codec }) => ({
      name, state: state || "unknown", codec,
    }));

    finalStationsList.length === 0 ? console.warn("no stations".yellow) : printTable(finalStationsList);
  } catch (err) {
    console.error(colors.red(err));
  }
};

export default getStations;
