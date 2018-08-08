//读网络文件并转发（我用的express）

app.get('/', function (req, res) {
    http.get(url, function (response) {
        response.setEncoding('binary');  //二进制binary
        var type = response.headers["content-type"];
        var Data = '';
        response.on('data', function (data) {    //加载到内存
            Data += data;
        }).on('end', function () {          //加载完
            res.writeHead(200, { 'Access-Control-Allow-Origin': '*', "Content-Type": type });   //设置头，允许跨域
            res.write(Data , "binary");
            res.end();
        })
    })
});




//读网络文件并写本地

var http = require('http')
var fs = require('fs')

http.get(url, function (response) {
    response.setEncoding('binary');  //二进制binary
    var Data = '';
    response.on('data', function (data) {    //加载到内存
        Data += data;
    }).on('end', function () {          //加载完
        fs.writeFile(完整存储路径, Data , function () {
            console.log('ok')
        });
    })
})