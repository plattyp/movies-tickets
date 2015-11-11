'use strict';

angular.module('clientApp')
  .controller('ManageMoviesCtrl', function ($scope, MovieFactory, RatingFactory) {
    $scope.movies = [];
    $scope.ratings = [];
    $scope.createMovieObj;
    $scope.editMovieObj;

    getMovies();
    getRatings();
    resetCreateMovie();

    function getMovies() {
      MovieFactory.getMovies()
        .success(function (movies) {
          $scope.movies = movies;
        })
        .error(function (error) {
          console.log(error);
        });
    };

    function getRatings() {
      RatingFactory.getRatings()
        .success(function (ratings) {
          $scope.ratings = ratings;
        })
        .error(function (error) {
          console.log(error);
        });
    };

    $scope.createMovie = function createMovie() {
      MovieFactory.createMovie($scope.createMovieObj)
        .success(function (screens) {
          angular.element('#movieCreateModal').modal('hide');
          getMovies();
          resetCreateMovie();
        })
        .error(function (error) {
          console.log(error)
        });
    };

    $scope.setMovieForEdit = function(movie) {
      $scope.editMovieObj = movie;
    };

    $scope.updateMovie = function updateMovie() {
      var movie = $scope.editMovieObj;
      MovieFactory.updateMovie(movie.id, movie)
        .success(function (movie) {
          angular.element('#movieEditModal').modal('hide');
          getMovies();
        })
        .error(function (error) {
          console.log(error)
        });
    };

    $scope.deleteMovie = function deleteMovie(movie) {
      MovieFactory.deleteMovie(movie.id)
        .success(function (movie) {
          getMovies();
        })
        .error(function (error) {
          console.log(error)
        });
    };

    function resetCreateMovie() {
      $scope.createMovieObj = {
        title: "",
        bannerimageurl: "",
        rating_id: 0
      };
    };
  });
