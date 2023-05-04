import axios from "axios";

export default async function githubInfo(user) {
    let run;
    try {
        const res = await axios.get(`https://api.github.com/users/${user}`);

        run = res.data
    } catch (err) {
        run = err.message;
    }
    return run;
}
