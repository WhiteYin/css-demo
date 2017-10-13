var http = require('http');
var url=require('url');
var fs=require('fs');
var mine=require('./mine').types;
var path=require('path');
 
var server = http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname;
    pathname = path.join('../',pathname);
    console.log(pathname);
    var ext = path.extname(pathname);
    ext = ext ? ext.slice(1) : 'unknown';
    fs.exists(pathname, function (exists) {
        if (!exists) {
            response.writeHead(404,
                {
                    'Content-Type': 'text/plain'
                }
            );

            response.write("This request URL " + pathname + " was not found on this server.");
            response.end();
        } else {
            fs.readFile(pathname, "binary", function (err, file) {
                if (err) {
                    response.writeHead(500, {
                        'Content-Type': 'text/plain'
                    });
                    response.end();
                } else {
                    var contentType = mine[ext] || "text/plain";
                    response.writeHead(200, {
                        'Content-Type': contentType
                    });
                    response.write(file, "binary");
                    response.end();
                }
            });
        }
    });
});
server.listen(4000);
console.log("Server runing at port: 4000.");