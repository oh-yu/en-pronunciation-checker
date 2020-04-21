var http = require('http');
var fs = requier('fs');

var appServer = http.createServer()
appServer.on('request', executeRequest);

function executeRequest(req,res){
  fs.readFile('./index.html','utf-8',callBack()=>{
    res.writeHead(200,{'Content-Type': 'text/html'});
    res.write(data);
    res.end()
  });
}

appServer.listen(process.env.PORT || 8080);
