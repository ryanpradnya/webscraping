const puppeteer = require('puppeteer');
const url = 'https://www.urbanhire.com/jobs?page=';

exports.getjobs = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.urbanhire.com/jobs');
  const result = await page.evaluate(() => {
    let elements = Array.from(document.querySelectorAll('h2[itemprop="title"]'));
    let titles = elements.map(element => {
      return element.innerText
    })
    return {
      titles
    }
  });

  console.log(result);

  browser.close()
};

exports.getNumberOfJob = async () => {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.urbanhire.com/jobs?page=1');
  const result = await page.evaluate(() => {
    // let getNumber = document.querySelector('h1').innerText.split(" ")[0];
    // let number = parseInt(getNumber.replace(/\./g, ''), 10);
    let number = parseInt(document.querySelector('h1').innerText.replace(/\./g, ''), 10);
    let pageNumber = Math.ceil(number / 12);


    return {
      number, pageNumber
    }
  });


  console.log(result.pageNumber);
  let i;

  var jobTitle = [];
  for (i = 1; i <= 2; i++) {
    let urlToUse = url + i;
    console.log(urlToUse)
    await page.goto(urlToUse);
    let result = await page.evaluate(() => {
      let elements = Array.from(document.querySelectorAll('h2[itemprop="title"]'));
      for (element of elements) {
        console.log(element)
        jobTitle.push(element);
      }
      return {
        jobTitle
      }
    });
    console.log(result);
  }
  // console.log(jobTitle);

  browser.close()
};

