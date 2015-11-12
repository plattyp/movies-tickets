'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular
  .module('clientApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angularMoment'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/order/:showing_id', {
        templateUrl: 'views/order.html',
        controller: 'OrderCtrl',
        controllerAs: 'order'
      })
      .when('/admin', {
        templateUrl: 'views/admin/admin.html',
        controller: 'AdminCtrl',
        controllerAs: 'admin'
      })
      .when('/admin/manage_screens', {
        templateUrl: 'views/admin/manage_screens.html',
        controller: 'ManageScreensCtrl',
        controllerAs: 'managescreens'
      })
      .when('/admin/manage_movies', {
        templateUrl: 'views/admin/manage_movies.html',
        controller: 'ManageMoviesCtrl',
        controllerAs: 'managemovies'
      })
      .when('/admin/manage_showings', {
        templateUrl: 'views/admin/manage_showings.html',
        controller: 'ManageShowingsCtrl',
        controllerAs: 'manageshowings'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
