import { default as axios } from "axios";
import { load } from "cheerio";
import colors from "colors";
import { printTable } from "console-table-printer";

/**
 * @typedef {Object} options
 * @property {function(): Promise<void>} options.title
 * @property {function(): Promise<void>} options.images
 * @property {function(): Promise<void>} options.metadata
 * @property {function(): Promise<void>} options.headings
 * @property {function(): Promise<void>} options.table_heading
 * @property {function(): Promise<void>} options.table_data
 * @property {function(): Promise<void>} options.links
 * @property {function(): Promise<void>} options.cites
 * 
 * @param {string} url 
 * @returns {options}
 */
export default function scrape(url) {
  let $;

  const scraping = axios.create({
    baseURL: url
  });

  const title = async () => {
    try {
      const { data } = await scraping.get("");
      $ = load(data);

      console.info("title page:", $("title").text());
    } catch (err) { console.error(colors.red(err.message)); }
  };

  const images = async () => {
    try {
      const { data } = await scraping.get("");
      $ = load(data);

      const imgs = $("img").map((i, el) => ({
        imagePath: $(el).attr("src"),
        imageTitle: $(el).attr("alt")
      })).toArray();

      imgs.length === 0
        ? console.info("no found images")
        : printTable(imgs);
    } catch (err) { console.error(colors.red(err.message)); }
  };

  const metadata = async () => {
    try {
      const { data } = await scraping.get("");
      $ = load(data);

      const metadataList = $("meta").map((i, el) => ({
        metaInfo: $(el).attr("name"),
        metaContent: $(el).attr("content")
      })).toArray()
        .filter(({ metaInfo }) => metaInfo !== undefined);

      printTable(metadataList);
    } catch (err) { console.error(colors.red(err.message)); }
  };

  const headings = async () => {
    try {
      const { data } = await scraping.get("");
      $ = load(data);

      const headingList = $("h1, h2, h3, h4, h5, h6").map((i, el) => ({
        headingTag: $(el).prop("tagName"),
        headingText: $(el).text()
      })).toArray();

      printTable(headingList);
    } catch (err) { console.error(colors.red(err.message)); }
  };

  const table_heading = async () => {
    try {
      const { data } = await scraping.get("");
      $ = load(data);

      const tableHeadList = $("th").map((i, el) => ({
        headingRow: i,
        text: $(el).text()
      })).toArray();

      tableHeadList.length === 0
        ? console.info("no found th tags")
        : printTable(tableHeadList);
    } catch (err) { console.error(colors.red(err.message)); }
  };

  const table_data = async () => {
    try {
      const { data } = await scraping.get("");
      $ = load(data);

      const tableColumnList = $("td").map((i, el) => $(el).text()).toArray();

      tableColumnList.length === 0
        ? console.info("no found td tags")
        : printTable(tableColumnList);
    } catch (err) { console.error(colors.red(err.message)); }
  };


  const links = async () => {
    try {
      const { data } = await scraping.get("");
      $ = load(data);

      const linkList = $("a").map((i, el) => ({
        url: $(el).attr("href"),
        text: $(el).text()
      })).toArray()
        .filter(({ url }) => url.indexOf("#") !== 0);

      printTable(linkList);
    } catch (err) { console.error(colors.red(err.message)); }
  };

  const cites = async () => {
    try {
      const { data } = await scraping.get("");
      $ = load(data);

      const citeList = $("q, blockquote").map((i, el) => ({
        citeTag: $(el).prop("tagName"),
        citeLink: $(el).attr("cite"),
        citeText: $(el).text()
      })).toArray();

      citeList.length === 0
        ? console.info("no found q and/or blockquote tags")
        : printTable(citeList);
    } catch (err) { console.error(colors.red(err.message)); }
  };

  return {
    title,
    images,
    metadata,
    headings,
    table_heading,
    table_data,
    links,
    cites
  };
}
