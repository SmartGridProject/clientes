var express = require('express');
const spawn = require('child_process').spawn

var app = express();

// respond with "hello world" when a GET request is made to the homepage
app.get('/plc', function(req, res) {
  const pross = spawn('node',['serial.js','arduino'])

  pross.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
      res.send('hello world');
  })

  pross.stderr.on('data', (data) => {
    console.log(`stdout: ${data}`);
  })

  pross.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  })
});
app.listen(3001);
