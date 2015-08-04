describe('SermonsController', function () {
    var scope, $rootScope, deferred, $controller;
    var mockSermonService = jasmine.createSpyObj('mockSermonservice', ['create']);
    var mockState = jasmine.createSpyObj('mockState', ['go']);

    beforeEach(module('pneumaApp'));

    beforeEach(inject(function (_$rootScope_, _$controller_, $q) {
        scope = _$rootScope_.$new();
        $rootScope = _$rootScope_;
        $controller = _$controller_;
        deferred = $q.defer();
    }));

    it('should have a sermon model', function () {
        $controller('SermonsController', {$scope: scope});
        expect(scope.data).toBeDefined();
        expect(scope.data).toEqual({});
    });

    describe('save', function () {

        beforeEach(function () {
            scope.data = {title: 'title', preacher: 'preacher'};
        });

        afterEach(function () {
            mockState.go.calls.reset();
        });

        function createSuccessPromise () {
            deferred.resolve('sermon-id');
            mockSermonService.create.and.returnValue(deferred.promise);
        }

        it('should user sermon service to save sermons', function () {
            createSuccessPromise();
            $controller('SermonsController', {$scope: scope, SermonsService: mockSermonService});
            scope.save();
            expect(mockSermonService.create).toHaveBeenCalledWith(scope.data);
        });

        describe('successful upload', function () {
            beforeEach(function () {
                $controller('SermonsController', {$scope: scope});
            });

            it('should add image url to sermon', function () {
                $rootScope.$broadcast('s3upload:success', {}, {path: 'http://image-upload-path'});
                scope.$digest();
                expect(scope.data.image_url).toBeDefined();
                expect(scope.data.image_url).toEqual('http://image-upload-path');
            });

            it('should add audio url to sermon', function () {
                $rootScope.$broadcast('s3upload:success', {}, {path: 'http://audio-upload-path'});
                scope.$digest();
                expect(scope.data.audio_url).toBeDefined();
                expect(scope.data.audio_url).toEqual('http://audio-upload-path');
            });

            it('should add both urls to sermon', function () {
                $rootScope.$broadcast('s3upload:success', {}, {path: 'http://image-upload-path'});
                $rootScope.$broadcast('s3upload:success', {}, {path: 'http://audio-upload-path'});
                scope.$digest();
                expect(scope.data.image_url).toEqual('http://image-upload-path');
                expect(scope.data.audio_url).toEqual('http://audio-upload-path');
            });
        });

        describe('success', function () {

            beforeEach (function () {
                createSuccessPromise();
                $controller('SermonsController', {$scope: scope, $state: mockState, SermonsService: mockSermonService});
                scope.save();
            });

            it('should redirect to sermon details page on success', function () {
                $rootScope.$digest();
                expect(mockState.go).toHaveBeenCalledWith('/sermons/sermon-id');
            });

            it('should display success message', function () {
                spyOn($rootScope, '$broadcast');
                $rootScope.$digest();
                expect($rootScope.$broadcast).toHaveBeenCalledWith('rootscope:broadcast', 'Sermon has been successfully saved');
            });
        });

        describe('error', function () {
            var urlBefore = window.url;

            beforeEach(function () {
                deferred.reject('An error occured while saving the sermon');
                mockSermonService.create.and.returnValue(deferred.promise);
                $controller('SermonsController', {$scope: scope, $state: mockState, SermonsService: mockSermonService});
                scope.save();
                $rootScope.$digest();
            });

            it('should remain at the sermon form when saving fails', function () {
                expect(mockState.go).not.toHaveBeenCalled();
                expect(urlBefore).toEqual(window.url);
            });

            it('should display error message', function () {
                expect(scope.error).toEqual('An error occured while saving the sermon');
            });
        });
    });
});
