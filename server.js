const express = require('express');
const translate = require("deepl");
require('dotenv').config();

const deeplKey = String(process.env.DEEPL_KEY);
const chaplusKey = String(process.env.CHAPLUS_KEY);
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
let xhr = new XMLHttpRequest();

const app = express();

app.use(express.static(__dirname + "/dist/"));

/*
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
*/

  app.get("/api2",function(req,res){
    var utterance=""
    // en => ja
    translate({
        text: req.query.dat,
        source_lan: "EN",
        target_lang: 'JA',
        auth_key: deeplKey,
        free_api: true
      })
      .then(result => {
        // AI
        //console.log(result.data.translations[0].text)
        var data = {"utterance":result.data.translations[0].text}

        xhr.open('post', 'https://www.chaplus.jp/v1/chat?apikey='+chaplusKey);
        xhr.setRequestHeader('Content-Type', 'text/json');
        xhr.send(JSON.stringify(data));
        xhr.onreadystatechange = function() {
          if( xhr.readyState === 4 && xhr.status === 200 ) {
            var aiResponse = JSON.parse(xhr.responseText)
            // ja => en
            translate({
              text: aiResponse.bestResponse.utterance,
              source_lan: "JP",
              target_lang: 'EN',
              auth_key: deeplKey ,
              free_api: true
            })
            .then(result => {
                //console.log(result.data.translations[0].text);
                res.send({
                  msg: result.data.translations[0].text
                })
            })
            .catch(error => {
                console.error(error)
            });
          }
        }
      })
      .catch(error => {
          console.error(error)});
  })

app.listen(process.env.PORT || 8080);
