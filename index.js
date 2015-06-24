var http = require('http');

http.createServer(function (req, res) {
	// Parsed url to accomodate for parameters
	var_url;

	// In case client uses lower case characters for methods
	req.method = req.method.toUpperCase();
	console.log(req.method + ' ' + req.url);
	res.end('The current time is ' + Date.now())
	
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');