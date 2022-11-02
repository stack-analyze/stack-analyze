// bitly regexp
const bitlyRegexp = /bit\.ly\//g;

const bitlyQuery = {
  name: "bitlyLink",
  message: "enter a short link:",
  validate: input => bitlyRegexp.test(input) || "only bitly link".yellow
};

/** 
 * @param {string} name
 * @param {string} message
*/
const promptParams = (name, message) => ({
  name,
  message,
  validate: input => input !== "" || "this field is required".yellow
});

/** 
 * @param {string} name
 * @param {string} message
*/
const promptKey = (name, message) => ({
  name,
  message,
  type: "password",
  mask: "?",
  validate: input => input !== "" || "token field is required".yellow
});

export {
  bitlyQuery,
  promptParams,
  promptKey
};

