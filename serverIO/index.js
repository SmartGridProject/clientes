var io = require('socket.io-client')

module.exports = function(http){
  var socketIO = io.connect(http.address, {reconnect:true})

  socketIO.on('connect', function(){
    console.log('connected');
  })

  return socketIO
}
