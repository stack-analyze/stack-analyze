import axios from "axios";
import colors from "colors";

/**
 * @typedef {'en' | 'es'} Locale
 * 
 * @typedef {{[x in Locale]: string}} LocaleKeyword
 * 
 * @async
 * @param { Locale } locale
 * @param { string } question
 * @returns {Promise<void>}
 */
export default async function magicBall(locale, question) {
  /** @type {LocaleKeyword} */
  const localeKeyword = {
    en: "magic ball say:",
    es: "la bola magic te dice:"
  };
  
  try {
    const {data} = await axios.get("https://eightballapi.com/api/biased", {
      params: { question, locale }
    });

    console.info(
      localeKeyword[locale], data.reading
    );
  } catch (err) {
    console.info(colors.red(err.message));
  }
}
