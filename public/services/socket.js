'use strict';

angular.module('matchmaker')
.factory('Socket', ['socketFactory', function(socketFactory) {
    return socketFactory();
}]);