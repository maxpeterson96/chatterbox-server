/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

const storage = [];
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept, authorization',
  'access-control-max-age': 10 // Seconds.
};

//const header = {'Content-Type', 'application/json'};

var requestHandler = function(request, response) {
  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  // console.log(request);
  //http://127.0.0.1:3000/classes/messages

  if (request.url === "/classes/messages") {
    if (request.method === 'GET') {
      var statusCode = 200;
      var headers = defaultCorsHeaders;
      response.setHeader('Content-Type', 'application/json');
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify(storage));
    } else if (request.method === 'POST') {
      let body = [];
      request.on('data', (chunk) => {
        body.push(chunk);
      }).on('end', () => {
        body = Buffer.concat(body).toString();

        response.setHeader('Content-Type', 'application/json');
        response.statusCode = 201;

        // response.write(JSON.stringify(responseBody));
        storage.push(JSON.parse(body));
        response.end(JSON.stringify(storage));

        //console.log('body after = ', body);
        // at this point, `body` has the entire request body stored in it as a string
      });
    }
  } else {
    response.statusCode = 404;
    response.end();
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

// let temp3 = JSON.stringify(body);
//         console.log('parse = ', JSON.parse(temp3));
//         console.log('stringify = ', JSON.stringify(body));