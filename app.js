var ip = {}
var ipL = require('ip')
ipL.port = 2001

var serverIO = require('./serverIO')
var serverLC = require('./serverLocal')
var serial = require('./puertoserial')
var normalizeChain = require('./normalizer_chains')

ip.address_ip = '172.30.254.34'
ip.port = '8080'
ip.protocol = 'http'
ip.address = ip.protocol + '://' + ip.address_ip + ':' + ip.port

var server_remoteIO = serverIO(ip)
var server_local = serverLC(ipL)

var serial_Arduino = new serial()
serial_Arduino.on('data',function(data){
  console.log(normalizeChain(data));
})


// server_remoteIO.on('news', function(data){
//   console.log(data);
// })
