const express = require('express');
var app = express();
const sendToZeeMaps = require("./sendToZeeMaps");
const getReport = require("./getReport");
const sendToFingerCheck = require("./sendToFingerCheck");
var reportInJson;

app.use(express.static(__dirname + '/public'));
// This responds with "Hello World" on the homepage
app.get('/home', function(req, res) {
  console.log("Got a GET request for the homepage");
  //   res.send("home page" + req.params.id)
  res.sendFile('index.html', {
    root: __dirname
  })
})

app.get('/getReport/:startMonth/:startDay/:startYear/:endMonth/:endDay/:endYear', async function(req, res) {
  console.log("Got a GET request for the repoert page");
  console.log(req.params);
  var startMonth = req.params.startMonth;
  var startDay = req.params.startDay;
  var startYear = req.params.startYear;
  var endMonth = req.params.endMonth;
  var endDay = req.params.endDay;
  var endYear = req.params.endYear;

  await getReport.getReport(startMonth, startDay, startYear, endMonth, endDay, endYear).then(function(value) {

    reportInJson = value;
    res.send(value);
  })
  /*res.sendFile('report.html', {
    root: __dirname
  })*/
})

app.get('/sendToFingerCheck', async function(req, res) {
  console.log("Got a GET request for sendToFingerCheck");
  //res.send(reportInJson);
  await sendToFingerCheck.sendToFingerCheck(reportInJson).then(function(value) {
    res.send(value);
  }, function(err) {
    res.send(err)
    console.log(err)
  })
  /*res.sendFile('report.html', {
    root: __dirname
  })*/
})

app.get('/addPatient/:fName/:lName', function(req, res) {

  var fName = req.params.fName;
  var lName = req.params.lName;

  res.send("heelo  " + fName + lName)
});

app.get('/sendToZeeMaps/:lName/:fName/:street/:city/:state/:zipcode/:color', async function(req, res) {


  var name = req.params.lName + " " + req.params.fName;
  var street = req.params.street;
  var city = req.params.city;
  var state = req.params.state;
  var country = "US";
  var zipcode = req.params.zipcode;
  var color = req.params.color;


  await sendToZeeMaps.sendToZeeMaps(name, street, city, state, country, zipcode, color);
  res.send("Sent " + name)
});


const PORT = process.env.PORT || 8080;
var server = app.listen(PORT, function() {
  server.setTimeout(500000);
  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
})
