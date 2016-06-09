'use strict'

var serialport = require("serialport")
var async = require("async")
var util = require('util')
var EventEmitter = require('events').EventEmitter


var serial_port = function(){
  var portArduino = null
  var serialPort = null
  var data_serial = this

  async.series([portList,
                serialConf,
                serialSocket],serialFinished)

  function portList(done) {
    console.log('start')
    serialport.list(function (err , ports){
      async.eachSeries(ports, portsLists, done)
    })
  }

  function portsLists(port, done){
    if(port.serialNumber){
        portArduino = port.comName
      }
    done()
  }

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

  function serialSocket(done){
    if(portArduino != null){
        serialPort.on('data', function(data){
          //io.emit('serialCom', data)
          //console.log(data);
          //console.log(normalizeChain(data));
          data_serial.emit('data',data)
        })
    }
    done()
  }

  function serialFinished() {
   console.log('done');
  }
}

util.inherits(serial_port,EventEmitter)
module.exports = serial_port
