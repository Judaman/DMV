//sendToFingerCheck()
async function fgTest() {
  const fetch = require('node-fetch');
  var url = "https://developer.fingercheck.com/api/v1/Reports/GetAbsenceRequestsByDate?startDate=2019-10-01&endDate=2019-11-01";
  var headers = {
    "Content-Type": "application/json",
    "APIKEY": "4bfdda28-98d1-4086-b291-bb6f8f47e457",
    "ClientSecretKey": "0c15bf08-7cdb-46a0-9b1a-348be1bf18c4"

  }
  /*  var data = {
      "name": "Wade Wilson",
      "occupation": "Murderer",
      "age": "30 (forever)"
  }*/
  await fetch(url, {
      method: 'GET',
      headers: headers,
      contentType: 'application/json',
      /*body: data*/
    })
    .then((res) => {
      console.log(res);
      return res.json()
    })
    .then((json) => {
      console.log(json);
      // Do something with the returned data.
    });
}
