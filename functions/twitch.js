// modules
import axios from "axios";
import { format } from "timeago.js";
import { printTable } from "console-table-printer";
import colors from "colors";

// save twitch users
import { stackSave } from "../utils.js";

/** 
 * types for twitch info
 *
 * @typedef {Object} Twitch
 * @property {string} Twitch.twitchUsers
 * @property {string} Twitch.twitchSeparator
 * @property {string} Twitch.twitchToken
 * @property {string} Twitch.twitchClient
 */

/**
 * @description twitch user info
 * @async
 * @param {Twitch} param
 * @returns { Promise<void> } - return twitch results
 */
export default async function twitchInfo({ 
  twitchUsers, 
  twitchSeparator,
  twitchToken,
  twitchClient 
}) {

  const userList = twitchUsers.split(twitchSeparator);

  if(userList.length === 10) {
    console.error("twitch users must be 10".bgRed);
  }

  const params = new URLSearchParams();

  userList.forEach((item) => {
    params.append("login", item);
  });

  try {
    const { data: twitchData } = await axios.get("https://api.twitch.tv/helix/users", {
      params,
      headers: {
        Authorization: `Bearer ${twitchToken}`,
        "Client-Id": twitchClient
      }
    });

    const result = twitchData.data.map(({
      display_name,
      broadcaster_type,
      view_count,
      created_at
    }) => ({
      username: display_name,
      broadcaster: broadcaster_type || "user",
      viewCount: view_count,
      accountDate: new Date(created_at).toLocaleDateString(),
      accountAge: format(created_at)
    }));

    printTable(result);
    stackSave("twitch-users.json", JSON.stringify(result, null, 2));
  } catch (err) {
    console.error(colors.red(err));
  }
}
