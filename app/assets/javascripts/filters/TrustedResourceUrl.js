angular.module('trustedUrl', [])
    .filter('trustedResourceUrl', ['$sce', function ($sce) {
        return function (url) {
            return $sce.trustAsResourceUrl(url);
        };
    }]);
