var http = require('http'),
    url = require('url'),
    request = require('request'),

    ghSummaryUrl = process.env.GHSUMMARY_URL;

http.createServer(function(req, res) {
    var url_parts = url.parse(req.url, true),
        query = url_parts.query;

    res.setHeader('Content-Type', 'application/json');

    request.post({
        uri: 'https://github.com/login/oauth/access_token',
        json: {
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            code: query.code
        }
    }, function(err, response, body) {
        if(err || (body && body.error)) {
            res.statusCode = 500;
            return res.end(body ? JSON.stringify(body) : 'Error 500');
        }

        res.writeHead(302, {
            'Location': ghSummaryUrl + '?access_token=' + body.access_token
        });

        res.end();
    });
}).listen(process.env.PORT || 5000);
