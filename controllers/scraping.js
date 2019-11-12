const puppeteer = require('puppeteer');
const Job = require('../models/job');

const url = 'https://www.urbanhire.com/jobs?page=';


exports.getjobs = async () => {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // Get max page number to get job in every page
  await page.goto('https://www.urbanhire.com/jobs', { waitUntil: 'load', timeout: 0 });
  const result = await page.evaluate(() => {
    let number = parseInt(document.querySelector('h1').innerText.replace(/\./g, ''), 10);
    let pageNumber = Math.ceil(number / 12);

    return {
      number, pageNumber
    }
  });


  console.log(result.pageNumber);
  let i;

  // Use result.pageNumber to get job in every page. In this case  i use 2 for sampling.
  for (i = 1; i <= 2; i++) {
    let urlToUse = url + i;
    console.log(urlToUse)
    await page.goto(urlToUse, { waitUntil: 'load', timeout: 0 });
    let resultScrap = await page.evaluate(() => {
      var jobs = [];

      //Get data from page
      let titles = document.querySelectorAll('h2[itemprop="title"]');
      let companys = document.querySelectorAll('a[itemprop="hiringOrganization"]');
      let descriptions = document.querySelectorAll('.CftnvrBV3xdnOARYukOAf');
      let locationAndFunctions = document.querySelectorAll('._2ovehP2ue1CjJm2RGlhscF');
      // let logos = document.querySelectorAll('._2MmTVnWuE907iCHUKTzuje');

      //Store data in object and push to array
      for (var x = 0; x < titles.length; x++) {
        let city = locationAndFunctions[x].querySelectorAll('a[itemprop="url"]')[0].innerText;
        let province = locationAndFunctions[x].querySelectorAll('a[itemprop="url"]')[1].innerText;
        let jobfunction = locationAndFunctions[x].querySelectorAll('a[itemprop="url"]')[2].innerText;
        // let logo = logos[x].querySelector('img').src;


        var data = new Object()
        data.title = titles[x].innerText;
        data.company = companys[x].innerText;
        data.location = city + ', ' + province;
        data.jobfunction = jobfunction;
        // data.logo = logo;
        data.description = descriptions[x].innerText;
        jobs.push(data);
      }
      return {
        jobs
      }
    });
    console.log(resultScrap.jobs.length);
    if (resultScrap.jobs.length > 0) {
      for (var j = 0; j < resultScrap.jobs.length; j++) {
        try {
          //store data to database mongodb
          let job = new Job({
            jobName: resultScrap.jobs[j].title,
            companyName: resultScrap.jobs[j].company,
            jobLocation: resultScrap.jobs[j].location,
            jobFunction: resultScrap.jobs[j].jobfunction,
            jobDescription: resultScrap.jobs[j].description
          });
          await job.save();
        } catch (err) {
          console.log(err);
        }
      }
    }
  }

  browser.close()
};

