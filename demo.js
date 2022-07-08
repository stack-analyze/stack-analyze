import inquirer from 'inquirer';

inquirer
  .prompt([
  	{
      type: "input",
      name: "username",
      message: "What's your name?"
    }
	])
  .then((answers) => {
  	console.log(`Hello ${answers.username}!`)
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Your console environment is not supported!")
    } else {
      console.log(error)
    }
})