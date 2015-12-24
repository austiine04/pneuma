angular.module('sermonService', [])
    .service('SermonsService', ['$http', '$q', function ($http, $q) {
        var deferred = $q.defer();
        var url = window.location.origin + '/api/v1/sermons';

        return {
            create: function (sermon) {
                $http.post(url, sermon).success(function (data, status, headers, config) {
                    deferred.resolve(data.id);
                }).error(function (error, status, headers, config) {
                    deferred.reject(error);
                });
                return deferred.promise;
            },

            all: function () {
                $http.get(url).success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function (error, status, headers, config) {
                    deferred.reject(error);
                });
                return deferred.promise;
            },

            get: function (sermonId) {
                var sermonUrl = url + '/' + sermonId;
                $http.get(sermonUrl).success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function (error, headers, status, config) {
                    deferred.reject(error);
                });
                return deferred.promise;
            }
        };
    }]);
