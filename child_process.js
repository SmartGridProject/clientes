const spawn = require('child_process').spawn
//const pross = spawn('node',['serial.js','arduino'])
const serv = spawn('node', ['app.js'])

serv.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
})

serv.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
})

serv.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
})
