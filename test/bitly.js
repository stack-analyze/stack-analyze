// modules
const axios = require("axios").default;

const bitlyInfo = async (link, token) => {
  let run;
  try {
    const { data, status } = await axios.post(
      "https://api-ssl.bitly.com/v4/expand",
      { bitlink_id: link },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    status === 404
      ? run = "no found link"
      : run = {
        created_link: data.created_at,
        bitly_link: data.link,
        link: data.long_url
      };
  } catch (err) {
    run = err.message;
  }
};

module.exports = bitlyInfo;
