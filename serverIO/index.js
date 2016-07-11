
/**
* Este proyecto permite la comunicación por medio de sockets entre PLC - arduino
* y plc
* Junio de 2016.
* Creado por Mauricio Duque
 */

var io = require('socket.io-client')
var ip = require('ip')
//ip = 'http://' + ip.address() + ':' + '8080'
ip = 'http://' + ip.address() + ':' + '8000'


/**
 * module - Exporta funcionalidades de la conexion con el servidor de CEDIA
 *
 * @param  {Object} http Requiere el http de la conexion
 * @return {type}      description
 */
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
