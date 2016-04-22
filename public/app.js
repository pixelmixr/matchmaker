'use strict';

angular.module('matchmaker', [
    'ngRoute', 'ngMaterial'
])
.config(function ($routeProvider, $locationProvider) {
    $routeProvider.when('/chat', {
        templateUrl: 'partial/chat',
        controller: 'ChatCtrl'
    });
    $routeProvider.otherwise({
        redirectTo: '/chat'
    });
    $locationProvider.html5Mode(true);
});