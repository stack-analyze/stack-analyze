import axios from "axios";
import { load } from "cheerio";

export default async function pokerGame(game) {
	let result;
	
	try {
		const { data } = await axios.get(
		  `https://bicyclecards.com/how-to-play/${game}`
		);

		// extract rules
		const $ = load(data);

		const [age, players] = $(".border-brand-blue-pale div:not(.text-brand-blue)").map(
			(i, el) => $(el).text()
		).get().slice(1);

		const howPlayTitle = $("h3.text-2xl").map(
			(i, el) => $(el).text()
		).get();

		const howPlayDesc = $("h3.text-2xl+p.mb-5").map(
			(i, el) => $(el).text()
		).toArray();

		// poker game
		const pokerGame = {
			title: $("title").text(),
			age, players,
			...(Object.fromEntries(
				howPlayTitle.map((item, i) => [item, howPlayDesc[i]])
			))
		};

		result = pokerGame;
	} catch(err) {
		result = err.message;
	}
	
	return result
}
