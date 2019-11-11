var app = angular.module('myApp', []);

app.controller('myCtrl1', function($scope, $http, $sce) {

  $scope.months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", ];
  $scope.days = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];
  $scope.years = ["2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026"];
  $scope.startMonth = "06";
  $scope.startDay = "06";
  $scope.startYear = "2019";
  $scope.endMonth = "06";
  $scope.endDay = "06";
  $scope.endYear = "2019";
  $scope.jsonTable;

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

        console.log(response.data.length);

        $scope.jsonTable = response.data;
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
});
