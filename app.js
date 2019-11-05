const request = require('request');
const cheerio = require('cheerio');

request('https://www.urbanhire.com/jobs', (error, response, html) => {
    if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        $('.m-b-lg').each((i, el) => {
            const title = $(el)
                .find('h2')
                .text();
            // .replace(/\s\s+/g, '');
            // const link = $(el)
            //     .find('a')
            //     .attr('href');
            // const date = $(el)
            //     .find('.post-date')
            //     .text()
            //     .replace(/,/, '');

            console.log(title)
        });

        console.log('Scraping Done...');
    }
});