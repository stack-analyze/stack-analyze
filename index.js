#!/usr/bin/env node

// modules
const { version } = require('./package.json')
const Wappalyzer = require('wappalyzer')
const inquirer = require('inquirer')

/**
 * Analyze single website
 * @param {string} url - website for analyze single website
 */
const stack = async (url) => {
  const wappalyzer = await new Wappalyzer()

  try {
    await wappalyzer.init()

    const results = await wappalyzer.open(url).analyze()

    console.log(JSON.stringify(results.applications, null, 2))
  } catch (error) {
    console.error(error)
  }

  await wappalyzer.destroy()
}

/**
 * Analyze multiples websites
 * @param {string[]} urls - multiples websites for analyze
 */
const sites = async (urls) => {
  const wappalyzer = await new Wappalyzer()

  try {
    await wappalyzer.init()

    const results = await Promise.all(
      urls.map(async (url) => ({
        url,
        results: await wappalyzer.open(url).analyze(),
      })),
    )

    console.log(JSON.stringify(results, null, 2))
  } catch (err) {
    console.log(err)
  }

  await wappalyzer.destroy()
}

console.log('stack analyze by intermachine developers version:', version)

//promot command
inquirer
  .prompt([
    {
      type: 'list',
      name: 'analyze',
      message: 'what option do you want to analyze stack',
      choices: ['single', 'multiple', 'exit'],
    },
  ])
  .then((answers) => {
    // options conditional
    switch (answers.analyze) {
      case 'single':
        inquirer
          .prompt({
            name: 'url',
            message: 'enter url for analyze the tech stack',
          })
          .then((anw) => stack(anw.url))
        break
      case 'multiple':
        inquirer
          .prompt({
            name: 'urls',
            message:
              "enter urls for analyze the tech stacks with whitespace without quotes example. 'http://example.com https://nodejs.org': \n",
          })
          .then((anw) => {
            const websites = anw.urls.split(' ')
            sites(websites)
          })
        break

      default:
        console.log('thanks for use stack analyze')
        break
    }
  })
