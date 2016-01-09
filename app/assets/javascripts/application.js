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
    'sermonService',
    'trustedUrl',
    'config'
]);

pneumaApp.config(['stateHelperProvider', '$urlRouterProvider', 'ngS3Config', '$provide',
    function (stateHelperProvider, $urlRouterProvider, ngS3Config, $provide) {
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
          name: 'index',
          url: '/',
          templateUrl: 'partials/sermons/index.html',
          controller: 'ListSermonsController'
        },
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

      $provide.decorator('s3UploadDirective', ['$delegate', function ($delegate) {
        $delegate[0].templateUrl = 'partials/sermons/upload-widget.html';
        return $delegate;
      }]);
    }]);
