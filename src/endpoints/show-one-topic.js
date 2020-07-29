const templates = require('../templates');
const db = require('../database');

/** @function showPost 
 * Serves the specified post as a resonse.  The post id should be in req.params.id
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object 
 */
function showOneTopic(req, res) {
  
  // Determine the post ID
  const id = parseInt(req.params.id, 10);
  
  var allTopics = db.prepare(`SELECT subject, 
  first || ' ' || last AS creator, 
    (SELECT COUNT(id) FROM forum_posts WHERE forum_posts.forum_topic_id = forum_topics.id) as postCount,
    forum_topics.created_at AS date
  FROM forum_topics 
  INNER JOIN users ON forum_topics.user_id = users.id
  ORDER BY forum_topics.created_at DESC;`).all(id);

  
  var topic = db.prepare("SELECT * FROM forum_topics WHERE id = ?").get(id);
  
  // Get all posts in the database
  var topics = db.prepare("SELECT * FROM forum_topics ORDER BY created_at DESC").all();
  
  var html = templates['post.html']({topic: topic, user: req.session && req.session.user});
  
  // Serve the HTML
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", html.length);
  res.end(html);
}

module.exports = showOneTopic;