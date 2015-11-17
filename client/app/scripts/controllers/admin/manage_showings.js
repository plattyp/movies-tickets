'use strict';

angular.module('clientApp')
  .controller('ManageShowingsCtrl', function ($scope, ShowingFactory, MovieFactory, AuditoriumFactory, moment) {
    $scope.showings = [];
    $scope.movies = [];
    $scope.screens = [];
    $scope.createShowingObj;
    $scope.editShowingObj;
    $scope.showingForDeletion;
    $scope.formErrors = [];

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
      var showing = {
        showtime: $scope.createShowingObj.showtime,
        movie_id: $scope.createShowingObj.movie_id,
        auditorium_id: $scope.createShowingObj.auditorium_id
      }

      // Offset the time to the seconds of the browser
      if (showing.showtime) {
        var newDate = new Date()
        var offsetSeconds = newDate.getTimezoneOffset() * 60;
        showing.showtime = moment(showing.showtime.format()).utc().add(offsetSeconds,'seconds').format()
      }

      ShowingFactory.createShowing(showing)
        .success(function (showing) {
          angular.element('#showingCreateModal').modal('hide');
          getShowings();
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

    $scope.setShowingForEditAndShowEditModal = function(showing) {
      // Create Showing For Editing
      var editableShowing = {
        id: showing.id,
        showtime: moment(showing.showtime),
        movie_id: showing.movie_id,
        auditorium_id: showing.auditorium_id
      }
      $scope.editShowingObj = editableShowing;

      // Reset form for errors
      $scope.formErrors = [];

      angular.element('#showingEditModal').modal('show');
    };

    $scope.updateShowing = function updateShowing() {
      var showing = $scope.editShowingObj;
      ShowingFactory.updateShowing(showing.id, showing)
        .success(function (showing) {
          angular.element('#showingEditModal').modal('hide');
          getShowings();
        })
        .error(function (errors) {
          var messages = [];
          for (var i in errors) {
            messages.push(errors[i][0]);
          }
          $scope.formErrors = messages;
        });
    };

    $scope.promptForDeletion = function(showing) {
      angular.element('#showingDeletionConfirmationModal').modal('show');
      $scope.showingForDeletion = showing;
    };

    $scope.deleteShowing = function deleteShowing() {
      var showing = $scope.showingForDeletion;
      ShowingFactory.deleteShowing(showing.id)
        .success(function (showing) {
          angular.element('#showingDeletionConfirmationModal').modal('hide');
          getShowings();
        })
        .error(function (error) {
          console.log(error)
        });
    };

    $scope.resetFormAndShowCreateModal = function() {
      resetForm();
      angular.element('#showingCreateModal').modal('show');
    };

    function resetForm() {
      resetCreateShowingObj();
      $scope.formErrors = [];
    };

    function resetCreateShowingObj() {
      $scope.createShowingObj = {
        showtime: "",
        movie_id: 0,
        auditorium_id: 0
      };
    };
  });
