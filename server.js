const handleRequest = require('./src/handle-request');
const http = require('http');
require('./src/database');
require('./src/templates');

const port = 3000;

var server = http.createServer(handleRequest);

server.listen(port, function(){
  console.log("Server is listening on port " + port);
});