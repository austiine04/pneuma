//= require angular/angular
//= require angular-ui-router/release/angular-ui-router
//= require angular-ui-router.stateHelper/statehelper
//= require angular-rails-templates
//= require angular-sanitize/angular-sanitize
//= require ng-s3upload/build/ng-s3upload
//= require_tree .

var pneumaApp = angular.module('pneumaApp', [
    'ui.router',
    'ui.router.stateHelper',
    'templates',
    'ngSanitize',
    'ngS3upload',
    'createSermonController',
    'listSermonsController',
    'showSermonController',
    'createSermonDirective',
    'sermonService',
    'trustedUrl',
    'config'
]);

pneumaApp.config(['stateHelperProvider', '$urlRouterProvider', 'ngS3Config',
    function (stateHelperProvider, $urlRouterProvider, ngS3Config) {

      ngS3Config.theme = 'bootstrap3';

      $urlRouterProvider.otherwise('/');

      stateHelperProvider
        .state({
          name: 'home',
          template: '<div ui-view></div>',
          children: [
            {
              name: 'list-sermons',
              url: '/',
              templateUrl: 'partials/sermons/index.html',
              controller: 'ListSermonsController'
            }
          ]
        })
      .state({
        name: 'sermons',
        url: '/sermons',
        template: '<div ui-view></div>',
        children: [
          {
            name: 'new',
            url: '/new',
            templateUrl: 'partials/sermons/new.html',
            controller: 'SermonsController'
          },
          {
            name: 'show',
            url: '/:id',
            templateUrl: 'partials/sermons/show.html',
            controller: 'ShowSermonController'
          }
        ]
      })
    }]);
