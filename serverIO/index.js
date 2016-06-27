var io = require('socket.io-client')
var ip = require('ip')
//ip = 'http://' + ip.address() + ':' + '8080'
ip = 'http://' + ip.address() + ':' + '8000'
module.exports = function(http){
console.log(http);
  var address = http.address || ip

  var socketIO = io.connect(address, {reconnect:true})
  //var socketIO = io.connect('http://190.15.141.74:2000', {reconnect:true})

  socketIO.on('connect', function(){
    console.log('connected');
  })

  return socketIO
}
