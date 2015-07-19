angular.module('directives', [])
    .directive('purpleWidget', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attributes) {
                var button = element.children()[0];
                button.classList.remove('btn-primary');
            }
        };
    });
