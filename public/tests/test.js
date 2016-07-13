describe('MailController', function () {

beforeEach(module('mailer'));

   it("should be registered", function() {
     expect(module).not.to.equal(null);
   });


  var $controller;

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));

  describe('sum', function () {
		it('should have email placeholders', function () {
			var $scope = {};
			var controller = $controller('MailController', { $scope: $scope });
			expect($scope.to).toBe('Email To');
		});
	});

});
