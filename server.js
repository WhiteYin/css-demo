var PORT = 4000;

var http = require('http');
var url = require('url');
var fs = require('fs');
var mine = require('./mine').types;
var path = require('path');

var server = http.createServer(function (request, response) {
  //获取路径名
  var pathname = url.parse(request.url).pathname;
  pathname = decodeURI(pathname);
  var realPath;
  //设置默认路径
  if (pathname === '/') {
    realPath = path.join("asset/html/index.html", pathname);
  } else {
    realPath = path.join("asset", pathname);
  }
  console.log(realPath);
  //获取后缀名
  var ext = path.extname(realPath);
  ext = ext ? ext.slice(1) : 'unknown';
  fs.exists(realPath, function (exists) {
    //如果路径错误返回404
    if (!exists) {
      response.writeHead(404, {
        'Content-Type': 'text/plain'
      });

      response.write("This request URL " + pathname + " was not found on this server.");
      response.end();
    } else {
      fs.readFile(realPath, "binary", function (err, file) {
        if (err) {
          response.writeHead(500, {
            'Content-Type': 'text/plain'
          });
          response.end(err);
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
server.listen(PORT);
console.log("Server runing at port: " + PORT + ".");