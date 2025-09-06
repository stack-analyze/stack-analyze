import axios from "axios";
import colors from "colors";

/**
 * @async
 * @returns {Promise<void>}
 */
async function getSwiftQuotes() {
  try {
    const { data } = await axios.get("https://taylorswiftapi.onrender.com/get");

    console.info(`"${data.quote}" \n album: ${data.album} song: ${data.song}`);

  } catch (err) {
    console.error(colors.red(err.message));
  }
}

export { getSwiftQuotes };
