// modules
import { default as axios } from "axios";
import { format } from "timeago.js";
import colors from "colors";

// save bitly
import { stackSave } from "../utils.js";

/**
 *
 * @description call the bitly info data
 * @async
 * @param { string } link - link for search info
 * @param { string } token - bitly api token is required
 * @returns { Promise<void> } - return results serach
 *
 */
export default async function bitlyInfo(link, token) {
  try {
    const { data } = await axios.post(
      "https://api-ssl.bitly.com/v4/expand",
      { bitlink_id: link },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.table({
      created_link: format(data.created_at),
      bitly_link: data.link,
      link: data.long_url
    });
    
    stackSave("bitly.json", JSON.stringify(data, null, 2));
  } catch (err) {
    console.error(colors.red(err.message));
  }
}
