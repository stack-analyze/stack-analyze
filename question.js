// module
const { textSync } = require("figlet")
const inquirer = require("inquirer")

/**
 * @param { string } result - result option anwser
 * @return { void }
 */
const anwOption = (result) => {
  // options conditional
  switch (result) {
    case "single":
      console.clear()
      inquirer
        .prompt({
          name: "url",
          message: "enter url for analyze the tech stack",
        })
        .then((anw) => {
          if (anw.url.indexOf("http" || "https") > -1) {
            console.log(anw.url)
            question()
          } else {
            console.error("\x1b[31mpor favor ingrese una direccion https o http valida")
            question()
          }
        })
      break
    
    case "multiple":
      console.clear()
      inquirer
        .prompt({
          name: "urls",
          message:
            "enter urls for analyze the tech stacks with whitespace without quotes example. 'http://example.com https://nodejs.org/': \n",
        })
        .then((anw) => {
          if (
            anw.urls.match(/(https|http)/g) !== null &&
            anw.urls.match(/(https|http)/g).length === 2
          ) {
            console.log(anw.urls)
            question()
          } else {
            console.error("\x1b[31mpor favor ingrese en cada una direccion https o http valida")
            question()
          }
        })
      break

    default:
      console.log("thanks for use stack analyze")
      break
  }
}

/**
 * @return { Promise<void> } - return async/await question list
 */
async function question() {
  const anw = await inquirer.prompt([
    {
      type: "list",
      name: "analyze",
      message: "what option do you want to analyze stack",
      choices: ["single", "multiple", "about", "exit"],
    },
  ])
  anwOption(anw.analyze)
}

console.clear()
console.log("\x1b[33m", textSync("stack-analyze"))
question()
