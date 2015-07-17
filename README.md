#simple-node-http

Simple wrapper around node.js http to make basic requests easier and add promises API.  
  
Most of the time when using native node.js http to make a request, I would end up with the same code:  

## Native node.js http post request:
	var options = {
		hostname: 'some-url.com',
		port: 3000,
		path: 'some/path.json',
		method: 'POST',
		headers: {
			'a': 'b',
			'c': 'd'
		}
	};
	var postData = "some data in whatever form you want...";
	var processResponse = function(res) {
		var body = "";
		res.on('data', function(chunk) {
			body += chunk.toString();
		});
		res.on('end', function() {
			var responseBody = JSON.parse(responseBody);
			handleResponse(responseBody);
		});
	};
	var req = http.request(options, processResponse)
				  .on('error', handleError);
	req.write(body);
	req.end();
##

This is a lot of boilerplate for something so simple!  
I wanted to just write a line or two and handle anything with Promises rather than callbacks!  
I have made the wrapper as simple as I could, it still uses the same structure for _options_ as the [native implementation of http 
request](https://nodejs.org/api/http.html#http_http_request_options_callback), but automaticaly puts the body together from chunks and parses it to JSON if that's the response content-type. It also returns a promise rather than taking/calling callbacks.  

## The same code with simple-node-http:
	var simpleHttp = require('simple-node-http');
	var options = {
		hostname: 'some-url.com',
		port: 3000,
		path: 'some/path.json',
		method: 'POST',
		headers: {
			'a': 'b',
			'c': 'd'
		}
	};
	var postData = "some data in whatever form you want...";
	simpleHttp(options, postData)
		.then(handleResponse)
		.catch(handleError);
## 

As you can see the setup is exactly the same, but the logic of making the request and handling response/error is greatly simplified.  
_postData_ is optional and can be omitted if no data is to be written to the request body.  
I am aware this is not suitable for every single scenario, bot it will for majority of simple requests.