const authorsOnly = require('./middleware/authors-only');
const basicAuth = require('./middleware/basic-auth');
const createNewForumTopic = require('./endpoints/create-new-forum-topic');
const createSession = require('./endpoints/create-session');
const createUser = require('./endpoints/create-user');
const express = require('express');
const loadBody = require('./middleware/load-body');
const loadSession = require('./middleware/loadSession');
const newForumTopic = require('./endpoints/new-forum-topic');
const newPost = require('./endpoints/new-post');
const newSession = require('./endpoints/new-session');
const newUser = require('./endpoints/new-user.js');
const serveStandards = require('./serve-standards');
const serveFile = require('./serve-file');
const serveForumHomepage = require('./endpoints/serve-forum-homepage');
const serveIndex = require('./index');
const showTopics = require('./endpoints/show-topics');
const showOneTopic = require('./endpoints/show-one-topic');
const createForumPost = require('./endpoints/create-forum-post');
const showAllPostsForTopic = require('./endpoints/show-all-posts-for-topic');
const destroySession = require('./endpoints/destroy-session');

/** @module app 
 * The express application for our site
 */
var app = express();
app.use(loadSession);

app.get('/', serveIndex);

app.get('/standards', serveStandards);
app.get('/standards.html', serveStandards);
//app.get('/forums.html', serveSignUp);

// signup process
app.get("/signup", newUser);
app.post("/signup", loadBody, createUser);

// signin process
app.get('/signin', newSession);
app.post("/signin", loadBody, createSession);
  
// forum list
app.get('/forum', showTopics);

//forum topic creation
app.get('/forum/topics/new', newForumTopic); 
app.post('/forum/topics', loadBody, createNewForumTopic); 
app.get('/forum/topics/:id', showAllPostsForTopic);
//forum post creation
app.post('/forum/topics/:id/posts', loadBody, createForumPost);

app.get("/signout", destroySession);

app.use(express.static('public'));

module.exports = app;


