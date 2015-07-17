var http = require('http');

var processResponse = function(resolve) {
	return function(res) {
		var body = "";
		res.on('data', function(chunk) {
			body += chunk.toString();
		});
		res.on('end', function() {
			var responseBody = body;
			if(res.headers['content-type'] === 'application/json') {
				responseBody = JSON.parse(responseBody);
			}
			resolve(responseBody);
		});
	};
};

module.exports = function(options, body) {
	return new Promise(function(resolve, reject) {
		var req = http.request(options, processResponse(resolve))
					  .on('error', reject);
		if(body) {
			req.write(body);
		}
		req.end();
	});
};