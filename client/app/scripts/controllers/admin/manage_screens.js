'use strict';

angular.module('clientApp')
  .controller('ManageScreensCtrl', function ($scope, AuditoriumFactory) {
    $scope.screens = [];
    $scope.createAuditorium;
    $scope.editAuditorium;

    // Initial Setup Of View
    getScreens();
    resetCreateAuditorium();

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
      AuditoriumFactory.createScreen($scope.createAuditorium)
        .success(function (screens) {
          angular.element('#auditoriumCreateModal').modal('hide');
          getScreens();
          resetCreateAuditorium();
        })
        .error(function (error) {
          console.log(error)
        });
    };

    $scope.setScreenForEdit = function(screen) {
      $scope.editAuditorium = screen;
    };

    $scope.updateScreen = function updateScreen() {
      var screen = $scope.editAuditorium;
      AuditoriumFactory.updateScreen(screen.id, screen)
        .success(function (screen) {
          angular.element('#auditoriumEditModal').modal('hide');
          getScreens();
        })
        .error(function (error) {
          console.log(error)
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

    function resetCreateAuditorium() {
      $scope.createAuditorium = {
        name: "",
        capacity: 0
      };
    };
  });
