describe('SermonsController', function () {
    var scope, mockHttpBackend;

    beforeEach (function () {
        module('pneumaApp');
        inject(function ($rootScope, $controller, $httpBackend) {
            scope = $rootScope.$new();
            mockHttpBackend = $httpBackend;
            $controller('SermonsController', {$scope: scope});
        });
    });

    it('should have a sermons model', function () {
        expect(scope.sermon).toBeDefined();
    });

    describe('save', function () {

        beforeEach(function () {
            scope.sermon = {title: 'Divine Speed', preacher: 'Prophet Brian Kagyezi'};
        });

        afterEach(function() {
            mockHttpBackend.verifyNoOutstandingExpectation();
            mockHttpBackend.verifyNoOutstandingRequest();
        });

        it('should post sermon details to api', function () {
            mockHttpBackend.expectPOST('/sermons', scope.sermon).respond(201, '');
            scope.save();
            mockHttpBackend.flush();
        });

        xit('success should add a success message to scope', function () {
            mockHttpBackend.whenPOST('/sermons', scope.sermon).respond(201, '');
            scope.save();
            expect(scope.success).toBeDefined();
            expect(scope.success).toEqual('Sermon has been successfully saved');
            mockHttpBackend.flush();
        });
    });
});
