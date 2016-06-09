var net =  require('net')

module.exports = function(ip){
  var server =  net.createServer(function(socket){
    return socket
  })
  server.listen(ip.port, ip.address)
  //return socket
}
