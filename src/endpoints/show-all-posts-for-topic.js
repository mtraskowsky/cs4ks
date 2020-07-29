const templates = require('../templates');
const db = require('../database');

/** @function showAllPostsForTopic 
 * Serves the specified post as a resonse.  The post id should be in req.params.id
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object 
 */
function showAllPostsForTopic(req, res) {
  // Determine the post ID (id = topic subject)
  const id = parseInt(req.params.id, 10);
  
  // gets all posts for topic
  var posts = db.prepare(`SELECT subject, body, first || ' ' || last AS author, forum_topics.created_at AS date
    FROM forum_posts 
    INNER JOIN users ON forum_posts.user_id = users.id 
    INNER JOIN forum_topics ON forum_posts.forum_topic_id = forum_topics.id
    WHERE forum_topic_id = ?
    ORDER BY forum_posts.created_at ASC;`).all(id);
    
  // Set the topic title
  var title = db.prepare("SELECT * FROM forum_topics WHERE id = ?").get(id);
  
  // Generate the HTML
  var html = templates['all-posts-for-topic.html']({
    posts: posts, 
    //list: listHtml, 
    id: title.id,
    title: title, 
    user: req.session && req.session.user});
  
  // Serve the HTML
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", html.length);
  res.end(html);
  
}

module.exports = showAllPostsForTopic;