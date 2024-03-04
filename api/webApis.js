import Wappalyzer from "wapalyzer";
import axios from "axios";

const wappalyzer = new Wappalyzer();

/** 
 * It takes a strategy as a parameter and returns a promise that resolves to the response from the
 * Google PageSpeed Insights API
 * @typedef {"mobile"|"desktop"} StrategyOpt
 * @async
 * @param {string} url
 * @param {StrategyOpt} strategy
*/
const pagespeedApi = async (url, strategy) => await axios.get("https://www.googleapis.com/pagespeedonline/v5/runPagespeed", {
  params: {
    url,
    key: "AIzaSyBEDaW4FxSZ2s1vz5CdD5Ai6PGZGdAzij0",
    strategy
  }
});

export {
  wappalyzer,
  pagespeedApi
};
