import cssValidator from "w3c-css-validator"

export default async function cssValidate(url) {
  let run;

  try {
    const cssResults = await cssValidator.validateURL(url, {
      warningLevel: 1
    });
		
    run = cssResults;
  } catch(err) {
    run = err.message;
  }

  return run;
}
