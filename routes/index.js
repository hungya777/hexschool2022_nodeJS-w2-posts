const headers = require('../service/headers');
const PostsControllers = require('../controllers/posts');
const HttpControllers = require('../controllers/http');

const routes = (req, res) => {
  const { url, method } = req;
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  })
  if ( url === '/posts' && method === 'GET') {
    PostsControllers.getAllPosts({req, res});
  } else if ( url === '/posts' && method === 'POST') {
    req.on('end', () => {
      // console.log(JSON.parse(body));
      PostsControllers.createPost({body, req, res});
    })
  } else if ( url === '/posts' && method === 'DELETE') {
    PostsControllers.deleteAllPosts({req, res});
  } else if ( url.startsWith('/posts/') && method === 'DELETE') {
    const postID = url.split('/').pop();
    PostsControllers.deleteOnePost({req, res, postID});
  } else if ( url.startsWith('/posts/') && method === 'PATCH') {
    req.on('end', () => {
      const postID = url.split('/').pop();
      PostsControllers.editOnePost({req, res, postID, body});
    })
  } else if (url === '/posts' && method === 'OPTIONS') {
    HttpControllers.cors(req, res);
  } else {
    HttpControllers.notFound(req, res);
  }
}

module.exports = routes;