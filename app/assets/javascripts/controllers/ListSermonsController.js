angular.module('list-sermons-controller', [])
  .controller('ListSermonsController', ['$scope', 'SermonsService', function ($scope, SermonsService) {

      var errorCallback = function (error) {
          $scope.errorMessage = 'An error occured, please contact the developers';
      };

      var successCallback = function (data) {
          data.length > 0 ? $scope.sermons = data : $scope.noSermons = 'There are currently no sermons';
      };

      SermonsService.all().then(successCallback, errorCallback);
  }]);
