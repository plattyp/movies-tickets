'use strict';

angular.module('clientApp')
  .controller('MainCtrl', function ($scope, $location) {

    $scope.navLinks = [];
    setLinksBasedOnRoute();

    function setLinksBasedOnRoute() {
      if ($location.path().indexOf("/admin") > -1) {
        setAdminNavigation();
      } else {
        setClientNavigation();
      }
    }

    function setAdminNavigation() {
      $scope.navLinks = [{
          title: 'admin/manage_screens',
          linkText: 'Manage Screens'
      }, {
          title: 'admin/manage_movies',
          linkText: 'Manage Movies'
      }, {
          title: 'admin/manage_showings',
          linkText: 'Manage Showings'
      }];
    }

    function setClientNavigation() {
      $scope.navLinks = [{
          title: 'home',
          linkText: 'Home'
      }];
    }

    $scope.navClass = function (page) {
      var currentRoute = $location.path().substring(1) || 'home';
      return page === currentRoute ? 'active' : '';
    };
  });
