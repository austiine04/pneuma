//TODO: rename this directive to some meaningful name
angular.module('createSermonDirective', [])
.directive('purpleWidget', function () {
  return {
    restrict: 'A',
    link: function (scope, element, attributes) {
      element.children()[0].style.float = 'left';
      element.children()[0].classList.remove('btn-primary');
      element.children()[1].classList.add('col-md-10');
      element.children()[1].classList.add('align-progress-bar');
    }
  };
});
