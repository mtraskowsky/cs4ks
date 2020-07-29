const templates = require('../templates');
const db = require('../database');

/** @function showPost 
 * Serves the specified post as a resonse.  The post id should be in req.params.id
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object 
 */
function showTopics(req, res) {
  
  // Determine the post ID
  const id = parseInt(req.params.id, 10);
  
  var forum_topic_id = parseInt(req.params.id, 10);
  console.log("forum_topic_id:"+forum_topic_id);
  
  // get all forum topics
  var topics = db.prepare(`SELECT subject, 
    first || ' ' || last AS creator, 
    (SELECT COUNT(id) FROM forum_posts WHERE forum_posts.forum_topic_id = forum_topics.id) as postCount,
    forum_topics.created_at AS date
  FROM forum_topics 
  INNER JOIN users ON forum_topics.user_id = users.id
  ORDER BY forum_topics.created_at DESC;`).all();
  
   var title = db.prepare("SELECT * FROM forum_topics WHERE id = ?").get(id);
 
  var numTopics = topics.length;
  console.log("number of topics: topics.length");
    
  // Set the title  
  // Generate the HTML
  var listHtml = templates['list.html']({topics: topics, topicNum: numTopics});
  
  
  var html = templates['layout.html']({post: "", title: "", list: listHtml, user: req.session && req.session.user});
  
  // Serve the HTML
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", html.length);
  res.end(html);
  
}

module.exports = showTopics;