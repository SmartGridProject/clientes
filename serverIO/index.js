var io = require('socket.io-client')
var ip = require('ip')
//ip = 'http://' + ip.address() + ':' + '8080'
ip = 'http://' + ip.address() + ':' + '8000'
module.exports = function(http){

  var address = http.address || ip

  var socketIO = io.connect(address, {reconnect:true})

  socketIO.on('connect', function(){
    console.log('connected');
  })

  return socketIO
}
