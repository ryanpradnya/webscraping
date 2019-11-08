const request = require('request');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

// request('https://www.urbanhire.com/jobs', (error, response, html) => {
//     if (!error && response.statusCode == 200) {
//         const $ = cheerio.load(html);
//         let jobName = [];
//         let companyName = [];
//         let jobLocation = [];
//         let jobFuction = [];
//         let jobIndustry = [];

//         $('.m-b-lg').each((i, el) => {
//             $(el).find('h2').each((j, data) => {
//                 jobName[j] = $(data).text();
//             });
//             $(el).find('h3').each((j, data) => {
//                 companyName[j] = $(data).text();
//             });

//         });
//         console.log(jobName);
//         console.log(companyName);

//         console.log('Scraping Done...');
//     }
// });

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.urbanhire.com/jobs');
    const result = await page.evaluate(() => {
        let title = document.getElementsByClassName('m-b-lg').getElementsByTagName('H2').innerHTML;
        return {
            title
        }
    })

    console.log(result)

    browser.close()
})()

