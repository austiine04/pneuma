//= require angular/angular
//= require angular-ui-router/release/angular-ui-router
//= require angular-rails-templates
//= require_tree .

var pneumaApp = angular.module('pnuemaApp', ['ui.router', 'templates']);

pneumaApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'layout.html'
        })
        .state('dashboard.sermons', {
            url: '/sermons/new',
            templateUrl: 'partials/sermons/new.html'
        });
}]);
