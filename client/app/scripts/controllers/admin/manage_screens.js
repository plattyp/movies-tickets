'use strict';

angular.module('clientApp')
  .controller('ManageScreensCtrl', function ($scope, AuditoriumFactory) {
    $scope.screens = [];
    $scope.createScreenObj;
    $scope.editAuditorium;
    $scope.formErrors = [];

    // Initial Setup Of View
    getScreens();
    resetCreateScreen();

    function getScreens() {
      AuditoriumFactory.getScreens()
        .success(function (screens) {
          $scope.screens = screens;
        })
        .error(function (error) {
          console.log(error);
        });
    };

    $scope.createScreen = function createScreen() {
      AuditoriumFactory.createScreen($scope.createScreenObj)
        .success(function (screens) {
          angular.element('#auditoriumCreateModal').modal('hide');
          getScreens();
          resetCreateScreen();
        })
        .error(function (errors) {
          var messages = [];
          for (var i in errors) {
            messages.push(errors[i][0]);
          }
          $scope.formErrors = messages;
        });
    };

    $scope.setScreenForEdit = function(screen) {
      $scope.editAuditorium = screen;
      $scope.formErrors = [];
    };

    $scope.updateScreen = function updateScreen() {
      var screen = $scope.editAuditorium;
      AuditoriumFactory.updateScreen(screen.id, screen)
        .success(function (screen) {
          angular.element('#auditoriumEditModal').modal('hide');
          getScreens();
        })
        .error(function (errors) {
          var messages = [];
          for (var i in errors) {
            messages.push(errors[i][0]);
          }
          $scope.formErrors = messages;
        });
    };

    $scope.deleteScreen = function deleteScreen(screen) {
      AuditoriumFactory.deleteScreen(screen.id)
        .success(function (screen) {
          getScreens();
        })
        .error(function (error) {
          console.log(error)
        });
    };

    $scope.resetForm = function() {
      resetCreateScreen();
      $scope.formErrors = [];
    }

    function resetCreateScreen() {
      $scope.createScreenObj = {
        name: "",
        capacity: 0
      };
    };
  });
