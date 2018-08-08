var express = require("express");
var app = express();

// app.use(express.static("public")).listen(9000);
// app.use(express.static("js")).listen(9000);
app.use(express.static('js'));
//  主页输出 "Hello World"
app.get('/', function (req, res) {
  res.sendFile( __dirname + "/" + "index.html" );
})

var server = app.listen(9000, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})