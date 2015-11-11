'use strict';

angular
  .module('clientApp')
  .provider('datetimepickerProvider', function () {
      var defaultOptions = {};

      this.$get = function () {
          return {
              getOptions: function () {
                  return defaultOptions;
              }
          };
      };
  })
  .directive('datetimepicker', ['$timeout','datetimepickerProvider', function ($timeout,datetimepickerProvider) {
      var defaultOptions = datetimepickerProvider.getOptions();

      return {
        require: '?ngModel',
        restrict: 'A',
        scope: {
          datetimepickerOptions: '@',
          onDateChangeFunction: '&',
          onClickFunction: '&'
        },
        link: function ($scope, $element, $attrs, controller) {
          var passedOptions = $scope.$eval($attrs.datetimepickerOptions);
          var options = $.extend({}, defaultOptions, passedOptions);

          $element.on('dp.change', function () {
            $timeout(function () {
              var dtp = $element.data('DateTimePicker');
              controller.$setViewValue(dtp.date());
              $scope.onDateChangeFunction();
            });
          });

          $element.on('click', function () {
            $scope.onClickFunction();
          });

          function setPickerValue() {
            var result = null;
            if (!!controller && !!controller.$viewValue) {
              result = controller.$viewValue;
            }
            var dtp = $element.data('DateTimePicker');
            dtp.date(result);
          }

          controller.$render = function () {
            setPickerValue();
          };
        
          $element.datetimepicker(options);
        }
      };
    }
  ]);