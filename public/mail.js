(function(){

"use strict";

function MailController($scope, $http, $compile, $timeout, $sce){

  $scope.email = {
    to: 'Email To',
    from: 'Email From',
    subject: 'Subject',
    message: 'Message'

  };

  //get all mail for a selected user
  this.getMail = function(userID){

    $http({
        url: '/mail/' + userID,
        method: "GET",
    }).then(function(response){
      $scope.userMail = response.data;
    });

    return userID;

  };

  //send email to a selected user
  this.sendMail = function(emNew){

    $http({
          url: '/sendemail',
          method: "POST",
          data: emNew
    }).then(function(err, response){
      if(err) console.log(err);
      else console.log(response.data);
    });
    //After sending mail, get the sent to users emails
    this.getMail(emNew.to);

  };

  }

    MailController.$inject = ['$scope','$http', '$compile', '$timeout', '$sce'];

angular
  .module('mailer', [])
  .controller('MailController', MailController)
  .config(['$compileProvider', function($compileProvider){
    $compileProvider.debugInfoEnabled(false);
  }]);

})();
