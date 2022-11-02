// modules
import { default as axios } from "axios";
import { format } from "timeago.js";
import colors from "colors";

/**
 * 
 * @description twitch user info
 * @async
 * @param { string } twitchUser - twitch user for search
 * @param { string } twitchClient - twitch client code
 * @param { string } apiToken - twitch api token
 * @returns { Promise<void> } - return twitch results
 */
export default async function twitchInfo(twitchUser, twitchClient, apiToken) {

  try {
    const { data: twitchData } = await axios.get("https://api.twitch.tv/helix/users", {
      params: { login: twitchUser },
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Client-Id": twitchClient
      }
    });

    const result = {
      username: twitchData.data[0].display_name,
      broadcaster: twitchData.data[0]?.broadcaster_type || "user",
      viewCount: twitchData.data[0].view_count,
      accountAge: format(twitchData.data[0].created_at)
    };

    console.table(result);
  } catch (err) {
    console.error(colors.red(err));
  }
}
