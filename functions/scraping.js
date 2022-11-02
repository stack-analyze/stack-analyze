import { default as axios } from "axios";
import { load } from "cheerio";
import colors from "colors";
import { printTable } from "console-table-printer";

/**
 * @typedef {"title"|"images"|"metadata"|"headings"|"table_heading"|"table_data"|"links"|"cites"} Options
 * 
 * It takes a URL and an option as arguments, and then it scrapes the page at the URL for the option
 * @param {string} url 
 * @param {Options} options
 * @returns {Promise<void>}
 */
export default async function scrape(url, options) {
  try {
    const { data } = await axios.get(url);
    const $ = load(data);

    const scraping = {
      title: () => console.info($("title").text()),
      images() {
        const imageList = $("img").map((i, el) => ({
          imagePath: $(el).attr("src"),
          imageTitle: $(el).attr("alt")
        })).toArray();

        imageList.length === 0
          ? console.info("no found images")
          : printTable(imageList);
      },
      metadata() {
        const metadataList = $("meta").map((i, el) => ({
          metaInfo: $(el).attr("name"),
          metaContent: $(el).attr("content")
        })).toArray()
          .filter((data) => data?.metaInfo);

        printTable(metadataList);
      },
      headings() {
        const headingList = $("h1, h2, h3, h4, h5, h6").map((i, el) => ({
          headingTag: $(el).prop("tagName"),
          headingText: $(el).text()
        })).toArray();

        printTable(headingList);
      },
      tableHead() {
        const tableHeadList = $("th").map((i, el) => ({
          headingRow: i,
          text: $(el).text()
        })).toArray();

        tableHeadList.length === 0
          ? console.info("no found th tags")
          : printTable(tableHeadList);
      },
      tableData() {
        const tableColumnList = $("td").map((i, el) => ({
          tableRow: i + 1,
          tableData: $(el).text(),
        })).toArray();

        tableColumnList.length === 0
          ? console.info("no found td tags")
          : console.table(tableColumnList.slice(0, 10), ["tableData"]);
      },
      links() {
        const linkList = $("a").map((i, el) => ({
          url: $(el).attr("href"),
          text: $(el).text()
        })).toArray()
          .filter(({ url }) => url.indexOf("#") !== 0);

        printTable(linkList);
      },
      cites() {
        const citeList = $("q, blockquote").map((i, el) => ({
          citeTag: $(el).prop("tagName"),
          citeLink: $(el).attr("cite"),
          citeText: $(el).text()
        })).toArray();

        citeList.length === 0
          ? console.info("no found q and/or blockquote tags")
          : printTable(citeList);
      }
    };

    scraping[options]();
  } catch (err) {
    console.error(colors.red(err.message));
  }
}
