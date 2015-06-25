var http = require('http');
var memberService = require('./lib/members');
var responder = require('./lib/responseGenerator');
var staticFile = responder.staticFile('/public');

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
		memberService.getMembers(function (error, data) {
			if (error) {
				// send a 500 error
				return res.end(req.method + ' is not implemented by this server.');
			}
			// send the data with a 200 status code
			return responder.sendJson(data, res);
		});
	} else if (_url = /^\/members\/(\d+)$/i.exec(req.url)) {then added
		// find the member by id defined in route
		memberService.getMember(_url[1], function (error, data) {
			if (error) {
				// send a 500 error
				return responder.send500(error, res);
			}

			if (!data) {
				// send a 404 error
				return responder.send404(res);
			}

			// send the data with a 200 status code
			return responder.sendJson(data, res);
		});
	} else {
		// attempt to send static file
		// otherwise, send a 404
		res.writeHead(200);
		res.end('static file maybe')
	}
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');