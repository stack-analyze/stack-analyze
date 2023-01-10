import { default as axios } from "axios";
import { load } from "cheerio";
import colors from "colors";
import { printTable } from "console-table-printer";

// stack save
import { stackSave } from "../utils.js";

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
    
    let result;

    const scraping = {
      title() {
        result = `url title: ${$("title").text()}`;
        console.info($("title").text());
      },
      images() {
        const imageList = $("img").map((i, el) => ({
          imagePath: $(el).attr("src"),
          imageTitle: $(el).attr("alt")
        })).toArray();
        
        result = imageList.length === 0
          ? "no found images"
          : imageList;

        typeof result === "string"
          ? console.info(result)
          : printTable(result);
      },
      metadata() {
        const metadataList = $("meta").map((i, el) => ({
          metaInfo: $(el).attr("name"),
          metaContent: $(el).attr("content")
        })).toArray()
          .filter((data) => data?.metaInfo);
          
        result = metadataList;

        printTable(metadataList);
      },
      headings() {
        const headingList = $("h1, h2, h3, h4, h5, h6").map((i, el) => ({
          headingTag: $(el).prop("tagName"),
          headingText: $(el).text()
        })).toArray();
        
        result = headingList.length === 0 
          ? "no found heading tags"
          : headingList;

        typeof result === "string"
          ? console.info("no found heading tags")
          :printTable(headingList);
      },
      tableHead() {
        const tableHeadList = $("th").map((i, el) => ({
          thCol: $(el).index(),
          thData: $(el).text()
        })).toArray();
        
        result = tableHeadList.length === 0
          ? "no found th tags"
          : tableHeadList;

        typeof result === "string"
          ? console.info("no found th tags")
          : printTable(tableHeadList);
      },
      tableData() {
        const tableColumnList = $("td").map((i, el) => ({
          rowID: $(el).parent().index(),
          colID: $(el).index(),
          colData: $(el).text(),
        })).toArray();
        
        result = tableColumnList.length === 0
          ? "no found td tags"
          : tableColumnList;

        typeof result === "string"
          ? console.info(result)
          : console.table(result.slice(0, 10));
      },
      links() {
        const linkList = $("a").map((i, el) => ({
          url: $(el).attr("href"),
          text: $(el).text()
        })).toArray()
          .filter(({ url }) => url.indexOf("#") !== 0);

        result = linkList
        
        printTable(linkList);
      },
      cites() {
        const citeList = $("q, blockquote").map((i, el) => ({
          citeTag: $(el).prop("tagName"),
          citeLink: $(el).attr("cite"),
          citeText: $(el).text()
        })).toArray();
        
        result = citeList.length === 0
          ? "no found q and/or blockquote tags"
          : citeList;

        typeof result === "string"
          ? console.info("no found q and/or blockquote tags")
          : printTable(citeList);
      }
    };

    scraping[options]();
    
    typeof result === "string" 
      ? stackSave('scraping.txt', result)
      : stackSave('scraping.json', JSON.stringify(result, null, 2));
  } catch (err) {
    console.error(colors.red(err.message));
  }
}
