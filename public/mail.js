(function(){

"use strict";

function MailController($scope, $http){

  this.getMail = function(userID){
    $http({
          url: '/mail/' + userID,
          method: "GET",
    }).then(function(response){
      $scope.userMail = response.data;
      console.log(response.data);
    });
  };

  this.sendMail = function(email){
    $http({
          url: '/sendemail',
          method: "POST",
          params: email,
    }).then(function(response){
      console.log(response.data);
    });
  };


  //Getting todays date
    var today  = new Date(),
        day    = today.getDate(),
        month  = today.getMonth()+1, //January is 0
        yyyy   = today.getFullYear();
  //Date set

  $scope.today = day + "/" + month + "/" + yyyy;

  }

    MailController.$inject = ['$scope','$http'];

angular
  .module('mailer', [])
  .controller('MailController', MailController)
  .config(['$compileProvider', function($compileProvider){
    $compileProvider.debugInfoEnabled(false);
  }]);

})();
