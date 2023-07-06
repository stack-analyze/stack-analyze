// modules
import { format } from "timeago.js";
import colors from "colors";

// save git user
import { stackSave } from "../utils.js";

/**
 *
 * @description call github info user
 * @async
 * @param { string } user - get github user info
 * @returns { Promise<void> } - return results info
 *
 */
export default async function githubInfo(user) {
  try {
    const data = await (await fetch(`https://api.github.com/users/${user}`)).json();

    const info = {
      username: data.login,
      fullName: data?.name ?? "no info",
      userFollowers: data.followers,
      userFollowing: data.following,
      accountAge: format(data.created_at),
      twitter: data?.twitter_username ?? "no info",
      repos: data.public_repos,
      gists: data.public_gists
    };

    console.table(info);
    
    stackSave(`${user}-info.json`, JSON.stringify(info, null, 2));
  } catch(err) {
    console.error(colors.red(err.message));
  }
}
