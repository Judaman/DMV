module.exports = {
  sendToWebPt:

    async function sendToWebPt(lastName, firstName, middleName, dob, addressType, address1, address2, city, state, zipCode, phoneType, phoneNumber, additionalInfo, caseTtile, primaryInsurance, subscriberId, secondaryInsurance, subscriberId2, referringPhysician, assignedTherapist) {

      'use strict';

      const puppeteer = require('puppeteer');

      const browser = await puppeteer.launch({
        headless: false,
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

      //basic patient info
      await page.type('input#ext-comp-1009', firstName);
      await page.type('input#ext-comp-1011', middleName);
      await page.type('input#ext-comp-1013', lastName);
      await page.type('input#ext-comp-1013', lastName);
      await page.type('input#ext-comp-1020', 'Male');
      await page.type('input#ext-comp-1023', dob.substring(0, 2));
      await page.type('input#ext-comp-1025', dob.substring(2, 4));
      await page.type('input#ext-comp-1027', dob.substring(4, 8));

      //add address
      await page.click('label#ext-comp-1053');
      await page.type('input#ext-comp-1131', addressType);
      await page.waitFor(1000);
      await page.click('div#ext-gen454.x-combo-list-inner > div.x-combo-list-item.x-combo-selected');
      await page.type('input#ext-comp-1133', address1);
      await page.type('input#ext-comp-1134', city);
      await page.type('input#ext-comp-1135', zipCode);
      await page.type('input#ext-comp-1138', address2);
      await page.type('input#ext-comp-1139', state);
      await page.type('input#ext-comp-1142', additionalInfo);
      await page.waitFor(1000);
      await page.click('div#ext-gen457.x-combo-list-inner > div.x-combo-list-item.x-combo-selected');



      await page.click('button#ext-gen403');
      await page.click('a#ext-gen120');

      //add contact info
      await page.click('label#ext-comp-1050');
      // first open dropdown then select (this seems to be the best option)
      await page.click('img#ext-gen536');
      await page.type('div#ext-gen535 > input#ext-comp-1159', phoneType);
      await page.waitFor(2000);
      await page.waitForSelector('div#ext-gen559.x-combo-list-inner > div.x-combo-list-item.x-combo-selected');
      await page.click('div#ext-gen559.x-combo-list-inner > div.x-combo-list-item.x-combo-selected');
      await page.type('input#ext-comp-1166', phoneNumber);
      await page.click('button#ext-gen488');

      // add insurance
      await page.click('label#ext-comp-1057');
      await page.type('input#searchPayerName', primaryInsurance);
      await page.waitFor(1000);
      await page.waitForSelector('div#ext-gen633 > div.x-grid3-row.x-grid3-row-first.x-grid3-row-last');
      await page.click('div#ext-gen633 > div.x-grid3-row.x-grid3-row-first.x-grid3-row-last');
      await page.click('button#ext-gen577')
      await page.type('input#ext-comp-1328', subscriberId);


      await page.click('button#ext-gen577')

      await page.type('input#ext-comp-1240', firstName);
      await page.type('input#ext-comp-1242', lastName);
      await page.type('input#ext-comp-1245', dob);
      await page.type('input#ext-comp-1260', addressType);
      await page.waitFor(2000);
      await page.waitForSelector('div#ext-gen860.x-combo-list-inner > div.x-combo-list-item.x-combo-selected');
      await page.click('div#ext-gen860.x-combo-list-inner > div.x-combo-list-item.x-combo-selected');

      await page.type('input#ext-comp-1261', address1);
      await page.type('input#ext-comp-1262', city);
      await page.type('input#ext-comp-1263', zipCode);
      await page.type('input#ext-comp-1243', "Male");
      await page.waitFor(2000);
      await page.waitForSelector('div#ext-gen862.x-combo-list-inner > div.x-combo-list-item.x-combo-selected');
      await page.click('div#ext-gen862.x-combo-list-inner > div.x-combo-list-item.x-combo-selected');
      await page.type('input#ext-comp-1250', 'Other');
      await page.waitFor(2000);
      await page.waitForSelector('div#ext-gen864.x-combo-list-inner > div.x-combo-list-item.x-combo-selected');
      await page.click('div#ext-gen864.x-combo-list-inner > div.x-combo-list-item.x-combo-selected');



      await page.type('input#ext-comp-1266', state);
      await page.waitFor(2000);
      await page.waitForSelector('div#ext-gen866.x-combo-list-inner > div.x-combo-list-item.x-combo-selected');
      await page.click('div#ext-gen866.x-combo-list-inner > div.x-combo-list-item.x-combo-selected');
      await page.type('input#ext-comp-1282', phoneNumber);


//add case
      await page.click('button#ext-gen577')
      await page.click('label#ext-comp-1060')
      await page.type('input#ext-comp-1400', caseTtile);
      await page.type('input#PrimaryIns', primaryInsurance);

      await page.waitFor(1000);
      await page.waitForSelector('#ext-gen1077 > div.x-combo-list-item.x-combo-selected');
      await page.click('#ext-gen1077 > div.x-combo-list-item.x-combo-selected');

      await page.type('input#RelatedCause', 'None of the Above');
      await page.waitForSelector('#ext-gen1080 > div.x-combo-list-item.x-combo-selected');
      await page.click('#ext-gen1080 > div.x-combo-list-item.x-combo-selected');

      await page.waitFor(1000);
      //  await page.waitForSelector("#ext-gen-1082 > div.x-combo-list-item.x-combo-selected")
      //  await page.click('#ext-gen-1082 > div.x-combo-list-item.x-combo-selected');
      await page.type('#ext-comp-1412', referringPhysician); //must be last name only in order to work
      await page.waitForSelector("#ext-gen1082 > div.x-combo-list-item.x-combo-selected")
      await page.click('#ext-gen1082 > div.x-combo-list-item.x-combo-selected');

      await page.type('#ext-comp-1419', assignedTherapist);
      await page.waitForSelector("#ext-gen1123 > div.x-combo-list-item.x-combo-selected")
      await page.click("#ext-gen1123 > div.x-combo-list-item.x-combo-selected")

      await page.click('#ext-gen884');
      return
      await page.click('#ext-gen19');
      await page.waitFor(1000);

      await page.screenshot({
        path: 'example.png'
      });

      //  await browser.close();

    }
}
