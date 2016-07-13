(function(){

"use strict";

function MailController($scope, $http){

    $scope.today = today;


  //Getting todays date
    var today  = new Date(),
        day    = today.getDate(),
        month  = today.getMonth()+1, //January is 0
        yyyy   = today.getFullYear(),
        dd     = HelperFunctions.formatDayAndMonth(day),
        mm     = HelperFunctions.formatDayAndMonth(month);
  //Date set

  }

    MailController.$inject = ['$scope','$http'];

angular
  .module('mailer', [])
  .controller('MailController', MailController)
  .config(['$compileProvider', function($compileProvider){
    $compileProvider.debugInfoEnabled(false);
  }]);

})();
