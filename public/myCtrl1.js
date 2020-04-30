var app = angular.module('myApp', []);

app.controller('myCtrl1', function($scope, $http, $sce) {

  $scope.months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", ];
  $scope.days = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];
  $scope.years = ["2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026"];
  $scope.startMonth = "06";
  $scope.startDay = "06";
  $scope.startYear = "2020";
  $scope.endMonth = "06";
  $scope.endDay = "06";
  $scope.endYear = "2020";
  $scope.jsonTable;
  $scope.patientCount;
  $scope.visitsCount;

  $scope.password = "";

  $scope.showLoading = false;
  $scope.showReportButton = true;
  $scope.showFGButton = false;
  $scope.showSentButton = false;
  $scope.showErrorButton = false;
  //  $scope.report =
  $scope.getReport = function(startMonth, startDay, startYear, endMonth, endDay, endYear) {
    $scope.showLoading = true;
    $scope.showReportButton = false;
    console.log(startMonth, startDay, startYear, endMonth, endDay, endYear);

    $http.get("/getReport/" + $scope.password + "/" + startMonth + "/" + startDay + "/" + startYear + "/" + endMonth + "/" + endDay + "/" + endYear)
      .then(function mySuccess(response) {


        $scope.patientCount = response.data.patientCount.replace("&nbsp;", " ");
        $scope.visitsCount = response.data.visitsCount.replace("&nbsp;", " ");;

        $scope.jsonTable = response.data.entries;
        $scope.showLoading = false;
        $scope.showFGButton = true;

      }, function myError(response) {
        $scope.showLoading = false;
        $scope.showErrorButton = true;

        if (response.data == "Incorrect Password") {
          alert("Incorrect Password")
        }

        console.log(response);
      });

  };

  $scope.sendToFingerCheck = function() {
    $scope.showLoading = true;
    $scope.showFGButton = false;
    $http.get("/sendToFingerCheck/")
      .then(function mySuccess(response) {
          console.log(response);
        $scope.showLoading = false;
        $scope.showSentButton = true;
      }, function myError(response) {
        $scope.showErrorButton = true;
        $scope.showLoading = false;
        console.log(response);
      });
  };

  $scope.sortByDos = function() {
    $scope.jsonTable.sort(function(a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(b.DateofService) - new Date(a.DateofService);
    });
  };
  $scope.sortByDf = function() {
    $scope.jsonTable.sort(function(a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(b.DateFinalized) - new Date(a.DateFinalized);
    });
  };


  $scope.sortByName = function() {
  $scope.jsonTable.sort(function(a, b) {
      var textA = a.name.toUpperCase();
      var textB = b.name.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    })
  };


});
