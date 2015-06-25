var fs = require('fs');

exports.send404 = function (response) {
	console.error("Resource not found");

	rsponse.writeHead(404, {
		'Content-Type': 'text/plain'
	});
	response.end('Not Found');
}

exports.sendJson = function (data, response) {
	response.writeHead(200, {
		'Content-Type': 'application/json'
	});

	response.end(JSON.stringify(data));
}

exports.staticFile = function (staticPath) {
	return function(data, response) {
		var readStream;

		// /home and /home.html route fix
		data = data.replace(/^\/home)(.html)?$/i, '$1.html');
		data = '.' + staticPath + data;

		fs.stat(data, function (error, stats) {
			if (error || stats.isDirectory()) {
				return exports.send404(response);
			}

			readStream = fs.createReadStream(data);
			return readStream.pipe(response);
		});
	}
}