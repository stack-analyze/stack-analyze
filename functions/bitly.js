// modules
import "../env/bitly.env.js";
import axios from "axios";
import { format } from "timeago.js";
import colors from "colors";

/**
 *
 * @description call the bitly info data
 * @param { string } link - link for search info
 * @returns { Promise<void> } - return results serach
 *
 */
const bitlyInfo = async (link) => {
  try {
    const { data, status } = await axios.post(
      "https://api-ssl.bitly.com/v4/expand",
      {
        bitlink_id: link
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.BITLY_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    status === 404
      ? console.info("no found link".green)
      : console.table({
        created_link: format(data.created_at),
        bitly_link: data.link,
        link: data.long_url
      });
  } catch (err) {
    console.error(colors.red(err.message));
  }
};

// export
export default bitlyInfo;
