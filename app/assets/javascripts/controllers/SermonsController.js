angular.module('controllers', [])
    .controller('SermonsController', ['$scope', '$state', '$rootScope', 'SermonsService',
                                      function ($scope, $state, $rootScope, SermonsService) {
        $scope.data = {};

        $scope.save = function () {
            SermonsService.create($scope.data).then(function (id) {
                $state.go('/sermons/' + id);
                $rootScope.$broadcast('rootscope:broadcast', 'Sermon has been successfully saved');
            });
        };
    }]);
