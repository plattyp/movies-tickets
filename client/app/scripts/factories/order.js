'use strict';

function OrderFactory($http) {
  var urlBase = '/api/orders';
  var orderFactory = {};

  orderFactory.getOrders = function(movie_id) {
    var filteredURL = urlBase;
    if (movie_id) {
      filteredURL += '?movie_id=' + movie_id;
    }
    return $http.get(filteredURL);
  };

  orderFactory.createOrder = function(order) {
    return $http.post(urlBase, {"order": order});
  };

  return orderFactory;
}

angular
  .module('clientApp')
  .factory('OrderFactory', ['$http', OrderFactory]);