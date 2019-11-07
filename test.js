
allEmployeeNumbers()
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
        console.log(allEmployees);
        if (allEmployees[i].MiddleInitial != " ") {
          var middleInitial = String(allEmployees[i].MiddleInitial)[0];
        } else {
          var middleInitial = ""
        }
        var lastInitial = String(allEmployees[i].LastName)[0];
        employeeNumbersObj[firstInitial + middleInitial + lastInitial] = allEmployees[i].EmployeeNumber;
      }
    });
    console.log(employeeNumbersObj);
  return employeeNumbersObj;
}
