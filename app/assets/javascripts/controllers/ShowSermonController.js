angular.module('showSermonController', [])
.controller('ShowSermonController', ['$scope', '$stateParams', 'SermonsService', function ($scope, $stateParams, SermonsService) {
  SermonsService.get($stateParams.id).then(function (sermon) {
    $scope.sermon = sermon;
  }, function (error) {
    $scope.error = error;
  });
}]);
