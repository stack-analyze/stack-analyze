import axios from "axios";
import colors from "colors";
import { stackSave } from "../utils.js";

/**
 * @description kilobyte convert for bundlephobia pkg info
 * @param {number} size - pkg sixe
 * @returns {string} - result converter
 */
const kilobyteConvert = (size) => (size < 1024 ? `${size} B` : `${size / 1024} KB`);

/**
 * @description get info of npm package
 * @param {string} pkg
 * @async
 * @returns { Promise<void> } - return result bundlephobia info
 */
export default async function bundlephobia (pkg) {
  try {
    const { data } = await axios.get("https://bundlephobia.com/api/size", {
      params: { package: pkg }
    });

    console.table({
      module_name: data.name,
      module_version: data.version,
      module_repo: data.repository,
      module_size: kilobyteConvert(data.size),
      module_gzip: kilobyteConvert(data.gzip),
    });

    stackSave(`${pkg}-pkg-info.json`, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error(colors.red(err.message));
  }
}
