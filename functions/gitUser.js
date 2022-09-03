// modules
import { default as axios } from "axios";
import { format } from "timeago.js";
import colors from "colors";

/**
 *
 * @description call github info user
 * @param { string } user - get github user info
 * @returns { Promise<void> } - return results info
 *
 */
export default async function githubInfo(user) {
  try {
    const { data, status } = await axios.get(`https://api.github.com/users/${user}`);

    if (status !== 404){
      const info = {
        username: data.login,
        fullName: data.name === null ? "no info": data.name,
        Email: data.email === null ? "no info": data.email,
        userFollowers: data.followers,
        userFollowing: data.following,
        accountAge: format(data.created_at),
        updated_info: format(data.updated_at),
        twitter: data.twitter_username === null ? "no info": data.twitter_username,
        repos: data.public_repos,
        gists: data.public_gists
      };

      console.table(info);
    } else {
      console.info(colors.yellow(""+status));
    }
  } catch(err) {
    console.error(colors.red(err.message));
  }
}
