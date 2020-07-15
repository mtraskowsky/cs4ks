const fs = require('fs');
const path = require('path');
const serveFile = require('./serve-file');
const listDirectory = require('./list-directory.js');
const serveStandards = require('./serve-standards.js');


/** @function handleRequest
 * Provides a function for handling HTTP requests 
 * @param {http.incomingMessage} req - the request object
 * @param {http.serverResponse} res - the response object
 */
function handleRequest(req, res) {
 
  if(req.method !== 'GET') return res.writeHead(501).end();
  var pathname = new URL(req.url, 'http://localhost').pathname;

  switch(pathname){
    case '/standards':
      serveStandards(req, res);
      return;
    break;
    case '/standards.html':
      serveStandards(req, res);
      return;
    default:
    break;
  }
  
  fs.stat(path.join("public", pathname), (err, stat) => {
  // TODO: Serve file or list directory
    //if(err) return res.writeHead(404).end();
    if(err) {
            res.writeHead(404);
            res.end();
            return
    }
    if(stat.isFile()) return serveFile(req, res);
    if(stat.isDirectory()) return listDirectory(req, res);
    return res.writeHead(404).end();
  });
  
}

module.exports = handleRequest;
