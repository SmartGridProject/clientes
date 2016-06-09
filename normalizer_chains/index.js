
module.exports = function(data){
  var dataObj = {}
  var datasend = data + '/'
  datasend = datasend.substring(datasend.indexOf('{')+1, datasend.indexOf('&'))
  var entradas = datasend.substring(datasend.indexOf('I'),datasend.indexOf('}')).split(',')
  var salidas = datasend.substring(datasend.search('S') + 3, datasend.search('},IA')).split(',')
  var analogas = datasend.substring(datasend.search('IA1'), datasend.search('}}')).split(',')

  var arrE = []
  var arrS = []
  var arrA = []

  for (var i in entradas) {
    arrE.push(parseInt(entradas[i].slice(entradas[i].search(':') + 1 ,entradas[i].length)))
    //console.log(entradas[i].typeOf);
  }
  for (var i in salidas) {
    arrS.push(parseInt(salidas[i].slice(salidas[i].search(':') + 1 ,salidas[i].length)))
    //console.log(entradas[i].typeOf);
  }
  for (var i in analogas) {
    arrA.push(parseInt(analogas[i].slice(analogas[i].search(':') + 1 ,analogas[i].length)))
    //console.log(entradas[i].typeOf);
  }
  dataObj.entradas = arrE
  dataObj.salidas = arrS
  dataObj.analogas = arrA

  return dataObj
}
