# changelog

stack-analyze all version and notable changes, fixed, remove and new additions in code.

## generation 3 (ver. 1.2.0 -)

### version 1.2.7
#### Added
- wallpaper tool download (sol, moon)
#### changed
- default case in range color 91 to 100

### version 1.2.6
#### Changed
- redesign poke info tool
- remove module info in readme

### version 1.2.5
#### Added
- pokemon info tool.
#### Changed
- update script test.
- remove the cjs and mjs files.
- renove changelog based in generations similar to neo-jquery.
#### fixed
- add examples in twitch info users.
- fixed the bug create hardware info file.

### version 1.2.4
#### Changed
- remove jest module by node:test,
- web scraping & github info using native fetch api & not axios,
#### fixed
- fixed errors in:
  - single stack.
  - multiple.
  - hardware information.
- single & multiple stack using sub await mode

### version 1.2.3
#### Added
- bundlephobia info tool
#### Changed
- change write json to csv in hardware information

### version 1.2.2
#### Added
- add save file function for the tools
#### Changed
- change the hash table to unique function in hardware information
#### Fixed
- fixed to unique user to multiple users with split params

### version 1.2.1
#### Fixed
- rewrite form arrow functions to named function with export default.
- rewrite some test functions.
- add regexp form bitly info tool
#### Changed
- renove menu now using categories.
- add api params.
- comeback multibar from pagespeed tool

### version 1.2.0
#### Added
- new tool password generator
#### Fixed
- update anime search tool
- the files modules now using callbacks and remove no using vars
#### Changed
- the web scraping tool decided to use the question returns to the main menu instead of going to the main menu

## generation 2 (ver. 1.1.0 - 1.1.9)

### version 1.1.9
#### Added
- new module cheerio
- new tool webscraping
- new test
#### Fixed
- rewirte axios import
#### Changed
- hardware information change from functions to hash table
- about now is hash table
- now using the function printTable avoid overwritting.
- remove jsdocs the modules files
#### remove 
- remove models console-table-printer
- remove hash tables

### version 1.1.8
#### Fixed
- restructure all tools as a hash table with promises except the tool hardware information and about section
- update all modules
#### Changed
- remove the module coingecko-api
- remove process.env variables to writting manual token for security 

## version 1.1.7
#### Added
- twitch info tool
- remove one js module for module to cjs and esm
#### Fixed
- change write token to process.env varaibles own (not avalible values in github and gitlab)
- migrate cjs to esm
- rewrite module
#### Changed
- except some hardware tools and github using models from console-table-printer
- now using esm now about is js file not folder about with index.js
- rewrite all tests functions

### version 1.1.6
#### Added
- module stack-analyze mode
#### Fixed
- rewrite code
#### Changed
- menu renove
- renove jsdocs in some function or variables
- remove nonolive recommends soon in versions desktop 7 and pwa 1.5.0

### version 1.1.5
#### Added
- add new tool: movie info
- add new test
- renove menu
#### Fixed
- rewrite in some functions and about
- remove some dependencies not using project
#### Changed
- change multibar to 2 single bars
- change switch in all tools for hash functions tables
- renove nonolive recommends

### version 1.1.4
#### Added
- add new tool: bitly info
- add new test
#### Fixed
- rewrite some functions
- update npm modules via manual

### version 1.1.3
#### Added
- add new module: coingecko-api
- add new tool: crypto market
- add new recomends
- add new test
#### Fixed
- rewrite some functions
- update npm modules via manual
#### Changed
- add new const variables for map array functions

### version 1.1.2
#### Added
- add new nonolive streamers Recomend
#### Fixed
- rewrite multiple techstack
- rewrite test files
#### Changed
- changed the for loop to foreach loop

### version 1.1.1
#### Added
- using console.table only in objects variables
- using the console-table-printer in arrays in some functions and the about section
- add the new module: console-table-printer
- add the new nonolive streamers and youtube dev recommedation
#### Fixed
- rewrite some funcions
- fragment about section
#### Changed
- using console.table only in objects variables
- using the console-table-printer in arrays in some functions and the about section

### version 1.1.0
#### Added
- add the new modules:
    - systeminformation the main module
    - jsdoc + the template minami the dev modules
- add the hardware information
- add new recomendations for about section
#### Fixed
- rewrite the code the functions singlestack and multiple
- add the name app to question function
#### Changed
- changed the node style color to using colors

## generation 1 (ver. 1.0.1 - 1.0.9)

### version 1.0.9
#### Added
- add the new modules:
    - timeago.js for the github user
- add the options github info and anime search the main options
- add new recomendations for the about section
#### Fixed
- return the peformance now for pagespeed
#### Changed
- add new testing

### version 1.0.8
#### Added
- add the new modules:
    - colors
    - cli-progress
#### Fixed
change json print to table print version
#### Changed
- change console.dir about to console.table
- change from text to bar for pagespeed results
- add the badge tech stack project
#### patch version 1.0.85
notes:
- fixed the cli run
- remove performance.now for the defined time in pagespeed
- add recomendations sections

### version 1.0.7
#### Added
- add the new modules:
    - figlet the main module
    - jest dev module and testing functions
- add the options page speed and about the main options
- add return in a option select except about and exit
#### Fixed
- the website in blank or website without http:// or https:// return the main options
- eslint custom rules without style guide
#### Changed
- changed the inquirer list to inquirer rawlist
- rewirte jsdoc in all project except test files
- the tech stack using other console methods console.log only in exit cli

## version 1.0.6
#### Added
- add the new options: multiple (analyze many sites) and exit (exit cli).
- the code was testing with eslint to avoid errors to execute
- rewrite the module docs. 
#### Changed
- the list options with inquirer
- welcome message modified

### version 1.0.5
#### Changed
- modify the code and module structure
#### remove
- remove the commander module

#### version 1.0.4
- fisrt official version in npm with the modules:
    - wappalyzer
    - inquirer
    - commander

#### version 1.0.1 to 1.0.3
test version modules without wappalyzer module (only testing)
