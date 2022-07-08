// modules
import { default as axios } from "axios";
import { format } from "timeago.js";
import colors from "colors";

// table
import { printTable } from "console-table-printer";

/**
 * 
 * @description twitch user info
 * @param {string} twitchUser - twitch user for search
 * @param {string} apiToken - twitch api token
 * @returns { Promise<void> } - return twitch results
 */
const twitchInfo = async (twitchUser, twitchClient, apiToken) => {

  try {
    const { data: twitchData } = await axios.get(`https://api.twitch.tv/helix/users?login=${twitchUser}`, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Client-Id": twitchClient
      }
    });

    const result = twitchData.data.map(({
      display_name,
      broadcaster_type,
      view_count,
      created_at
    }) => ({
      display_name,
      broadcaster_type,
      view_count,
      createdTime: format(created_at)
    }));

    printTable(result);
  } catch (err) {
    console.error(colors.red(err));
  }
};

export default twitchInfo;
