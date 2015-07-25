angular.module('controllers', [])
    .controller('SermonsController', ['$scope', '$state', 'SermonsService', function ($scope, $state, SermonsService) {
        $scope.data = {};

        $scope.save = function () {
            SermonsService.create($scope.data).then(function (id) {
                $state.go('/sermons/' + id);
            });
        };
    }]);
