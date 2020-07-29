const templates = require('./templates');

function serveIndex(req, res) {
  console.log("serveIndex function reached");
  var html = templates["index.html"]({user: req.session && req.session.user});
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", "text/html");
  res.end(html);
}

module.exports = serveIndex;