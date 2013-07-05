'use strict';

angular.module('GoogleRealtimeApp', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainController'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        // controller: 'AboutController'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        // controller: 'ContactController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
