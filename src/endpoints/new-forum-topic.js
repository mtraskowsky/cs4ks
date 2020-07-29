const templates = require('../templates');

/** @function newPost 
 * Serves the form for creating a new post 
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object
 */
function newForumTopic(req, res) {
  var html = templates["new-forum-topic.html"]({
    title: "New Forum Topic",
    user: req.session && req.session.user
  });
  
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", "text/html");
  res.end(html);
}

module.exports = newForumTopic;
