'use strict';

angular.module('clientApp')
  .controller('AdminCtrl', function ($scope, OrderFactory, MovieFactory) {
    $scope.orders = [];
    $scope.movies = [];

    // Filters
    $scope.selectedMovieId;

    $scope.getOrders = function() {
      OrderFactory.getOrders($scope.selectedMovieId)
        .success(function (orders) {
          $scope.orders = orders;
        })
        .error(function (error) {
          console.log(error);
        });
    };

    // Setup View
    $scope.getOrders();
    getMovies();

    function getMovies() {
      MovieFactory.getMovies()
        .success(function (movies) {
          $scope.movies = movies;
        })
        .error(function (error) {
          console.log(error);
        });
    };
  });
