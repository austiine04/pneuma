angular.module('controllers', [])
    .controller('SermonsController', ['$scope', '$state', '$rootScope', 'SermonsService', function ($scope, $state, $rootScope, SermonsService) {
        $scope.data = {};

        $scope.$on('s3upload:success', function (event, xhr, data) {
            if (data.path.match(/image/) !== null) {
                $scope.data.image_url = data.path;
            } else if (data.path.match(/audio/) !== null) {
                $scope.data.audio_url = data.path;
            }
        });

        $scope.save = function () {
            SermonsService.create($scope.data).then(function (id) {
                $state.go('/sermons/' + id);
                $rootScope.$broadcast('rootscope:broadcast', 'Sermon has been successfully saved');
            }, function (error) {
                $scope.error = error;
            });
        };
    }]);
