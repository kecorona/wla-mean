var http = require('http');

http.createServer(function (req, res) {
	// Parsed url to accomodate for parameters
	var_url;

	// In case client uses lower case characters for methods
	req.method = req.method.toUpperCase();
	console.log(req.method + ' ' + req.url);
	
	if (req.method !== 'GET') {
		res.writeHead(501, {
			'Content-Type': 'text/plain'
		});
		return res.end(req.method + ' is not implemented by this server.');
	}

	if (_url = /^\/members$/i.exec(req.url)) {
		// return a list of members
		res.writeHead(200)
		return res.end('member list');
	} else if (_url = /^\/members$/i.exec(req.url)) {
		// find the member by id defined in route
		res.writeHead(200);
		return res.end('a single member');
	} else {
		// attempt to send static file
		res.writeHead(200);
		res.end('static file maybe')
	}
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');