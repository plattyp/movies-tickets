'use strict';

angular.module('clientApp')
  .controller('ManageMoviesCtrl', function ($scope, MovieFactory, RatingFactory) {
    $scope.movies = [];
    $scope.ratings = [];
    $scope.createMovieObj;
    $scope.editMovieObj;
    $scope.movieForDeletion;
    $scope.formErrors = [];

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
          resetForm();
        })
        .error(function (errors) {
          var messages = [];
          for (var i in errors) {
            messages.push(errors[i][0]);
          }
          $scope.formErrors = messages;
        });
    };

    $scope.setMovieForEditAndShowEditModal = function(movie) {
      $scope.editMovieObj = movie;
      $scope.formErrors = [];
      angular.element('#movieEditModal').modal('show');
    };

    $scope.updateMovie = function updateMovie() {
      var movie = $scope.editMovieObj;
      MovieFactory.updateMovie(movie.id, movie)
        .success(function (movie) {
          angular.element('#movieEditModal').modal('hide');
          getMovies();
        })
        .error(function (errors) {
          var messages = [];
          for (var i in errors) {
            messages.push(errors[i][0]);
          }
          $scope.formErrors = messages;
        });
    };

    $scope.promptForDeletion = function(movie) {
      angular.element('#movieDeletionConfirmationModal').modal('show');
      $scope.movieForDeletion = movie;
    };

    $scope.deleteMovie = function deleteMovie() {
      var movie = $scope.movieForDeletion;
      MovieFactory.deleteMovie(movie.id)
        .success(function (movie) {
          angular.element('#movieDeletionConfirmationModal').modal('hide');
          getMovies();
        })
        .error(function (error) {
          console.log(error)
        });
    };

    $scope.resetFormAndShowCreateModal = function() {
      resetForm();
      angular.element('#movieCreateModal').modal('show');
    }

    function resetForm() {
      resetCreateMovie();
      $scope.formErrors = [];
    }

    function resetCreateMovie() {
      $scope.createMovieObj = {
        title: "",
        bannerimageurl: "",
        rating_id: 0
      };
    };
  });
