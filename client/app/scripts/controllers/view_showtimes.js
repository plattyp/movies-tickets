'use strict';

angular.module('clientApp')
  .controller('ViewShowtimesCtrl', function ($scope, MovieFactory) {
    $scope.movies = [];
    $scope.showtimes = ["1:30PM","2:45PM","5:15PM","6:25PM","7:00PM","7:35PM"];

    // Get Data For View
    getShowings();

    function getShowings() {
      MovieFactory.getMoviesWithShowings()
        .success(function (movies) {
          $scope.movies = movies;
        })
        .error(function (error) {
          console.log(error);
        });
    };
  });
