const http = require('http');
require('./src/database');
require('./src/templates');

const app = require('./src/app');

const port = 3000;

// Start listening for requests
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

/* from PROJ4: replacing this with the express implementation
var server = http.createServer(handleRequest);

server.listen(port, function(){
  console.log("Server is listening on port " + port);
});
*/

