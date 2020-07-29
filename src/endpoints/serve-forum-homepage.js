const db = require('../database');
const templates = require('../templates');

/** @function homepage
 * Serves the home page 
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object
 */
function serveForumHomepage(req, res) {

  //get all forum topics in database
  var topics = db.prepare(`SELECT subject, 
      first || ' ' || last AS creator, 
      (SELECT COUNT(id) FROM forum_posts WHERE forum_posts.forum_topic_id = forum_topics.id) as postCount,
      forum_topics.created_at AS date
    FROM forum_topics 
    INNER JOIN users ON forum_topics.user_id = users.id
    ORDER BY forum_topics.created_at DESC;`).all();
  
  // get the first topic
  var topic = topics[0];
  
  // Generate the html snippets
  var topicHtml = templates['post.html'](topic);

  //var listHtml = templates['post-list.html']({posts: posts});
  var listHtml = templates['list.html']({topics: topics});
  
  var html = templates['layout.html'](
    {post: topicHtml, 
     list: listHtml, 
     title: "sending topic from the serve-forum-homepage",
     user: req.session && req.session.user});
  
  // Serve the HTML
  res.setHeader('Content-Type', "text/html");
  res.setHeader('Content-Length', html.length);
  res.end(html);
}

module.exports = serveForumHomepage;