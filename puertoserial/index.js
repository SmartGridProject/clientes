'use strict'

var serialport = require("serialport")
var async = require("async")
var util = require('util')
var EventEmitter = require('events').EventEmitter


/**
 * var - Crea una serie Async para el manejo del puerto serie
 *
 * @return {type}  description
 */
var serial_port = function(){
  var portArduino = null
  var serialPort = null
  var data_serial = this

  async.series([portList,
                serialConf,
                serialSocket],serialFinished)

  /**
   * portList - Lista los puertos disponibles en el servidor local
   *
   * @param  {done} done secuencia Async
   * @return {type}      description
   */
  function portList(done) {
    console.log('start')

    /**
     * anonymous function - description
     *
     * @param  {err} err   Envia los errores de la conexion con el puerto serie
     * @param  {Object} ports Puertos serie disponibles en el servidor local
     * @return {type}       Puertos
     */
    serialport.list(function (err , ports){
      async.eachSeries(ports, portsLists, done)
    })
  }


  /**
   * portsLists - Serie de puertos
   *
   * @param  {type} port Puerto en especifico
   * @param  {type} done Seguidor de Secuencia Async
   * @return {type}      description
   */
  function portsLists(port, done){
    if(port.serialNumber){
        portArduino = port.comName
      }
    done()
  }

  /**
   * serialConf - Configuaracion del puerto serie para conexion
   *
   * @param  {type} done description
   * @return {type}      description
   */
  function serialConf(done) {
    console.log('ports Lists Arduino')
    if (portArduino != null){
      serialPort = new serialport.SerialPort(portArduino, {
        baudrate: 9600,
        parser: serialport.parsers.readline('\r\n')
      });
    }
    console.log(serialPort)
    done()
  }

  /**
   * serialSocket - Crea socket local para comunicación asincrona
   *
   * @param  {type} done description
   * @return {type}      description
   */
  function serialSocket(done){
    if(portArduino != null){
        serialPort.on('data', function(data){
          data_serial.emit('data',data)
          serialPort.write('hi')
        })
    }
    done()
  }

  /**
   * serialFinished - Finalizacion de la serie
   *
   * @return {type}  description
   */
  function serialFinished() {
   console.log('done');
  }
}

util.inherits(serial_port,EventEmitter)
module.exports = serial_port
