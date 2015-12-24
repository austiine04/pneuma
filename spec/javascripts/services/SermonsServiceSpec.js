describe('SermonsService', function () {
  var mockHttpBackend, SermonsService, $rootScope, deferred, url;

  beforeEach(module('pneumaApp'));

  beforeEach(inject(function (_SermonsService_, $httpBackend, _$rootScope_, $q) {
    SermonsService = _SermonsService_;
    mockHttpBackend = $httpBackend;
    $rootScope = _$rootScope_;
    deferred = $q.defer();
    url = window.location.origin + '/api/v1/sermons';
  }));

  function resolvePromises (stuff) {
    $rootScope.$digest();
    mockHttpBackend.flush();
  }

  describe('create', function () {
    var sermon, returnedSermon;

    beforeEach(function () {
      sermon = {title: 'aaa-bbb-ccc', preacher: 'papa'};
      returnedSermon = angular.extend(sermon, {id: 'returned-sermon'});
    });

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
      SermonsService.create(sermon).then(function () {}, function (error) {
        expect(error).toEqual('Internal Server error');
      });
      resolvePromises();
    });
  });

  describe('all', function () {
    describe('success', function () {
      it('should return all sermons', function () {
        var sermons = [{title: 'sermon-1'}, {title: 'sermon-2'}, {title: 'sermon-3'}];
        mockHttpBackend.expectGET(url).respond(200, sermons);
        SermonsService.all().then(function (sermons) {
          expect(sermons.length).toEqual(3);
        });
        resolvePromises();
      });
    });

    describe('error', function () {
      it('should return error message', function () {
        mockHttpBackend.expectGET(url).respond(400, 'An error occured');
        $rootScope.$digest();
        SermonsService.all().then(function () {}, function (error) {
          expect(error).toEqual('An error occured');
        });
        resolvePromises();
      });
    });
  });

  describe('get', function () {
    var sermonUrl = url + '/1';

    describe('success', function () {
      it('should return the sermon', function () {
        mockHttpBackend.expectGET(sermonUrl).respond(200, {title: 'title', preacher: 'preacher'});

        SermonsService.get(1).then(function (sermon) {
          expect(sermon.title).toEqual('title');
          expect(sermon.preacher).toEqual('preacher');
        });
      });
    });

    describe('error', function () {
      it('should return error message from server', function () {
        var errorMessage = 'Internal Server error';
        mockHttpBackend.expectGET(sermonUrl).respond(500, errorMessage);

        SermonsService.get(1).then(function () {}, function (error) {
          expect(error).toEqual(errorMessage);
        });
      });
    });
  });
});
