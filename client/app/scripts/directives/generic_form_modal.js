'use strict';

angular
  .module('clientApp')
  .directive('genericFormModal', function genericFormModal() {
    return {
      restrict: 'E',
      transclude: true,
        scope: {
        modalId: "@",
        modalTitle: "@",
        successButtonText: "@",
        submitMethod: "&"
    },
    templateUrl: 'views/common/modal.html'
    };
});