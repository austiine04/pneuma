describe('SermonsService', function () {
    var mockHttpBackend, SermonsService, $rootScope, deferred;

    beforeEach(module('pneumaApp'));

    beforeEach(inject(function (_SermonsService_, $httpBackend, _$rootScope_, $q) {
        SermonsService = _SermonsService_;
        mockHttpBackend = $httpBackend;
        $rootScope = _$rootScope_;
        deferred = $q.defer();
    }));

    describe('create', function () {
        var sermon, url, returnedSermon;

        beforeEach(function () {
            sermon = {title: 'aaa-bbb-ccc', preacher: 'papa'};
            returnedSermon = angular.extend(sermon, {id: 'returned-sermon'});
            url = window.location + '/api/v1/sermons';
        });

        function resolvePromises () {
            $rootScope.$digest();
            mockHttpBackend.flush();
        }

        it('should POST sermon to the sermons api', function (){
            mockHttpBackend.expectPOST(url, sermon).respond(201, returnedSermon);
            SermonsService.create(sermon);
            mockHttpBackend.flush();
        });

        it('should return sermon id on success', function () {
            mockHttpBackend.whenPOST(url, sermon).respond(201, returnedSermon);
            SermonsService.create(sermon).then(function(id) {
                expect(id).toEqual(returnedSermon.id);
            });
            resolvePromises();
        });

        it('should return error on failure', function () {
            mockHttpBackend.whenPOST(url, sermon).respond(500, 'Internal Server error');
            SermonsService.create(sermon).then(function (error) {
                expect(error).toEqual('Internal Server error');
            });
            resolvePromises();
        });
    });
});
