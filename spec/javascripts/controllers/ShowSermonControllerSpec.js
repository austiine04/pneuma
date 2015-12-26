describe('ShowSermonController', function () {
  var scope, mockSermonService, mockStateParams, deferred, controller;
  mockStateParams = {id: 1};
  mockSermonService = jasmine.createSpyObj('mockSermonService', ['get']);

  beforeEach(module('pneumaApp'));

  beforeEach(inject(function (_$rootScope_, _$controller_, $q) {
    scope = _$rootScope_.$new();
    controller = _$controller_;
    deferred = $q.defer();
  }));

  describe('success', function () {

    beforeEach(function () {
      deferred.resolve({title: 'title', preacher: 'preacher'});
      mockSermonService.get.and.returnValue(deferred.promise);
      controller('ShowSermonController', {$scope: scope, $stateParams: mockStateParams, SermonsService: mockSermonService});
      scope.$digest();
    });

    it('should call sermon service get', function () {
      expect(mockSermonService.get).toHaveBeenCalledWith(1);
    });

    it('should add sermon to the scope', function () {
      expect(scope.sermon).toBeDefined();
      expect(scope.sermon.title).toEqual('title');
      expect(scope.sermon.preacher).toEqual('preacher');
    });
  });

  describe('failure', function () {
    beforeEach(function () {
      deferred.reject('An error occured');
      mockSermonService.get.and.returnValue(deferred.promise);
      controller('ShowSermonController', {$scope: scope, $stateParams: mockStateParams, SermonsService: mockSermonService});
      scope.$digest();
    });

    it('should not add error to scope', function(){
      expect(scope.error).toEqual('An error occured');
    });
  });
});
