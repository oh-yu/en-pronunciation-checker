const express = require('express');
const app = express();
app.use(express.static(__dirname + "/dist/"));

app.get('/api', function(req, res) {
    var {PythonShell} = require('python-shell');
    var pyshell = new PythonShell('sample.py');  
    //console.log("②./api:   「I get request from ./」")
    pyshell.send(req.query.dat);
    //console.log("③./api: 「I send a params of request to sample.py」")
    pyshell.on('message',  function (data) {
        //console.log("⑤./api: 「I receive message from sample.py」")
        res.send({
          msg: data 
        })
        //console.log("⑥./api: 「I return response to ./」")
      })
  })
  
app.listen(process.env.PORT || 8080);