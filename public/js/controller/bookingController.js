'use strict';

module.exports = function($scope, $http,$log) {


  var refreshConfirm= function () {
        $http.get('/cnfm/cnfm').success(function (response) {
            console.log('cab Book READ IS SUCCESSFUL');
            $scope.cndetaillist = response;
            $scope.cndetail = "";
        });
    };

    refreshConfirm();
 // $scope.dateBooked=document.getElementById("dateB").value;

$scope.BookedCabs=false;

var j;
var uniqueObj = [];
$scope.vieBook=function(){
  $scope.dateBooked=document.getElementById("dateB").value;
console.log($scope.dateBooked);

for(j=0;j<=$scope.cndetaillist.length;j++){
  console.log($scope.cndetaillist[j].CPickdate);
if($scope.cndetaillist[j].CPickdate==$scope.dateBooked){
uniqueObj.push($scope.cndetaillist[j]);

  $scope.BookedCabs=true;

}
}

}
  $scope.alBoklist=uniqueObj;

var refreshType = function () {
      $http.get('/crtype/crtype').success(function (response) {
          console.log('theater READ IS SUCCESSFUL');
          $scope.typelist = response;
          $scope.type = "";
      });
  };

  refreshType();

  $scope.addType = function () {
      console.log($scope.type);
      $http.post('/crtype/crtype', $scope.type).success(function (response) {
          console.log(response);
          console.log("TYPE CREATE IS SUCCESSFUL");
          refreshType();
      });
  };




  $scope.removeType = function (id) {
      console.log(id);
      $http.delete('/crtype/crtype/' + id._id).success(function (response) {
          console.log(response);
          console.log('theater DELETED SUCCESSFULLY');
          refreshType();
      });
  };

  $scope.editType = function (id) {
       $http.get('/crtype/crtype/' + id._id).success(function (response) {
          $scope.type = response[0];
      });
  };

  $scope.updateType = function () {
      console.log("theater REACHED UPDATE");
      console.log($scope.type._id);
      $http.put('/crtype/crtype/' + $scope.type._id, $scope.type).success(function (response) {
          console.log(response);
          refreshType();
      })
  }


var refreshDriver = function () {
      $http.get('/drive/drive').success(function (response) {
          console.log('READ IS SUCCESSFUL');
          $scope.driverlist = response;
          $scope.drive = "";
      });
  };

  refreshDriver();
var clickedId;
  $scope.addDriver = function () {
    clickedId='DR' + Math.random().toString(10).substr(2,5);
  $scope.drive.Did=clickedId;
      console.log($scope.drive);
      $http.post('/drive/drive', $scope.drive).success(function (response) {
          console.log(response);
          console.log("CREATE IS SUCCESSFUL");
          refreshDriver();
      });
  };

  $scope.removeDriver = function (id) {
      console.log(id);
      $http.delete('/drive/drive/' + id._id).success(function (response) {
          console.log(response);
          console.log('DELETED SUCCESSFULLY');
          refreshDriver();
      });
  };

  $scope.editDriver = function (id) {
       $http.get('/drive/drive/' + id._id).success(function (response) {
          $scope.drive = response[0];
      });
  };

  $scope.updateDriver = function () {
      console.log("REACHED UPDATE");
      console.log($scope.drive._id);
      $http.put('/drive/drive/' + $scope.drive._id, $scope.drive).success(function (response) {
          console.log(response);
          refreshDriver();
      })
  }



var refreshcity1 = function () {
      $http.get('/ctyNa/ctyNa').success(function (response) {
          console.log('READ IS SUCCESSFUL');
          $scope.citylistN = response;
          $scope.cityN = "";
      });
  };
  refreshcity1();

  $scope.addCityName = function () {

      console.log($scope.cityN);
      $http.post('/ctyNa/ctyNa', $scope.cityN).success(function (response) {
          console.log(response);
          console.log("CREATE IS SUCCESSFUL");
          refreshcity1();
      });
  };

  $scope.removeCity = function (id) {
      console.log(id);
      $http.delete('/ctyNa/ctyNa/' + id._id).success(function (response) {
          console.log(response);
          console.log('DELETED SUCCESSFULLY');
          refreshcity1();
      });
  };

  $scope.editCity = function (id) {
       $http.get('/ctyNa/ctyNa/' + id._id).success(function (response) {
          $scope.cityN = response[0];
      });
  };

  $scope.updateCity = function () {
      console.log("REACHED UPDATE");
      console.log($scope.cityN._id);
      $http.put('/ctyNa/ctyNa/' + $scope.cityN._id, $scope.cityN).success(function (response) {
          console.log(response);
          refreshcity1();
      })
  }





};
