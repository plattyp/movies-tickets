'use strict';

angular.module('clientApp')
  .controller('OrderCtrl', function ($scope, $routeParams, ShowingFactory, OrderFactory, moment) {
    $scope.showing;
    $scope.order;
    $scope.formErrors;

    // Render Showing Information
    $scope.datePickerOptions = '{format:"MM-YYYY",viewMode:"months"}'
    $scope.expirationDateSelected = moment(new Date());
    getShowingDetails();

    function getShowingDetails() {
      ShowingFactory.getShowing($routeParams.showing_id)
        .success(function (showing) {
          $scope.showing = showing;
        })
        .error(function (error) {
          console.log(error)
        });
    }

    $scope.submitOrder = function() {
      $scope.order.showing_id = $scope.showing.id
      $scope.order.expirationdate = moment($scope.expirationDateSelected).format("MM/YYYY");
      OrderFactory.createOrder($scope.order)
        .success(function (order) {
          $scope.order = order;
        })
        .error(function (errors) {
          var messages = [];
          for (var i in errors) {
            var error = i + ' ' + errors[i];
            messages.push(error);
          }
          $scope.formErrors = messages;
        });
    }

    function resetOrderObj() {
      $scope.order = {
        name: "",
        email: "",
        creditcardnum: "",
        expirationdate: "",
        quantity: 0,
        showing_id: 0
      }
    }
    
  });