// requiring the HTTP interfaces in node
var http = require('http');

// create an http server to handle requests and response
http.createServer(function (req, res) {
	// sending a response header of 200 OK
	res.writeHead(200, {'Connection': 'keepalive'});
	// print out Hello World
	res.end('Hello World');
}).listen(8080);

console.log("Server running on port 8080.");
