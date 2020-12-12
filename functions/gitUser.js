// modules
const axios = require("axios").default;
const { format } = require("timeago.js");

/**
 *
 * @description call github info user
 * @param { string } user - get github user info
 * @returns { Promise<void> } - return results info
 *
 */
async function githubInfo(user) {
  try {
    const res = await axios.get(`https://api.github.com/users/${user}`, {
      headers: {
        Authorization: "token a3d5c587fde84c07064688a6cce6152ba3ada184"
      }
    });

    if (res.status !== 404){
      const info = {
        username: res.data.login,
        fullName: res.data.name === null ? "no info": res.data.name,
        Email: res.data.email === null ? "no info": res.data.email,
        userFollowers: res.data.followers,
        userFollowing: res.data.following,
        accountAge: format(res.data.created_at),
        updated_info: format(res.data.updated_at),
        twitter: res.data.twitter_username === null ? "no info": res.data.twitter_username,
        repos: res.data.public_repos,
        gists: res.data.public_gists
      };

      console.table(info);
    } else {
      console.info(res.status);
    }
  } catch(err) {
    console.error(err);
  }
}

module.exports = githubInfo;

