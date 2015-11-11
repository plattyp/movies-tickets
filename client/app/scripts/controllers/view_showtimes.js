'use strict';

angular.module('clientApp')
  .controller('ViewShowtimesCtrl', function ($scope, MovieFactory, moment) {
    $scope.movies = [];

    // Setup View
    $scope.dateSelected = moment(new Date()).format('YYYY-MM-DD');
    $scope.dateShown = moment($scope.dateSelected).format('YYYY-MM-DD');
    $scope.datePickerOptions = '{format:"YYYY-MM-DD"}'
    getShowings();

    function getShowings() {
      MovieFactory.getMoviesWithShowings($scope.dateShown)
        .success(function (movies) {
          $scope.movies = movies;
        })
        .error(function (error) {
          console.log(error);
        });
    };

    // Watch for changes on dateSelected so that it will update the date of dateShown on change
    $scope.$watch(
      function watchDateSelected( scope ) {
          return( $scope.dateSelected );
      },
      function handleDateSelectedChange( newValue, oldValue ) {
          $scope.dateShown = moment($scope.dateSelected).format('YYYY-MM-DD');
          getShowings();
      }
    );
  });
