'use strict';

function OrderFactory($http) {
  var urlBase = '/api/orders';
  var orderFactory = {};

  orderFactory.createOrder = function(order) {
    return $http.post(urlBase, {"order": order});
  };

  return orderFactory;
}

angular
  .module('clientApp')
  .factory('OrderFactory', ['$http', OrderFactory]);