/**
 * Este proyecto permite la comunicación por medio de sockets entre PLC - arduino
 * y plc
 * Junio de 2016.
 * Creado por Mauricio Duque
 */

/**
 * Variable para asignacion de la IP para el servidor
 */
var ip = {}

/**
 * Ip Local
 */
var ipL = require('ip')
ipL.port = 2001

/**
 * Socket con Servidor [CEDIA]
 */
var serverIO = require('./serverIO')

/**
 * Crea un socket local
 */
var serverLC = require('./serverLocal')

/**
 * Comunicación entre servidor local y PLC - Arduino
 */
var serial = require('./puertoserial')

/**
 * Normaliza la cadena para enviar en formato JSON
 */
var normalizeChain = require('./normalizer_chains')

// set the ip

/**
 *
 */
ip.address_ip = '190.15.141.74'
ip.port = '8000'
ip.protocol = 'http'
ip.address = ip.protocol + '://' + ip.address_ip + ':' + ip.port


/**
 * Inicializador del Servidor
 * @param {Object} 'ip'   datos de ip del servidor [no local]
 */
var server_remoteIO = serverIO(ip)
/**
 * Inicializador de Servidor local
 * @param {Object} 'ipL' datos de ip local
 */
var server_local = new serverLC(ipL)
/**
 * Inicializador del puerto serial, solo para Arduino
 */
var serial_Arduino = new serial()


/**
 * serial_Arduino - description
 * Permite que se conecte mediante sockets a los puertos y envial la información
 * normalizada a servidor  [CEDIA]
 *
 * @param  {Object} 'data'        Respuesta del puerto serial
 * @param  {type} function(data description
 * @return {type}               description
 */
serial_Arduino.on('data',function(data){
  console.log(data);
  if (process.argv[2] == 'Arduino' || process.argv[2] == 'arduino') {
    //console.log(normalizeChain(data));
    //console.log(process.argv[3]);
     //server_remoteIO.emit('OMG',{dataADQ:normalizeChain(data)}) // For first lab
    server_remoteIO.emit(process.argv[3],{dataADQ:normalizeChain(data)})
    server_remoteIO.on('news', (data)=>{
      console.log(data);
    })
  }else{
    console.error('No se determina dispositivo');
  }
})

var r_binar = function(){
  var num = (Math.random() > 0.5)?1:0
  return num
}

var r_int = function(){
  var num = Math.random() * 400
  return num
}

setInterval(function(){
  //console.log(normalizeChain('{E:{I1  : 1,I2  : 0},S:{Q1  : 0,Q2  : 1 },IA:{IA1 : 444,IA2 : 0.00}}&' ));
  var dataTrans   = normalizeChain('{E:{I1  : '+r_binar()+',I2  : '+r_binar()+'},S:{Q1  : '+r_binar()+',Q2  : '+r_binar()+' },IA:{IA1 :' + r_int() + ',IA2 : ' + r_int() + ' }}&' )
  var dataTrans_2 = normalizeChain('{E:{I1  : '+r_binar()+',I2  : '+r_binar()+',I3 : '+r_binar()+'},S:{Q1  : '+r_binar()+',Q2  : '+r_binar()+' },IA:{IA1 :' + r_int() + ',IA2 : ' + r_int() + ' }}&' )
  var dataTrans_3 = normalizeChain('{E:{I1  : '+r_binar()+',I2  : '+r_binar()+',I3 : '+r_binar()+'},S:{Q1  : '+r_binar()+',Q2  : '+r_binar()+' },IA:{IA1 :' + r_int() + ',IA2 : ' + r_int() + ' }}&' )
  //console.log(dataTrans);
  //server_remoteIO.emit('OMG',{dataADQ:dataTrans})
  server_remoteIO.emit('SOCKET_1',{dataADQ:dataTrans})
  server_remoteIO.emit('SOCKET_2',{dataADQ:dataTrans_2})
  server_remoteIO.emit('SOCKET_3',{dataADQ:dataTrans_3})
}, 500);

server_remoteIO.on('news', (data)=>{
  console.log(data);
})




/**
 * server_local - description
 * Permite que se conecte mediante sockets a los puertos y envial la información
 * normalizada a servidor  [CEDIA]
 * @param  {type} 'data'        description
 * @param  {type} function(data description
 * @return {type}               description
 */
server_local.on('data', function(data){
  if (process.argv[2] == 'PLC' || process.argv[2] == 'plc'){
    data.on('data',function(data){
      server_remoteIO.emit(process.argv[3],{dataADQ:normalizeChain(data)})
    })
  }else {
    console.error('No se determina dispositivo');
  }

})
