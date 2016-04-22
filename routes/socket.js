module.exports = function(io) {
  return function(socket) {
    socket.emit('send:name', {
      name: 'Bob'
    });
    
    socket.on('chat:msg', function(data) {
      console.log(data);
      io.emit('chat:msg', data);
    });
    
    setInterval(function() {
      socket.emit('send:time', {
        time: (new Date()).toString()
      });
    }, 1000);
  };
};