import axios from "axios";

const deezer = async (search) => {
	let run;
	
	try {
		const { data } = await axios.get(
			"https://api.deezer.com/search/album", {
				params: { q: search }
			}
		)
		
		run = data.data
	} catch(err) {
		run = err.message
	}
}

export default deezer
