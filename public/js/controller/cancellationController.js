'use strict';

module.exports = function($scope,$http,$location) {

console.log($scope.idNo);
console.log($scope.phone);
$scope.showd=false;
var i;

  // var refreshConfirm = function () {
  //
  // };
  //
  // refreshConfirm();

$scope.showdetails = function() {


        $http.get('/cnfm/cnfm').success(function (response) {

            console.log(response);
            for(i=0;i<=response.length;i++){
       console.log(response[i].cnbookingid);
              if(response[i].Cid==$scope.idNo&&response[i].Mobile==$scope.phone){
           console.log($scope.idNo);
           console.log($scope.phone);
           $scope.cancellist = response[i];
           $scope.cancel = "";
           console.log(response[i]);
 // $scope.showd=true;
  $scope.showd=true;

       }
       }
    });


}


  $scope.cancelBook = function(id) {
    $http.delete('/cnfm/cnfm/' + id._id).success(function(response) {
        console.log(response);
        console.log('CANCELLED SUCCESSFULLY');
        alert('Cancellation Succesfull')
        $location.path('/home');
        // refreshConfirm();
});



  }




};
