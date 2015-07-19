angular.module('controllers', [])
    .controller('SermonsController', ['$scope', '$resource', function ($scope, $resource) {
        $scope.sermon = {};
        var Sermon = $resource('/sermons');

        $scope.save = function () {
            var newSermon = new Sermon($scope.sermon);
            newSermon.$save();
        };
    }]);
