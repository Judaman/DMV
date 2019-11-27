module.exports = {
  sendToFingerCheck: async function sendToFingerCheck(reportInJson) {



    const fs = require('fs');

    let headers = {
      "Content-Type": "application/json",
      "APIKEY": "4bfdda28-98d1-4086-b291-bb6f8f47e457",
      "ClientSecretKey": "0c15bf08-7cdb-46a0-9b1a-348be1bf18c4"
    };

    let fetch = require('node-fetch');
    const employeeNumbers = await allEmployeeNumbers();
    var url = "https://developer.fingercheck.com/api/v1/Punch/AddPaidHour";

    var txtFile = [];

    for (var indexOfVisits = 0; indexOfVisits < reportInJson.entries.length; indexOfVisits++) {
      var visit = reportInJson.entries[indexOfVisits];
      if (visit.name != "") {

        var employeeNumber = getEmployeeNumber(visit.name, employeeNumbers);

        var body = {
          "EmployeeNumber": employeeNumber,
          "Date": visit.DateofService,
          "EarningCode": "65 dollars",
          "PaidHourType": 0,
          "Hours": 1.0,
          "Amount": 65.0,
        };

        try {
          await fetch(url, {
              method: 'POST',
              headers: headers,
              contentType: 'application/json',
              body: JSON.stringify(body)
            })
            .then((res) => {
              console.log("res: " + res);
              console.log(res);
              return res.json()
            })
            .then((json) => {
              console.log("json:  " + JSON.stringify(json));
              // Do something with the returned data.
            })
        } catch (e) {
          console.log(e);
        }
      }
      txtFile.push(JSON.stringify(body));
    };

    fs.writeFile('test.txt', txtFile, (err) => {
      // throws an error, you could also catch it here
      if (err) throw err;

      // success case, the file was saved
      console.log('Lyric saved!');
    });

    function getEmployeeNumber(initals, employeeNumbers) {
      var employeeNumber = employeeNumbers[initals];
      return employeeNumber
    };

    async function allEmployeeNumbers() {
      let headers = {
        "Content-Type": "application/json",
        "APIKEY": "4bfdda28-98d1-4086-b291-bb6f8f47e457",
        "ClientSecretKey": "0c15bf08-7cdb-46a0-9b1a-348be1bf18c4"
      };
      let fetch = require('node-fetch');
      var url = "https://developer.fingercheck.com/api/v1/Employees/GetAllActiveEmployees";
      var employeeNumbersObj = {};

      await fetch(url, {
          method: 'GET',
          headers: headers,
          contentType: 'application/json',
        })
        .then((res) => {
          return res.json()
        })
        .then((json) => {
          var allEmployees = json;
          for (var i = 0; i < allEmployees.length; i++) {
            var firstInitial = String(allEmployees[i].FirstName)[0];

            if (allEmployees[i].MiddleInitial != " ") {
              var middleInitial = String(allEmployees[i].MiddleInitial)[0];
            } else {
              var middleInitial = "";
            }
            var lastInitial = String(allEmployees[i].LastName)[0];
            employeeNumbersObj[firstInitial + middleInitial + lastInitial] = allEmployees[i].EmployeeNumber;
          }
        });
      return employeeNumbersObj;
    }
  }
}
