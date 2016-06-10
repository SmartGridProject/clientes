var net =  require('net')
var ipL = require('ip')
ipL.port = 2001

module.exports = function(ip){
  var address = ip || ipL

  var server =  net.createServer(function(socket){
    return socket
  })
  server.listen(address.port, address.address)
  //return socket
}
