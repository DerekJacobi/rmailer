describe('Testing mailCtrl', function() {
  var $scope, ctrl, $timeout, $httpBackend, $rootScope, $injector;

  beforeEach(function (){

    module('mailer');

    inject(function($rootScope, $controller, $q, _$timeout_, $httpBackend, $injector) {
      // create a scope object for us to use.

      $httpBackend = $injector.get('$httpBackend');

      $scope = $rootScope.$new();

      ctrl = $controller('MailController', {
        $scope: $scope
      });
    });
  });


  it('testing for scope and prefilled values', function() {

    expect($scope.email).toEqual({
      to: 'Email To',
      from: 'Email From',
      subject: 'Subject',
      message: 'Message'}
    );
  });


  it('should get mail for user 1', function (){

    //set up.
    var user = ctrl.getMail(1);

    //assert
    expect(user).toEqual(1);

  });

  it('should get mail for a user', inject(function($http, $httpBackend) {

    $http.get('http://localhost/mail/1')
      .success(function(data, status, headers, config) {
        $scope.valid = true;
      })
      .error(function(data, status, headers, config) {
        $scope.valid = false;
    });
    /* End */

    $httpBackend
      .when('GET', 'http://localhost/mail/1')
      .respond(200, { foo: 'bar' });

    $httpBackend.flush();

    expect($scope.valid).toBe(true);

  }));

  it('should send mail for a user', inject(function($http, $httpBackend) {

    $http.post('http://localhost/sendmail')
      .success(function(data, status, headers, config) {
        $scope.valid = true;
      })
      .error(function(data, status, headers, config) {
        $scope.valid = false;
    });
    /* End */

    $httpBackend
      .when('POST', 'http://localhost/sendmail')
      .respond(200, { foo: 'bar' });

    $httpBackend.flush();

    expect($scope.valid).toBe(true);

  }));


});
