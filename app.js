'use strict'

var serialport = require("serialport")
var async = require("async")
var EventEmitter = require('events').EventEmitter

var portArduino = null
var serialPort = null
var events = new EventEmitter()

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
        console.log(data);
      })
  }
  //serialComunicate(socket, done)
}

function serialComunicate() {

}

function serialFinished() {
//
}
