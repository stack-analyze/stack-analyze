import axios from "axios";
import { load } from "cheerio";

export default async function scrape(url, option) {
    let result;
    try {
        const { data } = await axios.get(url);
        const $ = load(data);

        const scraping = {
            title() { 
                result = $("title").text();
            },
            images() {
                result = $("img").map((i, el) => ({
                    imagePath: $(el).attr("src"),
                    imageTitle: $(el).attr("alt")
                })).toArray();
            },
            metadata() {
                result = $("meta").map((i, el) => ({
                    metaInfo: $(el).attr("name"),
                    metaContent: $(el).attr("content")
                })).toArray()
                    .filter((data) => data?.metaInfo);
            },
            headings() {
                result = $("h1, h2, h3, h4, h5, h6").map((i, el) => ({
                    headingTag: $(el).prop("tagName"),
                    headingText: $(el).text()
                })).toArray();
            },
            tableHead() {
                result = $("th").map((i, el) => ({
                    headingRow: i,
                    text: $(el).text()
                })).toArray();
            },
            tableData() {
                result = $("td").map((i, el) => ({
                    tableRow: i + 1,
                    tableData: $(el).text(),
                })).toArray();
            },
            links() {
                result = $("a").map((i, el) => ({
                    url: $(el).attr("href"),
                    text: $(el).text()
                })).toArray()
                    .filter(({ url }) => url.indexOf("#") !== 0);
            },
            cites() {
                result = $("q, blockquote").map((i, el) => ({
                    citeTag: $(el).prop("tagName"),
                    citeLink: $(el).attr("cite"),
                    citeText: $(el).text()
                })).toArray();
            }
        };

        scraping[option]();
    } catch (err) {
        result = err.message;
    }
    
    return result;
}
