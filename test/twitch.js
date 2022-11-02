const axios = require("axios").default;

const twitchInfo = async (twitchUser, apiToken) => {
  let result;

  try {
    const { data: twitchData } = await axios.get("https://api.twitch.tv/helix/users", {
      params: { login: twitchUser },
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Client-Id": "5s4644564adsadasdsdasd"
      }
    });

    result = twitchData.data.map(({
      display_name,
      broadcaster_type,
      view_count,
      created_at
    }) => ({
      display_name,
      broadcaster_type,
      view_count,
      created_at
    }));
  } catch (err) {
    result = err;
  }
};

module.exports = twitchInfo;
