angular.module('services', [])
    .service('SermonsService', ['$http', '$q', function ($http, $q) {
        return {
            create: function (sermon) {
                var deferred = $q.defer();
                var url = window.location + '/api/v1/sermons';

                $http.post(url, sermon).success(function (data, status, headers, config) {
                    deferred.resolve(data.id);
                }).error(function (data, status, headers, config) {
                    deferred.resolve(data);
                });

                return deferred.promise;
            }
        };
    }]);
