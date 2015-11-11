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
          title: 'admin',
          linkText: 'Home'
      },{
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

    // Watch for page changes to determine navigation tabs to show
    $scope.$watch(
      function watchPageChange( scope ) {
          return( $location.path() );
      },
      function handleNavigation( newValue, oldValue ) {
          setLinksBasedOnRoute();
      }
    );

    $scope.navClass = function (page) {
      var currentRoute = $location.path().substring(1) || 'home';
      return page === currentRoute ? 'active' : '';
    };
  });
