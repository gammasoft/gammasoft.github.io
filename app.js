var http = require('http'),
    url = require('url'),
    request = require('request');

http.createServer(function(req, res) {
    var url_parts = url.parse(req.url, true),
        query = url_parts.query;

    res.setHeader('Content-Type', 'application/json');

    request({
        uri: 'https://github.com/login/oauth/access_token',
        method: 'POST',
        json: {
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            code: query.code
        }
    }, function(err, response, body) {
        if(err || body.error) {
            res.statusCode = 500;
        }

        res.statusCode = 200;
        res.end(JSON.stringify(body));
    });
}).listen(process.env.PORT || 5000);
