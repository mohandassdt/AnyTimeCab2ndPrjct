'use strict';


var angular = require('angular');
require('angular-route');
// var app = angular.module('movieApp', ['angular.filter']);
var app = angular.module('movieApp', [ 'ngRoute']);

require('./service');
require('./controller');

app.filter('unique', function() {

   return function(collection, keyname) {

      var output = [],
          keys = [];


      angular.forEach(collection, function(item) {

          var key = item[keyname];

          if(keys.indexOf(key) === -1) {

              keys.push(key);

              output.push(item);
          }
      });

      return output;
   };
});


app.config(function($routeProvider) {

  $routeProvider.when('/home', {
    templateUrl: 'views/home.html',
    controller: 'HomeController',
  })
  .when('/admin', {
    templateUrl: 'views/admin.html',
    controller: 'BookingController',
  })
  .when('/cancellation', {
    templateUrl: 'views/cancellation.html',
    controller: 'CancellationController',
  })
  .when('/moviebook', {
    templateUrl: 'views/moviebook.html',
    controller: 'TicketBookingController',
  })
  .when('/book', {
    templateUrl: 'views/book.html',
    controller: 'CabBookController',
  })
  .when('/confirmation', {
    templateUrl: 'views/Confirmation.html',
    controller: 'ConfirmationController',
  })
  .otherwise({
    redirectTo: '/home',
  });



  app.run(function($rootScope, $http, $location, $sessionStorage, $cookies) {
      if ($sessionStorage.tokenDetails) {
          $http.defaults.headers.common.Authorization = $sessionStorage.tokenDetails.token;
      }

      // redirect to login page if not logged in and trying to access a restricted page
      $rootScope.$on('$locationChangeStart', function(event, next, current) {
          var publicPages = ['/', '/Login', '/Register'];

          var authUser = $cookies.getObject('authUser');
          if (authUser != undefined) {
              var loggedInUser = authUser.currentUser.userInfo;
          }
          var restrictedPage = publicPages.indexOf($location.path()) === -1;
          if (restrictedPage && !$sessionStorage.tokenDetails && $location.path() != '') {
              $location.path('/Login');
          }
          // console.log(restrictedPage);
          // console.log($sessionStorage.tokenDetails);
      });
  });


  // app.filter('unique', function() {
  //     return function(input, key) {
  //         var unique = {};
  //         var uniqueList = [];
  //         for(var i = 0; i < input.length; i++){
  //             if(typeof unique[input[i][key]] == "undefined"){
  //                 unique[input[i][key]] = "";
  //                 uniqueList.push(input[i]);
  //             }
  //         }
  //         return uniqueList;
  //     };
  // });




  // here we define our unique filter
  // app.filter('unique', function() {
  //
  //    return function(collection, keyname) {
  //
  //       var output = [],
  //           keys = [];
  //
  //       angular.forEach(collection, function(item) {
  //           var key = item[keyname];
  //           if(keys.indexOf(key) === -1) {
  //
  //               keys.push(key);
  //
  //               output.push(item);
  //           }
  //       });
  //
  //       return output;
  //    };
  // });
// app.filter('unique', function() {
//
//    return function(collection, keyname) {
//
//       var output = [],
//           keys = [];
//
//
//       angular.forEach(collection, function(item) {
//
//           var key = item[keyname];
//
//           if(keys.indexOf(key) === -1) {
//
//               keys.push(key);
//
//               output.push(item);
//           }
//       });
//
//       return output;
//    };
// });
});
