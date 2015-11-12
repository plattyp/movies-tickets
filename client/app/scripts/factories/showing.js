'use strict';

function ShowingFactory($http) {
  var urlBase = '/api/showings';
  var showingFactory = {};

  showingFactory.getShowings = function() {
    return $http.get(urlBase);
  };

  showingFactory.getShowing = function(id) {
    return $http.get(urlBase + '/' + id);
  };

  showingFactory.getFilteredShowings = function(date) {
    return $http.get('api/filtered_showings?date=' + date);
  };

  showingFactory.createShowing = function(showing) {
    return $http.post(urlBase, {"showing": showing});
  };

  showingFactory.updateShowing = function(id, showing) {
    return $http.put(urlBase + '/' + id, {"showing": showing});
  };

  showingFactory.deleteShowing = function(id) {
    return $http.delete(urlBase + '/' + id);
  };

  return showingFactory;
}

angular
  .module('clientApp')
  .factory('ShowingFactory', ['$http', ShowingFactory]);