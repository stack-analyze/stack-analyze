// modules
import { default as axios } from "axios";
import { format } from "timeago.js";
import colors from "colors";

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
    const { data } = await axios.get(`https://api.github.com/users/${user}`);

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
  } catch(err) {
    console.error(colors.red(err.message));
  }
}
