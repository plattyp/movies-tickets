'use strict';

angular.module('clientApp')
  .controller('ManageScreensCtrl', function ($scope, AuditoriumFactory) {
    $scope.screens = [];
    $scope.createScreenObj;
    $scope.editAuditorium;
    $scope.screenForDeletion;
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

    $scope.setScreenForEditAndShowEditModal = function(screen) {
      $scope.editAuditorium = screen;
      $scope.formErrors = [];
      angular.element('#auditoriumEditModal').modal('show');
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

    $scope.promptForDeletion = function(screen) {
      angular.element('#screenDeletionConfirmationModal').modal('show');
      $scope.screenForDeletion = screen;
    };

    $scope.deleteScreen = function deleteScreen() {
      var screen = $scope.screenForDeletion;
      AuditoriumFactory.deleteScreen(screen.id)
        .success(function (screen) {
          angular.element('#screenDeletionConfirmationModal').modal('hide');
          getScreens();
        })
        .error(function (error) {
          console.log(error)
        });
    };

    $scope.resetFormAndShowCreateModal = function() {
      resetForm();
      angular.element('#auditoriumCreateModal').modal('show');
    };

    function resetForm() {
      resetCreateScreen();
      $scope.formErrors = [];
    };

    function resetCreateScreen() {
      $scope.createScreenObj = {
        name: "",
        capacity: 0
      };
    };
  });
