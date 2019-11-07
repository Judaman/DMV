

async function sendToWebPt(lName, fName) {

  'use strict';

  const puppeteer = require('puppeteer');

  const browser = await puppeteer.launch({
    headless: true,
    timeout: 90000,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });


  const page = await browser.newPage();

  await page.goto('https://auth.webpt.com/');

  //await page.waitForNavigation();

  await page.type('input#login-username', 'daniel.roth');
  await page.type('input#login-password', 'Yehudag123!');

  await Promise.all([
    page.click('input#login-button'),
    page.waitForNavigation({
      waitUntil: 'networkidle0'
    }),
  ]);

  await page.click('button.eviction-option.ok')

  await page.goto('https://app.webpt.com/patient/edit/');

  await page.type('input#ext-comp-1009', 'Yehuda');
  await page.type('input#ext-comp-1013', 'Gruberger');
  await page.type('input#ext-comp-1020', 'Male');
  await page.type('input#ext-comp-1023', '03');
  await page.type('input#ext-comp-1025', '28');
  await page.type('input#ext-comp-1027', '1985');


  await page.click('label#ext-comp-1053');

  await page.type('input#ext-comp-1131', 'Home');
  await page.waitFor(1000);
  // await page.waitForSelector('div#ext-gen454 > div.x-combo-list-item.x-combo-selected');

  await page.click('div#ext-gen454.x-combo-list-inner > div.x-combo-list-item.x-combo-selected');
  //await page.type(String.fromCharCode(13));ext-gen691

  //  await page.click('div.x-combo-list-item.x-combo-selected');

  await page.type('input#ext-comp-1133', '1225 Ocean Pkwy');

  await page.type('input#ext-comp-1134', 'Brooklyn');
  await page.type('input#ext-comp-1135', '11230');
  await page.type('input#ext-comp-1139', 'NY');
  await page.waitFor(1000);
  await page.click('div#ext-gen457.x-combo-list-inner > div.x-combo-list-item.x-combo-selected');



  await page.click('button#ext-gen403');

  await page.click('a#ext-gen120');

  //add contact info
  await page.click('label#ext-comp-1050');

// first open dropdown then select (this seems to be the best option)
  await page.click('img#ext-gen536');
  await page.type('div#ext-gen535 > input#ext-comp-1159', 'Work');

  await page.waitFor(2000);
  await page.waitForSelector('div#ext-gen559.x-combo-list-inner > div.x-combo-list-item.x-combo-selected');
  await page.click('div#ext-gen559.x-combo-list-inner > div.x-combo-list-item.x-combo-selected');
  await page.type('input#ext-comp-1166', '718');
  await page.type('input#ext-comp-1167', '123');
  await page.type('input#ext-comp-1168', '4567');

  await page.click('button#ext-gen488'),

    // add insurance
    await page.click('label#ext-comp-1057');
  await page.type('input#searchPayerName', 'AARP');
  await page.waitFor(1000);
  await page.waitForSelector('div#ext-gen633 > div.x-grid3-row.x-grid3-row-first.x-grid3-row-last');

  await page.click('div#ext-gen633 > div.x-grid3-row.x-grid3-row-first.x-grid3-row-last');

  await page.click('button#ext-gen577')


  await page.screenshot({
    path: 'example.png'
  });

  await browser.close();

};
