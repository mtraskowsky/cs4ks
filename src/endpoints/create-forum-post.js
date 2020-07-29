const db = require('../database');
const serveError = require('../serve-error');

/** @function createPost()
 * Creates a new forum post using the supplied form data
 */
function createForumPost(req, res) {
  
  var body = req.body.body;
  var forum_topic_id = parseInt(req.params.id, 10);
  var user_id = req.session.user.id;
  var date = new Date().valueOf();
  
  // Validate the input
  if(!body) return serveError(req, res, 422, "Empty title or content encountered");

  var info = db.prepare("INSERT INTO forum_posts (body, forum_topic_id, user_id) VALUES (?,?,?)").run(body, forum_topic_id, user_id);
                   
  // Determine if the write succeeded
  if(info.changes !== 1) return serveError(req, res, 500, "Unable to write to database");

  res.redirect(`/forum/topics/${forum_topic_id}`);
}

module.exports = createForumPost;