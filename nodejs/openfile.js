var  http  =  require('http'); 
var  fs=  require('fs');
const optfile={
    //读文件
    readfileSync:function(path){      //同步读取
        //读路径
        var  data  =  fs.readFileSync(path,'utf-8');
        console.log(data);
        console.log("同步方法执行完毕");                
    },
    readfile:function(path,recall){          //异步执行
        fs.readFile(path,  function  (err,  data)  {
            //如果错误err
            if  (err)  {
              console.log(err);
            }else{
              console.log(data.toString());
              recall(data);
            }
        });
        console.log("异步方法执行完毕");
    },
    //读取二进制图片（传入路径）
    readImg:function(path,res){
        fs.readFile(path,'binary',function(err,filedata)  { //异步执行  'binary' 二进制流的文件
            if  (err)  {
                console.log(err);
                return;
            }else{
        res.write(filedata,'binary');
        res.end();
            }
        });
    },
    //写文件
    writefile:function(path,data,recall){    //异步方式
        fs.writeFile(path,  data,  function  (err)  {
            if  (err)  {
                throw  err;
            }
            console.log('It\'s  saved!');  //文件被保存
            recall('写文件成功！');
          });
    },
    writeFileSync:function(path,data){  //同步方式
        fs.writeFileSync(path,  data);
        console.log("同步写文件完成");
    },  
}
//操作文件 
http.createServer(function  (request,  response)  {  
    response.writeHead(200,  {'Content-Type':'image/jpeg'});  
        if(request.url!=="/favicon.ico"){  //清除第2此访问  
        optfile.readImg('./files/t.png',response);  
    }  
}).listen(8000);  
console.log('Server  running  at  http://127.0.0.1:8000/');