describe('SermonsController', function () {
    var scope, rootScope, deferred;
    var mockSermonService = jasmine.createSpyObj('mockSermonservice', ['create']);
    var mockState = jasmine.createSpyObj('mockState', ['go']);

    beforeEach(module('pneumaApp'));

    beforeEach(function () {
        inject(function ($rootScope, $controller, $q) {
            scope = $rootScope.$new();
            rootScope = $rootScope;
            deferred = $q.defer();
            $controller('SermonsController', {$scope: scope, $state: mockState, SermonsService: mockSermonService});
        });
        deferred.resolve('sermon-id');
        mockSermonService.create.and.returnValue(deferred.promise);
    });

    it('should have a sermon model', function () {
        expect(scope.data).toBeDefined();
        expect(scope.data).toEqual({});
    });

    describe('save', function () {

        it('should user sermon service to save sermons', function () {
            scope.data = {title: 'title', preacher: 'preacher'};
            scope.save();
            expect(mockSermonService.create).toHaveBeenCalledWith(scope.data);
        });

        describe('success', function () {
            it('should redirect to sermon details page on success', function () {
                scope.data = {title: 'title', preacher: 'preacher'};
                scope.save();
                rootScope.$digest();
                expect(mockState.go).toHaveBeenCalledWith('/sermons/sermon-id');
            });

            it('should display success message');
        });
        describe('error', function () {
            it('should remain at the sermon form when saving fails');
            it('should display error message');
        });
    });
});
