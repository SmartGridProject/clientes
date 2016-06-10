var io = require('socket.io-client')
var ip = require('ip') 
ip = 'http://' + ip.address() + ':' + '8080'

module.exports = function(http){

  var address = http.address || ip

  var socketIO = io.connect(address, {reconnect:true})

  socketIO.on('connect', function(){
    console.log('connected');
  })

  return socketIO
}
