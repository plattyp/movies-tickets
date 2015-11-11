'use strict';

function MovieFactory($http) {
  var urlBase = '/api/movies';
  var movieFactory = {};

  movieFactory.getMovies = function() {
    return $http.get(urlBase);
  };

  movieFactory.getMoviesWithShowings = function(date) {
    return $http.get('api/showings_by_day?date=' + date);
  };

  movieFactory.createMovie = function(movie) {
    return $http.post(urlBase, {"movie": movie});
  };

  movieFactory.updateMovie = function(id, movie) {
    return $http.put(urlBase + '/' + id, {"movie": movie});
  };

  movieFactory.deleteMovie = function(id) {
    return $http.delete(urlBase + '/' + id);
  };

  return movieFactory;
}

angular
  .module('clientApp')
  .factory('MovieFactory', ['$http', MovieFactory]);