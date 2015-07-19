//= require angular/angular
//= require angular-ui-router/release/angular-ui-router
//= require angular-rails-templates
//= require angular-sanitize/angular-sanitize
//= require ng-s3upload/build/ng-s3upload
//= require_tree .

var pneumaApp = angular.module('pnuemaApp', ['ui.router', 'templates', 'ngSanitize', 'ngS3upload']);

pneumaApp.config(['$stateProvider', '$urlRouterProvider', 'ngS3Config',
                  function ($stateProvider, $urlRouterProvider, ngS3Config) {
                      ngS3Config.theme = 'bootstrap3';

                      $stateProvider
                          .state('dashboard', {
                              url: '/',
                              templateUrl: 'layout.html'
                          })
                          .state('dashboard.sermons', {
                              url: '/sermons/new',
                              templateUrl: 'partials/sermons/new.html'
                          });
                  }]);
