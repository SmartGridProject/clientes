
/**
* Este proyecto permite la comunicación por medio de sockets entre PLC - arduino
* y plc
* Para Servidor Local
* Junio de 2016.
* Creado por Mauricio Duque
 */

var net =  require('net')
var util = require('util')
var EventEmitter = require('events').EventEmitter

var ipL = require('ip')
ipL.port = 2001


/**
 * Crea eventos para conexion entre server - server local
 *
 * @param  {Object} ip Objeto con la IP
 * @return {type}    description
 */
var server_lc = function(ip){
  var data_send = this
  var address = ip || ipL

  var server =  net.createServer(function(socket){
    //return socket
    data_send.emit('data', socket)
  })
  server.listen(address.port, address.address)
  //return socket
}

util.inherits(server_lc,EventEmitter)
module.exports = server_lc
