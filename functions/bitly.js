// modules
const axios = require("axios").default;
const { format } = require("timeago.js");
const { red } = require("colors");

/**
 *
 * @description call the bitly info data
 * @param { string } link - link for search info
 * @param { string } token - token for using tool
 * @returns { Promise<void> } - return results serach
 *
 */
const bitlyInfo = async (link, token) => {
  try {
    const { data, status } = await axios.post(
      "https://api-ssl.bitly.com/v4/expand",
      {
        bitlink_id: link
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
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
    console.error(red(err.message));
  }
};

// export
module.exports = bitlyInfo;

