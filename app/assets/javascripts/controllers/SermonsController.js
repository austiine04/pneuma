angular.module('controllers', [])
    .controller('SermonsController', ['$scope', '$state', '$rootScope', 'SermonsService',
                                      function ($scope, $state, $rootScope, SermonsService) {
        $scope.data = {
          sermon: {}
        };

        $scope.$on('s3upload:success', function (event, xhr, data) {
            if (data.path.match(/image/) !== null) {
                $scope.data.sermon.branding_image_url = data.path;
            } else if (data.path.match(/audio/) !== null) {
                $scope.data.sermon.audio_file_url = data.path;
            }
        });

        $scope.save = function () {
            SermonsService.create($scope.data).then(function (sermonId) {
                $state.go('sermons.show', {id: sermonId});
                $rootScope.$broadcast('rootscope:broadcast', 'Sermon has been successfully saved');
            }, function (error) {
                $scope.error = error;
            });
        };
    }]);
