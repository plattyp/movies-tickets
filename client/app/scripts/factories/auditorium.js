'use strict';

function AuditoriumFactory($http) {
  var urlBase = '/api/auditoria';
  var auditoriumFactory = {};

  auditoriumFactory.getScreens = function() {
    return $http.get(urlBase);
  };

  auditoriumFactory.createScreen = function(screen) {
    return $http.post(urlBase, {"auditorium": screen});
  };

  auditoriumFactory.updateScreen = function(id, screen) {
    return $http.put(urlBase + '/' + id, {"auditorium": screen});
  };

  auditoriumFactory.deleteScreen = function(id) {
    return $http.delete(urlBase + '/' + id);
  };

  return auditoriumFactory;
}

angular
  .module('clientApp')
  .factory('AuditoriumFactory', ['$http', AuditoriumFactory]);