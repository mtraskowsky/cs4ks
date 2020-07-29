const sessions = require('../sessions');

/** @function loadSession 
 * Loads the session (if it exists) and attaches 
 * it to req.session
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object 
 */
function loadSession(req, res, next) {
  // TODO: Load the session
  var match = /SID=([^\s;]+)/.exec(req.headers.cookie);
  console.log("The value of match in the loadSession function is: "+ match);
  if(!match) {
    // No cookie to load, so session should be empty
    req.session = null;
    return next();
  } else {
    // TODO: Load the session
        var session = sessions.get(match[1]);
        req.session = session;    
        next();
        console.log("loadSession function reached with req.session = ", req.session, req.session.role, req.session.user);
        
  }
}

module.exports = loadSession;
