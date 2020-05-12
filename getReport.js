module.exports = {
  getReport:

    async function getReport(startMonth, startDay, startYear, endMonth, endDay, endYear,password) {

      'use strict';
      const puppeteer = require('puppeteer');
      const tabletojson = require('tabletojson');
      const browser = await puppeteer.launch({
        headless: false,
        timeout: 90000,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });

      const page = await browser.newPage();
      await page.setViewport({
        width: 1200,
        height: 720
      })

      await page.setDefaultNavigationTimeout(500000)

      await page.goto('https://auth.webpt.com/');
      await page.type('input#login-username', 'daniel.roth');
      await page.type('input#login-password', password);
      await page.click('input#login-button');
      await page.waitForNavigation({timeout : 20000});
      await page.click('button.eviction-option.ok')
      await page.goto('https://app.webpt.com/billingReport.php');
      await page.select('select#StartDateMonth.inputBox', startMonth);
      await page.select('select#StartDateDay.inputBox', startDay);
      await page.select('select#StartDateYear.inputBox', startYear);
      await page.select('select#EndDateMonth.inputBox', endMonth);
      await page.select('select#EndDateDay.inputBox', endDay);
      await page.select('select#EndDateYear.inputBox', endYear);
      await page.select('select#DateConstraint.inputBox', 'fn');

      await page.click('input#mySubmit.inputBox')

      await page.waitForSelector('#billing > table.wPTStyleTable.v2.center.BillingReport.ta--billing-report--table');
      await page.waitFor(3000);
      //table is missing header so i'm adding it//
      await page.evaluate(
        function() {
          var allTables = document.querySelectorAll("#billing > table.wPTStyleTable.v2.center.BillingReport.ta--billing-report--table  > thead > tr > th.copay ");
          console.log(allTables);
          for (var i = 0; i < allTables.length; i++) {
            var newHeader = document.createElement("th");
            var textnode = document.createTextNode("Copay");
            newHeader.appendChild(textnode);
            allTables[i].insertAdjacentElement("afterend", newHeader)
          }
        });


      let allHTMLtables = await page.evaluate(
        function() {
          var allHTMLtables = [];
          var allTableElements = document.querySelectorAll("#billing > table.wPTStyleTable.v2.center.BillingReport.ta--billing-report--table");
          for (var i = 0; i < allTableElements.length; i++) {
            allHTMLtables.push(allTableElements[i].outerHTML)
          }
          return allHTMLtables;
        });
      var patientCount = await page.evaluate(function() {
        return document.querySelector("#billing > table.form-text > tbody > tr:nth-child(2) > td > table > tbody > tr > td.subHeaderTopLeft > span:nth-child(1)").innerHTML
      });
      var visitsCount = await page.evaluate(function() {
        return document.querySelector("#billing > table.form-text > tbody > tr:nth-child(2) > td > table > tbody > tr > td.subHeaderTopLeft > span:nth-child(2)").innerHTML
      });

      console.log(patientCount);
      console.log(visitsCount);

      var entries = []
      for (var indexOfTables = 0; indexOfTables < allHTMLtables.length; indexOfTables++) {


        var converted = tabletojson.convert(allHTMLtables[indexOfTables])[0];
        console.log(converted.length);

        for (var i = 0; i < converted.length; i++) {

          if (converted[i]["Date of Service"] != "") {
            var obj = {}
            obj.name = converted[i]["PT"];
            obj.DateofService = converted[i]["Date of Service"];
            obj.DateFinalized = converted[i]["Date Finalized"];
            obj.Visits = converted[i].Visits;

            var startDate = new Date(startYear, startMonth - 1, startDay);
            var serviceDate = new Date(Number(obj.DateofService.substr(6, 4)), Number(obj.DateofService.substr(0, 2)) - 1, Number(obj.DateofService.substr(3, 2)));

            //  console.log(obj);
            if (serviceDate.getTime() < startDate.getTime()) {

              obj.backgroundColor = "red";
              //    console.log(obj);
            } else {

              obj.backgroundColor = "inherit";
            }

            entries.push(obj)
          }
        }
      }
      //console.log(entries.length);
      await browser.close();
      return {
        entries: entries,
        patientCount: patientCount,
        visitsCount: visitsCount
      };

      /*    await page.screenshot({
            path: 'example.png'
          });*/
    }
};
