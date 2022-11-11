/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

const storage = ['empty array'];

var requestHandler = function(request, response) {
  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  console.log(request);
  //http://127.0.0.1:3000/classes/messages
  if (request.method === 'GET') {
    if (request.url === "/classes/messages") {
      var statusCode = 200;
      var headers = defaultCorsHeaders;
      headers['Content-Type'] = 'text/plain';
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify(storage));
    }
    if (request.url === "/japanese/sushi") {
      var statusCode = 200;
      var headers = defaultCorsHeaders;
      headers['Content-Type'] = 'text/plain';
      response.writeHead(statusCode, headers);
      response.end('sushi');
    }
  } else if (request.method === 'POST') {
    if (request.url === "/classes/messages") {
      console.log('post success');
    }
  }
};

exports.handleRequest = requestHandler;

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept, authorization',
  'access-control-max-age': 10 // Seconds.
};
