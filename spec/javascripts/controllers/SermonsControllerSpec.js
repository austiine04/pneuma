describe('SermonsController', function () {
    var scope, $rootScope, deferred;
    var mockSermonService = jasmine.createSpyObj('mockSermonservice', ['create']);
    var mockState = jasmine.createSpyObj('mockState', ['go']);

    beforeEach(module('pneumaApp'));

    beforeEach(inject(function (_$rootScope_, $controller, $q) {
        scope = _$rootScope_.$new();
        $rootScope = _$rootScope_;
        deferred = $q.defer();
        deferred.resolve('sermon-id');
        mockSermonService.create.and.returnValue(deferred.promise);
        $controller('SermonsController', {$scope: scope, $state: mockState, SermonsService: mockSermonService});
    }));

    it('should have a sermon model', function () {
        expect(scope.data).toBeDefined();
        expect(scope.data).toEqual({});
    });

    describe('save', function () {

        beforeEach(function () {
            scope.data = {title: 'title', preacher: 'preacher'};
            scope.save();
        });

        it('should user sermon service to save sermons', function () {
            expect(mockSermonService.create).toHaveBeenCalledWith(scope.data);
        });

        describe('success', function () {

            it('should redirect to sermon details page on success', function () {
                $rootScope.$digest();
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
