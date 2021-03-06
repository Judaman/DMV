const express = require('express');
const sendToZeeMaps = require("./sendToZeeMaps");
const getReport = require("./getReport");
const sendToFingerCheck = require("./sendToFingerCheck");
const sendToWebPt = require("./sendToWebPt");

var reportInJson;
var app = express();
app.use(express.static(__dirname + '/public'));

app.get('/home', function(req, res) {
  console.log("Got a GET request for the homepage");

  res.sendFile('index.html', {
    root: __dirname
  })
})

app.get('/getReport/:password/:startMonth/:startDay/:startYear/:endMonth/:endDay/:endYear', async function(req, res) {
  console.log("Got a GET request for the report page");
  console.log(req.params);
  var startMonth = req.params.startMonth;
  var startDay = req.params.startDay;
  var startYear = req.params.startYear;
  var endMonth = req.params.endMonth;
  var endDay = req.params.endDay;
  var endYear = req.params.endYear;
  var password = req.params.password;
// if (password !== "Benandesty1!") {
//   res.status(500).send("Incorrect Password");
//   return
// }

  await getReport.getReport(startMonth, startDay, startYear, endMonth, endDay, endYear,password).then(function(value) {

    reportInJson = value;
    res.send(value);
  }, function(err) {
    res.status(500).send(err);
    console.log(err)
  })
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

app.get('/addPatient/:lastName/:firstName/:middleName/:dob/:addressType/:address1/:address2/:city/:state/:zipCode/:phoneType/:phoneNumber/:additionalInfo/:caseTtile/:primaryInsurance/:subscriberId/:secondaryInsurance/:subscriberId2/:referringPhysician/:assignedTherapist', function(req, res) {

  var lastName = req.params.lastName;
  var firstName = req.params.firstName;
  var middleName = req.params.middleName;
  var dob = req.params.dob;
  var addressType = req.params.addressType;
  var address1 = req.params.address1;
  var address2 = req.params.address2;
  var city = req.params.city;
  var state = req.params.state;
  var zipCode = req.params.zipCode;
  var zeeMapsColor = req.params.zeeMapsColor;
  var discipline = req.params.discipline;
  var phoneType = req.params.phoneType;
  var phoneNumber = req.params.phoneNumber;
  var additionalInfo = req.params.additionalInfo;
  var caseTtile = req.params.caseTtile;
  var primaryInsurance = req.params.primaryInsurance;
  var subscriberId = req.params.subscriberId;
  var secondaryInsurance = req.params.secondaryInsurance;
  var subscriberId2 = req.params.subscriberId2;
  var relatedCause = req.params.relatedCause;
  var referringPhysician = req.params.referringPhysician;
  var assignedTherapist = req.params.assignedTherapist;
  sendToWebPt.sendToWebPt(lastName, firstName, middleName, dob, addressType, address1, address2, city, state, zipCode, phoneType, phoneNumber, additionalInfo, caseTtile, primaryInsurance, subscriberId, secondaryInsurance, subscriberId2, referringPhysician, assignedTherapist)
  console.log(req.params);
  res.send("heelo  " + req.params)
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
