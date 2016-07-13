(function(){

"use strict";

function MailController($scope, $http, $compile, $timeout){

  //get all mail for a selected user
  this.getMail = function(userID){

    $http({
          url: '/mail/' + userID,
          method: "GET",
    }).then(function(response){
      $scope.userMail = response.data;
    });

  };

  //send email to a selected user
  this.sendMail = function(emailNew){

    $http({
          url: '/sendemail',
          method: "POST",
          data: email
    }).then(function(err, response){
      if(err) console.log(err);
      else console.log(response.data);
    });
    //After sending mail, get the sent to users emails
    this.getMail(email.to);

  };


  //Getting todays date
    var today  = new Date(),
        day    = today.getDate(),
        month  = today.getMonth()+1, //January is 0
        yyyy   = today.getFullYear();
  //Date set

  $scope.today = day + "/" + month + "/" + yyyy;

  }

    MailController.$inject = ['$scope','$http', '$compile', '$timeout'];

angular
  .module('mailer', [])
  .controller('MailController', MailController)
  .config(['$compileProvider', function($compileProvider){
    $compileProvider.debugInfoEnabled(false);
  }]);

})();
