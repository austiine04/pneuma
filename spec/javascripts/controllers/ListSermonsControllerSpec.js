describe('ListSermonsController', function () {
  var scope, $controller, $rootScope, deferred;
  var mockSermonsService = jasmine.createSpyObj('mockSermonsService', ['all']);

  beforeEach(module('pneumaApp'));

  beforeEach(inject(function (_$controller_, _$rootScope_, $q) {
    scope = _$rootScope_.$new();
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    deferred = $q.defer();
  }));

  describe('success', function () {
    describe('with results', function () {

      beforeEach(function () {
        var sermons = [{title: 'sermon 1'}, {title: 'sermon 2'}];
        deferred.resolve(sermons);
        mockSermonsService.all.and.returnValue(deferred.promise);
        $controller('ListSermonsController', {$scope: scope, SermonsService: mockSermonsService});
      });

      it('should call SermonsService all to get sermons', function () {
        expect(mockSermonsService.all).toHaveBeenCalled();
      });

      it('should add sermons to the scope', function () {
        $rootScope.$digest();
        expect(scope.sermons).toBeDefined();
        expect(scope.sermons.length).toEqual(2);
        expect(scope.sermons.length).toEqual(1);
      });
    });

    describe('without results', function () {
      it('should notify user that there no sermons', function () {
        deferred.resolve([]);
        mockSermonsService.all.and.returnValue(deferred.promise);

        $controller('ListSermonsController', {$scope: scope, SermonsService: mockSermonsService});

        $rootScope.$digest();
        expect(scope.noSermons).toBeDefined();
        expect(scope.noSermons).toEqual('There are currently no sermons');
      });
    });
  });

  describe('error', function () {
    it('should notify user about error', function () {
      deferred.reject('An error occured');
      mockSermonsService.all.and.returnValue(deferred.promise);

      $controller('ListSermonsController', {$scope: scope, SermonsService: mockSermonsService});

      $rootScope.$digest();
      expect(scope.errorMessage).toBeDefined();
      expect(scope.errorMessage).toEqual('An error occured, please contact the developers');
    });
  });
});
