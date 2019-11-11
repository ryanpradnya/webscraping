const puppeteer = require('puppeteer');

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

