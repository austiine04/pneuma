angular.module('createSermonDirective', [])
.directive('purpleWidget', function () {
  return {
    restrict: 'A',
    link: function (scope, element, attributes) {
      element.children()[0].remove();
      element.children()[1].style.display = '';
    }
  };
});
