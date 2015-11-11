'use strict';

function RatingFactory($http) {
  var urlBase = '/api/ratings';
  var ratingFactory = {};

  ratingFactory.getRatings = function() {
    return $http.get(urlBase);
  };

  return ratingFactory;
}

angular
  .module('clientApp')
  .factory('RatingFactory', ['$http', RatingFactory]);