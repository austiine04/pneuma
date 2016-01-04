//TODO: rename this directive to some meaningful name
angular.module('createSermonDirective', [])
.directive('purpleWidget', function () {

  var styleButton = function (button) {
    button.style.float = 'left';
    button.classList.remove('btn-primary');
  };

  var styleProgressBar = function (progressBar) {
    progressBar.classList.add('col-md-10');
    progressBar.classList.add('align-progress-bar');
  };

  return {
    restrict: 'A',
    link: function (scope, element, attributes) {
      styleButton(element.children()[0]);
      styleProgressBar(element.children()[1]);
    }
  };
});
