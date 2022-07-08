const [axios, cheerio] = [require("axios").default, require("cheerio")];

function scrape(url) {
    let $;
    let run;

    const scraping = axios.create({
        baseURL: url
    });

    const title = async () => {
        try {
            const { data } = await scraping.get("");
            $ = cheerio.load(data);

            run = $("title").text();
        } catch (err) { run = err.message; }
        return run;
    };

    const images = async () => {
        try {
            const { data } = await scraping.get("");
            $ = cheerio.load(data);

            run = $("img").map((i, el) => ({
                imagePath: $(el).attr("src"),
                imageTitle: $(el).attr("alt")
            })).toArray();
        } catch (err) { run = err.message; }
        return run;
    };

    const metadata = async () => {
        try {
            const { data } = await scraping.get("");
            $ = cheerio.load(data);

            run = $("meta").map((i, el) => ({
                metaInfo: $(el).attr("name"),
                metaContent: $(el).attr("content")
            })).toArray()
                .filter(({ metaInfo }) => metaInfo !== undefined);
        } catch (err) { run = err.message; }
        return run;
    };

    const headings = async () => {
        try {
            const { data } = await scraping.get("");
            $ = cheerio.load(data);

            run = $("h1, h2, h3, h4, h5, h6").map((i, el) => ({
                headingTag: $(el).prop("tagName"),
                headingText: $(el).text()
            })).toArray();
        } catch (err) { run = err.message; }
        return run;
    };

    const table_heading = async () => {
        try {
            const { data } = await scraping.get("");
            $ = cheerio.load(data);

            run = $("th").map((i, el) => ({
                headingRow: i,
                text: $(el).text()
            })).toArray();
        } catch (err) { run = err.message; }
        return run;
    };

    const table_data = async () => {
        try {
            const { data } = await scraping.get("");
            $ = cheerio.load(data);

            run = $("td").map((i, el) => $(el).text()).toArray();
        } catch (err) { run = err.message; }
        return run;
    };


    const links = async () => {
        try {
            const { data } = await scraping.get("");
            $ = cheerio.load(data);

            run = $("a").map((i, el) => ({
                url: $(el).attr("href"),
                text: $(el).text()
            })).toArray()
                .filter(({ url }) => url.indexOf("#") !== 0);
        } catch (err) { run = err.message; }
        return run;
    };

    const cites = async () => {
        try {
            const { data } = await scraping.get("");
            $ = cheerio.load(data);

            run = $("q, blockquote").map((i, el) => ({
                citeTag: $(el).prop("tagName"),
                citeLink: $(el).attr("cite"),
                citeText: $(el).text()
            })).toArray();
        } catch (err) { run = err.message; }
        return run;
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

module.exports = scrape;
