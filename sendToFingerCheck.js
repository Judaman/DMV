module.exports = {

  sendToFingerCheck: async function sendToFingerCheck(reportInJson) {
    let headers = {
      "Content-Type": "application/json",
      "APIKEY": "4bfdda28-98d1-4086-b291-bb6f8f47e457",
      "ClientSecretKey": "0c15bf08-7cdb-46a0-9b1a-348be1bf18c4"
    };
    var reportInJson = [{
        name: 'YG',
        DateofService: '06/28/2019',
        DateFinalized: '11/03/2019 11:02 pm',
        Visits: '1'
      },
      {
        name: 'YG',
        DateofService: '07/01/2019',
        DateFinalized: '11/04/2019 11:14 pm',
        Visits: '1'
      },
      {
        name: 'YG',
        DateofService: '07/03/2019',
        DateFinalized: '11/05/2019 11:25 pm',
        Visits: '1'
      }
    ];
    let fetch = require('node-fetch');
    const employeeNumbers = await allEmployeeNumbers();

    var url = "https://developer.fingercheck.com/api/v1/Punch/AddPaidHour";

    for (var indexOfVisits = 0; indexOfVisits < reportInJson.length; indexOfVisits++) {
      var visit = reportInJson[indexOfVisits];
      if (visit.name != "") {
        var employeeNumber = getEmployeeNumber(visit.name, employeeNumbers);

        var body = {
          "EmployeeNumber": employeeNumber,
          "Date": visit.DateFinalized,
          "EarningCode": "65 dollars",
          "PaidHourType": 0,
          "Hours": 1.0,
          "Amount": 65.0,
        };
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
          });
      }
    }
  }

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
          if (allEmployees[i].MiddleName) {
            var middleInitial = String(allEmployees[i].MiddleName)[0];
          } else {
            var middleInitial = ""
          }
          var lastInitial = String(allEmployees[i].LastName)[0];
          employeeNumbersObj[firstInitial + middleInitial + lastInitial] = allEmployees[i].EmployeeNumber;
        }
      });

    return employeeNumbersObj;
  }
}
