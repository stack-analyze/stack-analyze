#!/usr/bin/env node

// modules
const { version } = require('./package.json')
const Wappalyzer = require('wappalyzer')
const inquirer = require('inquirer')

//wappalyzer
const stack = async (url) => {
  const wappalyzer = await new Wappalyzer()

  try {
    await wappalyzer.init()

    const results = await wappalyzer.open(url).analyze()

    console.log(JSON.stringify(results, null, 2))
  } catch (error) {
    console.error(error)
  }

  await wappalyzer.destroy()
}

console.log(`stack analyze by intermachine developers version: ${version}`)

//promot command
inquirer
  .prompt({
    name: 'site',
    message: 'enter url for analyze the tech stack',
  })
  .then((answers) => {
    stack(answers.site)
  })

