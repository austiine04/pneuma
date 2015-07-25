//= require angular/angular
//= require angular-ui-router/release/angular-ui-router
//= require angular-rails-templates
//= require angular-sanitize/angular-sanitize
//= require angular-resource/angular-resource
//= require ng-s3upload/build/ng-s3upload
//= require_tree .

var pneumaApp = angular.module('pneumaApp', [
    'ui.router',
    'ngResource',
    'templates',
    'ngSanitize',
    'ngS3upload',
    'controllers',
    'directives',
    'services'
]);

pneumaApp.config(['$stateProvider', '$urlRouterProvider', 'ngS3Config',
                  function ($stateProvider, $urlRouterProvider, ngS3Config) {
                      ngS3Config.theme = 'bootstrap3';

                      $stateProvider
                          .state('dashboard', {
                              url: '/',
                              templateUrl: 'layout.html',
                              controller: 'SermonsController'
                          })
                          .state('dashboard.sermons', {
                              url: 'sermons/new',
                              templateUrl: 'partials/sermons/new.html'
                          });
                  }]);
