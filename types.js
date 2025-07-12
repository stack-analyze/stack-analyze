/**
 * general functions
 * @typedef {() => Promise<void>} Menu
 * 
 * types for about tools
 * 
 * @typedef {Object} Info
 * @property {string} Info.mainDeveloper
 * @property {string} Info.version
 * @property {string} Info.license
 * 
 * @typedef {Object} DeveloperList
 * @property {string} DeveloperList.name
 * @property {string} DeveloperList.roles
 * 
 * @typedef {Object} Youtube
 * @property {string} Youtube.youtubeChannel
 * @property {string} Youtube.recomendation
 * 
 * @typedef {Object} Twitch
 * @property {string} Twitch.user
 * @property {string} [Twitch.details]
 * 
 * @typedef {Object} Project
 * @property {string} Project.name
 * @property {string} Project.desc
 * 
 * anime quote types
 * @typedef {Object} Anime
 * @property {number} id
 * @property {string} name
 * @property {string} altName
 * 
 * @typedef {Object} Data
 * @property {string} content
 * @property {Anime} anime
 * @property {Omit<Anime, 'altName'>} character
 * 
 * @typedef {Object} AnimeQuoute
 * @property {string} status
 * @property {Data} data
 * 
 * select types
 * @typedef {({
 *   [x: string]: (
 *     refreshCallback: () => Promise<void>, 
 *     alternativeCallback?: () => Promise<void>
 *   ) => Promise<void> | void
 * })} Select
 * 
 */
