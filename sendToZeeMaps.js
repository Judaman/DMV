module.exports = {
  sendToZeeMaps: async function sendToZeeMaps(name, street, city, state, country, zipcode, color) {

    'use strict';

    const puppeteer = require('puppeteer');

    const browser = await puppeteer.launch({
      headless: true,
      timeout: 90000,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });


    const page = await browser.newPage();

    await page.goto('https://www.zeemaps.com/map?group=3491142');
    await page.waitFor('body')

    await page.click('a.signature');

    await page.waitForSelector('input#u_email');

    await page.type('input#u_email', 'daniel@dmvhometherapy.com');
    await page.type('input#u_passwd', 'yudidaniel12');
    await page.waitForSelector('body > div:nth-child(28) > div.ui-dialog-buttonpane.ui-widget-content.ui-helper-clearfix > div > button:nth-child(1)');
    await page.click('body > div:nth-child(28) > div.ui-dialog-buttonpane.ui-widget-content.ui-helper-clearfix > div > button:nth-child(1)');
    await page.waitForNavigation();
    await page.evaluate(() => {
      let select = document.querySelector('a.mapmenuitem.upload');
      select.click();

    });
    var newEntry = "Name	Street	City	State	Country	Zipcode	Color \n" + name + "	" + street + "	" + city + "	" + state + "	" + country + "	" + zipcode + "	" + color;
    await page.waitFor(1000);
    await page.click('#ui-id-5');
    await page.waitForSelector("textarea#textcsv")
    await page.type('textarea#textcsv', newEntry);
    await page.waitFor(1000);
    await page.click('#csvtextsubmit');
    await page.waitFor(1000);
    await page.waitForSelector("#uploadconfirmsubmit > span")
    await page.click('#uploadconfirmsubmit > span');
    await page.waitFor(1000);
    await browser.close();
  }
}
