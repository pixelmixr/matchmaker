'use strict';

angular.module('matchmaker')
.provider('socketFactory', [function() {
    var defaultPrefix = 'socket:';
    var ioSocket;
    
    this.$get = function($rootScope, $timeout) {
        
        var asyncAngularify = function(socket, callback) {
            return callback ? function() {
                var args = arguments;
                $timeout(function() {
                    callback.apply(socket, args);
                }, 0);
            } : angular.noop;
        };
        
        return function socketFactory(options) {
            
            options = options || {
                ioSocket: io.connect(),
                prefix: defaultPrefix,
                scope: $rootScope
            };
            var socket = options.ioSocket;
            
            function addListener(eventName, callback) {
                socket.on(eventName, asyncAngularify(socket, callback));
            }
            
            var wrappedSocket = {
                on: addListener,
                addListener: addListener,
                emit: function(eventName, data, callback) {
                    return socket.emit(eventName, data, asyncAngularify(socket, callback));
                },
                removeListener: function() {
                    return socket.removeListener.apply(socket, arguments);
                },
                forward: function(events, scope) {
                    if (events instanceof Array === false) {
                        events = [events];
                    }
                    if (!scope) {
                        scope = options.scope;
                    }
                    events.forEach(function(eventName) {
                        var prefixedEvent = options.prefix + eventName;
                        var forwardBroadcast = asyncAngularify(socket, function(data) {
                            scope.$broadcast(prefixedEvent, data);
                        });
                        scope.$on('$destroy', function() {
                            socket.removeListener(eventName, forwardBroadcast);
                        });
                        socket.on(eventName, forwardBroadcast);
                    })
                }
            };
            
            return wrappedSocket;
        };
    };
}]);