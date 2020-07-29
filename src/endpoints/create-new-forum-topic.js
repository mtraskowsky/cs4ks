const db = require('../database');
const serveError = require('../serve-error');

/** @function createNewForumTopic()
 * Creates a new topic using the supplied form data.
 * Form data should be attached to req.body
 * @param {http.IncomingMessage} req - the request object
 * @param {http.ServerResponse} res - the reponse object
 */
function createNewForumTopic(req, res) {
  // TODO: Create a new forum topic and send a response
  
  var subject = req.body.subject;
  var id = req.session.user.id;
  
  console.log("From create-newForumTopic the subject is: " + subject + " and id is " + id);
  
  // validate
  if(!subject) return serveError(req, res, 422, "Empty subject encountered");
  
  var info = db.prepare("INSERT INTO forum_topics (subject, user_id) VALUES (?, ?);").run(subject, id);

  // Determine if the write succeeded
  if(info.changes !== 1) return serveError(req, res, 500, "Unable to write to database");
  
  // Redirect to the read page for the post
  res.writeHead(302, {"Location": `/forum/topics/${info.lastInsertRowid}`});
  res.end();
}

module.exports = createNewForumTopic;
