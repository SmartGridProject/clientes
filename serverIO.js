var io = require('socket.io-client');
var ip = {}

ip.address_ip = '172.30.254.34'
ip.port = '8080'
ip.protocol = 'http'
ip.address = ip.protocol + '://' + ip.address + ':' + ip.port

var socketIO = io.connect(ip.address,{reconnect:true})

//var socketIO = io.connect('http://172.30.246.1:8080',{reconnect:true})
//var socketIO = io.connect('http://190.15.141.74:8080',{reconnect:true})
var net =  require('net')
var normalizeChain = require('./normalizer_chains')


socketIO.on('connect', function(data){
  console.log('connected: ' + data)
})
socketIO.on('news', function(data){
  console.log(data)
})

socketIO.on('event', function(data){
  console.log(data)
})
//socketIO.emit('OMG', {hola:'Server Hola'})

var server =  net.createServer(function(socket){
  socket.on('data', function(data){
    //console.log(normalizeChain(data))
    //console.log('Client said: ' + data)
    socketIO.emit('OMG', {dataADQ:normalizeChain(data)})
    //socketIO.emit('OMG', data)
  })
})

server.listen(2001, '172.31.68.14');
