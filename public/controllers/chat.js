'use strict';

angular.module('matchmaker')
.controller('ChatCtrl', ['$scope', 'Socket',
function($scope, Socket) {
    $scope.msgs = [];
    
    $scope.send = function(text) {
        Socket.emit('chat:msg', {
            timestamp: new Date(),
            text: text
        });
    };
    
    Socket.on('chat:msg', function(msg) {
        $scope.msgs.push(msg);
    });
}]);