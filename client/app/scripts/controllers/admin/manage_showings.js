'use strict';

angular.module('clientApp')
  .controller('ManageShowingsCtrl', function ($scope, ShowingFactory, MovieFactory, AuditoriumFactory, moment) {
    $scope.showings = [];
    $scope.movies = [];
    $scope.screens = [];
    $scope.createShowingObj;
    $scope.editShowingObj;

    // Initial Setup Of View
    getShowings();
    getMovies();
    getScreens();
    resetCreateShowingObj();

    // Date Formatting For Selector
    $scope.datePickerOptions = '{format:"MM/DD/YYYY hh:mm a"}'

    function getShowings() {
      ShowingFactory.getShowings()
        .success(function (showings) {
          $scope.showings = showings;
        })
        .error(function (error) {
          console.log(error);
        });
    };

    function getScreens() {
      AuditoriumFactory.getScreens()
        .success(function (screens) {
          $scope.screens = screens;
        })
        .error(function (error) {
          console.log(error);
        });
    };

    function getMovies() {
      MovieFactory.getMovies()
        .success(function (movies) {
          $scope.movies = movies;
        })
        .error(function (error) {
          console.log(error);
        });
    };

    $scope.createShowing = function createShowing() {
      var showing = $scope.createShowingObj;
      ShowingFactory.createShowing(showing)
        .success(function (showing) {
          angular.element('#showingCreateModal').modal('hide');
          getShowings();
          resetCreateShowingObj();
        })
        .error(function (error) {
          console.log(error)
        });
    };

    $scope.setShowingForEdit = function(showing) {
      // Create Showing For Editing
      var editableShowing = {
        id: showing.id,
        showtime: moment(showing.showtime),
        movie_id: showing.movie_id,
        auditorium_id: showing.auditorium_id
      }
      $scope.editShowingObj = editableShowing;
    };

    $scope.updateShowing = function updateShowing() {
      var showing = $scope.editShowingObj;
      ShowingFactory.updateShowing(showing.id, showing)
        .success(function (showing) {
          angular.element('#showingEditModal').modal('hide');
          getShowings();
        })
        .error(function (error) {
          console.log(error)
        });
    };

    $scope.deleteShowing = function deleteShowing(showing) {
      ShowingFactory.deleteShowing(showing.id)
        .success(function (showing) {
          getShowings();
        })
        .error(function (error) {
          console.log(error)
        });
    };

    function resetCreateShowingObj() {
      $scope.createShowingObj = {
        showtime: "",
        movie_id: 0,
        auditorium_id: 0
      };
    };
  });
