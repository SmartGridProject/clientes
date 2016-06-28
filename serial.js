var ip = {}
var ipL = require('ip')
ipL.port = 2001

var serverIO = require('./serverIO')
var serverLC = require('./serverLocal')
var serial = require('./puertoserial')
var normalizeChain = require('./normalizer_chains')

// set the ip

ip.address_ip = '190.15.141.74'
ip.port = '8000'
ip.protocol = 'http'
ip.address = ip.protocol + '://' + ip.address_ip + ':' + ip.port

var server_remoteIO = serverIO(ip)

var server_local = new serverLC(ipL)
var serial_Arduino = new serial()

serial_Arduino.on('data',function(data){
  //console.log(data);
  if (process.argv[2] == 'Arduino' || process.argv[2] == 'arduino') {
    console.log(normalizeChain(data));
    server_remoteIO.emit('OMG',{dataADQ:normalizeChain(data)})
  }else{
    console.error('No se determina dispositivo');
  }
})

server_local.on('data', function(data){
  if (process.argv[2] == 'PLC' || process.argv[2] == 'plc'){
    server_remoteIO.emit('OMG',{dataADQ:normalizeChain(data)})
  }else {
    console.error('No se determina dispositivo');
  }

})


// server_remoteIO.on('news', function(data){
//   console.log(data);
// })
